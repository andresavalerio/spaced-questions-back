import request from "supertest";
import express, { Express } from "express";
import { CardController } from "./card.controller";
import { CreateCardDTO, ICardService, Card, ILLMService } from "../card.interfaces";
import { CardDuplicateError, CardNotFoundError } from "../card.errors"; // Se existirem erros específicos para cards, adicione-os aqui.
import { INotebookService } from "../../notebook/notebook.interfaces";

const baseCreateCardData: CreateCardDTO = {
  notebookId: "testNotebookId",
  userId: "testUserId",
  question: "",
  answer: "",
};

describe("CardController", () => {
  let application: Express;
  let cardService: ICardService;
  let notebookService: INotebookService;
  let llmService: ILLMService;

  const requestCreateCard = (data: CreateCardDTO) =>
    request(application).post("/cards").send(data);

  beforeAll(() => {
    cardService = {
      createCard: jest.fn().mockResolvedValue({ ...baseCreateCardData, id: 'testCardId' }),
      getCardsByNotebook: jest.fn().mockResolvedValue([]),
    };  

    notebookService = {
      getNotebookContent: jest.fn().mockResolvedValue(""),
      getNotebookById: jest.fn().mockResolvedValue({ id: 'testNotebookId', ownerId: 'testUserId' }),
      createNotebook: jest.fn().mockResolvedValue({ id: 'testNotebookId', ownerId: 'testUserId' }),
      getNotebooksByOwner: jest.fn().mockResolvedValue([]),
    };

    llmService = {
      generateQuestionAndAnswer: jest.fn().mockResolvedValue({ question: 'testQuestion', answer: 'testAnswer' }),
      evaluateAnswer: jest.fn().mockResolvedValue({ score: 0, interpretation: 'testInterpretation' }),
    };
  });

  beforeEach(() => {
    application = express();
    application.use(express.json());
    const controller = new CardController(cardService, notebookService, llmService);
    const router = controller.getRouter();
    application.use("/cards", router);
    jest.resetAllMocks();
  });

  describe("createCard", () => {
    it("should create card", async () => {
      await requestCreateCard(baseCreateCardData).expect(201);
    }, 60000);

    it("should not create card without required fields", async () => {
      const toNullifyKeys: Array<keyof CreateCardDTO> = [
        "userId",
      ];

      for (const key of toNullifyKeys) {
        await requestCreateCard({ ...baseCreateCardData, [key]: "" })
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe(`Missing required fields`);
          });
      }
    });
  });

  describe("getCardsByNotebook", () => {
    it("should retrieve cards by notebook", async () => {
      const notebookId = "testNotebookId";
      await request(application).get(`/cards/${notebookId}`).expect(200);
    });
  });
});

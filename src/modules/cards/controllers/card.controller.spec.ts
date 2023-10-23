import request from "supertest";
import express, { Express } from "express";
import { CardController } from "./card.controller";
import { CreateCardDTO, ICardService, Card } from "../card.interfaces";
import { CardDuplicateError, CardNotFoundError } from "../card.errors"; // Se existirem erros específicos para cards, adicione-os aqui.

const baseCreateCardData: CreateCardDTO = {
  title: "Test Card",
  content: "This is a test card content.",
  notebookId: "testNotebookId"
};

describe("CardController", () => {
  let application: Express;
  let service: ICardService;

  const requestCreateCard = (data: CreateCardDTO) =>
    request(application).post("/").send(data);

  beforeAll(() => {
    service = {
      createCard: jest.fn(),
      getCardsByNotebook: jest.fn(),
    };
  });

  beforeEach(() => {
    application = express();
    application.use(express.json());
    const controller = new CardController(service);
    const router = controller.getRouter();
    application.use("/", router);
    jest.resetAllMocks();
  });

  describe("createCard", () => {
    it("should create card", async () => {
      await requestCreateCard(baseCreateCardData).expect(201);
    });

    it("should not create card without required fields", async () => {
      const toNullifyKeys: Array<keyof CreateCardDTO> = [
        "title",
        "content",
        "notebookId"
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
      await request(application).get(`/${notebookId}`).expect(200);
    });
  });
});

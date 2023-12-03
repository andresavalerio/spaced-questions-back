import request from "supertest";
import express, { Express } from "express";
import { CardController } from "./card.controller";
import { CreateCardDTO } from "../../interfaces/card.interfaces";
import { baseCreateCardData, cardMockService } from "./card.controller.fixture";

describe("CardController", () => {
  let application: Express;

  const requestCreateCard = (data: CreateCardDTO) =>
    request(application).post("/").send(data);

  beforeEach(() => {
    application = express();

    application.use(express.json());

    const controller = new CardController(cardMockService);

    const router = controller.getRouter();

    application.use("/", router);
  });

  describe("createCard", () => {
    it("should create card", async () => {
      await request(application).post("/").send(baseCreateCardData).expect(201);
    });

    it("should not create card without required fields", async () => {
      const toNullifyKeys: Array<keyof CreateCardDTO> = ["notebookId"];

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

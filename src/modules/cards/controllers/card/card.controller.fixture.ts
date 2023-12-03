import { INotebookService } from "modules/notebook/notebook.interfaces";
import {
  CreateCardDTO,
  ICardService,
  ILLMService,
} from "../../interfaces/card.interfaces";

export const baseCreateCardData: CreateCardDTO = {
  notebookId: "testNotebookId",
  question: "",
  answer: "",
};

export const cardMockService: ICardService = {
  createCardByNotebookId: jest
    .fn()
    .mockResolvedValue({ ...baseCreateCardData, id: "testCardId" }),
  getCardsByNotebookId: jest.fn().mockResolvedValue([]),
  getRevisionCardsByNotebookId: jest.fn().mockResolvedValue([]),
  concludeCard: jest.fn(),
  isCardAnswerable: jest.fn(),
  updateRevisionDateBasedOnAnswer: jest.fn(),
};

export const notebookMockService: INotebookService = {
  getNotebookContentById: jest.fn().mockResolvedValue("testNotebookContent"),
  getNotebookById: jest
    .fn()
    .mockResolvedValue({ id: "testNotebookId", ownerId: "testUserId" }),
  createNotebook: jest
    .fn()
    .mockResolvedValue({ id: "testNotebookId", ownerId: "testUserId" }),
  getNotebooksByOwner: jest.fn().mockResolvedValue([]),
};

export const llmMockService: ILLMService = {
  generateQuestionAndAnswer: jest
    .fn()
    .mockResolvedValue({ question: "testQuestion", answer: "testAnswer" }),
};

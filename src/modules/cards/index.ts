import { RouterModifier } from "interfaces/module.interface";
import { CardController } from "./controllers/card/card.controller";
import { CardService } from "./services/card/card.service";
import { CardRepository } from "./repositories/card/card.repository";
import { NotebookService } from "../notebook/services/notebook.service";
import { NotebookRepository } from "../notebook/repositories/notebook.repository";
import { LLMService } from "./services/llm/llm.service";
import { FibonacciCardScheduler } from "./services/card-scheduler/card-scheduler.service";
import { CardAnswerController } from "./controllers/card-answer/card-answer.controller";
import { CardAnswerService } from "./services/card-answer/card-answer.service";
import { ICardService } from "./interfaces/card.interfaces";
import { CardAnswerRepository } from "./repositories/card-answer/card-answer.repository";

const createCardService = (): ICardService => {
  const cardRepository = new CardRepository();

  const notebookRepository = new NotebookRepository();

  const notebookService = new NotebookService(notebookRepository);

  const llmService = new LLMService();

  const cardSchedulerService = new FibonacciCardScheduler();

  const cardService = new CardService(
    cardRepository,
    notebookService,
    cardSchedulerService,
    llmService
  );

  return cardService;
};

const createCardAnswerController = (
  cardService: ICardService
): CardAnswerController => {
  const cardAnswerRepository = new CardAnswerRepository();

  const cardAnswerService = new CardAnswerService(
    cardAnswerRepository,
    cardService
  );

  const cardAnswerController = new CardAnswerController(cardAnswerService);

  return cardAnswerController;
};

const createCardController = (cardService: ICardService): CardController => {
  const cardController = new CardController(cardService);

  return cardController;
};

type CardsModuleControllers = [CardController, CardAnswerController];

const createModuleControllers = (): CardsModuleControllers => {
  const cardService = createCardService();

  const cardController = createCardController(cardService);

  const cardAnswerController = createCardAnswerController(cardService);

  return [cardController, cardAnswerController];
};

export const setCardModule: RouterModifier = (application) => {
  const [cardController, cardAnswerController] = createModuleControllers();

  const cardRouter = cardController.getRouter();

  const cardAnswerRouter = cardAnswerController.getRouter();

  cardRouter.use("/answer", cardAnswerRouter);

  application.use("/cards", cardRouter);
};

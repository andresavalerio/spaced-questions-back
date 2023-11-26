import { RouterModifier } from "interfaces/module.interface";
import { CardController } from "./controllers/card.controller";
import { CardService } from "./services/card.service";
import { CardRepository } from "./repositories/card.repository";
import { NotebookService } from "../notebook/services/notebook.service";
import { NotebookRepository } from "../notebook/repositories/notebook.repository";


const createCardController = (): CardController => {
  const cardRepository = new CardRepository();
  const notebookRepository = new NotebookRepository();
  const cardService = new CardService(cardRepository);
  const notebookService = new NotebookService(notebookRepository); 
  const cardController = new CardController(cardService, notebookService); 
  return cardController;
};

export const setCardModule: RouterModifier = (application) => {
  const cardController = createCardController();
  const cardRoute = cardController.getRouter();
  application.use("/cards", cardRoute);
};

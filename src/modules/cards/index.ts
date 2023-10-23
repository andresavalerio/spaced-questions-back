import { RouterModifier } from "interfaces/module.interface";
import { CardController } from "./controllers/card.controller";
import { CardService } from "./services/card.service";
import { CardRepository } from "./repositories/card.repository";

const createCardController = (): CardController => {
  const cardRepository = new CardRepository();
  const cardService = new CardService(cardRepository);
  const cardController = new CardController(cardService);
  return cardController;
};

export const setCardModule: RouterModifier = (application) => {
  const cardController = createCardController();
  const cardRoute = cardController.getRouter();
  application.use("/cards", cardRoute);
};

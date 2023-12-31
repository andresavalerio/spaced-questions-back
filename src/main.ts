import "reflect-metadata";

import { createApplicationAsync } from "./application";

const applicationPromise = createApplicationAsync();

applicationPromise.then((application) => {
  const port = process.env.PORT ? Number(process.env.PORT) : 5000;

  application.listen(port, () => console.log("server running at port " + port));
});

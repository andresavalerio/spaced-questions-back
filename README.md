# Software Engineering Backend

## Concepts

### Controllers



### Middlewares 



### Schemas



### Repositories 



### Services



## File Structure

- `e2e/` -> all End to End tests of the backend
  - jest-e2e.json -> e2e Jest configurations
  - notebook.e2e.spec.ts -> e2e tests for notebook routes
- `src/`
  - `controllers/`
    - `user/`
      - user.controller.ts
      - user.controller.spec.ts
    - index.ts
  - `database/`
    - database.ts
  - `errors/`
      - user.errors.ts
  - `interfaces/`
      - user.interfaces.ts
  - `middlewares/`
    - index.ts
  - `models/`
    - user.model.ts
  - `repositories/`
    - `user/`
      - user.repository.ts
      - user.repository.spec.ts
  - `services/`
    - `user/`
      - user.service.ts
      - user.service.spec.ts
  - application.ts -> create application
  - main.ts -> run the application
- .gitignore -> make git ignore files
- jest.config.js -> jest configuration
- nodemon.json -> nodemon configuration
- package.json 
- README.md 
- tsconfig.json -> typescript configuration

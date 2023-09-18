import { Repository } from "typeorm";
import { IUserRepository, User } from "../user.interfaces";
import database from "database/database";

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = database.getRepository(User);
  }

  public async insertUser(user: User): Promise<void> {
    this.repository.insert(user);
  }
}

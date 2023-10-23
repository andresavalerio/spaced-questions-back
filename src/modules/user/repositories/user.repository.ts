import { Repository } from "typeorm";
import { IUserRepository, User } from "../user.interfaces";
import database from "database/database";

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = database.getRepository(User);
  }

  public async save(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  public async existsByUsername(username: string): Promise<boolean> {
    return await this.repository.exist({ where: { username } });
  }

  public async getByUsername(username: string): Promise<User | null> {
    return await this.repository.findOneBy({ username });
  }

  public async getByEmail(email: string): Promise<User | null> {
    return await this.repository.findOneBy({ email });
  }
}

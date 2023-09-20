import { Repository } from "typeorm";
import { IUserRepository, User } from "../user.interfaces";
import database from "database/database";
import { UserNotFoundError } from "../user.errors";

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

  public async getByUsername(username: string): Promise<User> {
    const user = await this.repository.findOneBy({ username });

    if (!user) throw new UserNotFoundError();

    return user;
  }

  public async getByEmail(email: string): Promise<User> {
    const user = await this.repository.findOneBy({ email });

    if (!user) throw new UserNotFoundError();

    return user;
  }
}

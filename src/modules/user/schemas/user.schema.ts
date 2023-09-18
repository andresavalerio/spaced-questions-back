import { EntitySchema } from "typeorm";
import { User, UserRole } from "../user.interfaces";

const userRoleEnum: UserRole[] = ["Free", "Premium"];

export const UserSchema = new EntitySchema<User>({
  name: "User",
  target: User,
  columns: {
    username: { type: "varchar", length: 20, primary: true, nullable: false },
    email: { type: "varchar", length: 100, unique: true, nullable: false },
    password: { type: "varchar", length: 256, nullable: false },
    firstName: { type: "varchar", length: 50, nullable: false },
    lastName: { type: "varchar", length: 50, nullable: false },
    createdAt: { type: "date", nullable: false },
    active: { type: "boolean", nullable: false, default: false },
    userRole: { type: "simple-enum", enum: userRoleEnum, default: "Free" },
  },
});

import SecurePassword from "secure-password";
import { IsEmail } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { BasicEntity } from "./BasicEntity";
import { Cookies, Session } from "../types";

const securePassword = new SecurePassword();

@Entity()
@ObjectType()
export class User extends BasicEntity {
  @Column("text", { nullable: false })
  @Field()
  firstName!: string;

  @Column("text", { nullable: false })
  @Field()
  lastName!: string;

  @Column("text", { nullable: false, unique: true })
  @IsEmail()
  @Field()
  email!: string;

  @Column({ type: "bytea", nullable: true })
  password!: Buffer;

  static async fromSession(session: Session) : Promise<User | undefined> {
    if (session.userId) {
      return await User.findOne(session.userId);
    }
    return;
  }

  async setPassword(newPassword: string) {
    this.password = await securePassword.hash(Buffer.from(newPassword));
  }

  signIn(session: Session, cookies: Cookies) {
    session.userId = this.id;
    cookies.set("hasUser", "1", { httpOnly: true, signed: true });
  }

  signOut = (cookies: Cookies) =>  cookies.set("hasUser", "0", { httpOnly: true, signed: true });

  async checkPassword(password: string) {
    const result = await securePassword.verify(
      Buffer.from(password),
      this.password
    );

    // The hash params used for the stored hash have since changed, so we should re-hash the password
    // to ensure that it is as secure as possible:
    if (result === SecurePassword.VALID_NEEDS_REHASH) {
      await this.setPassword(password);
      await this.save();
    }

    return (
      result === SecurePassword.VALID ||
      result === SecurePassword.VALID_NEEDS_REHASH
    );
  }
}

import { Context } from "../types";
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { User } from "../entities/User";
import { verify } from "crypto";

@InputType()
class SignUpInput {
  @Field()
  firstName!: string;
  @Field()
  lastName!: string;
  @Field()
  email!: string;
  @Field()
  password!: string;
}

@InputType()
class SignInInput {
  @Field()
  email!: string;
  @Field()
  password!: string;
}

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(() => String)
  hello(): string {
    return "hello";
  }

  @Mutation(() => User)
  async signUp(
    @Arg("input") { firstName, lastName, email, password }: SignUpInput,
    @Ctx() { session, cookies }: Context
  ) {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    await user.setPassword(password);

    await user.save();

    user.signIn(session, cookies);

    return user;
  }

  @Mutation(() => Number)
  signOut(@Ctx() { cookies, destroy, user }: Context) {
    user.signOut(cookies);
    destroy();
    return 1;
  }


  @Mutation(() => Number)
  async signIn(@Arg('input') {email, password} : SignInInput, @Ctx() {session, cookies} : Context){
      const user = await User.findOne({where: {email}})

      if(!user){
          throw new Error('Failed to log in')
      }

      const verifyPass = await user.checkPassword(password)

      if(!verifyPass){
          throw new Error('Failed to log in');
      }

      await user.signIn(session,cookies);
      
      return 1;
  }
}

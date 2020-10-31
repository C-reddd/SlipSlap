import { validateOrReject } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
export abstract class BasicEntity extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    readonly id!: string;
  
    @Field()
    @CreateDateColumn()
    createdAt!: Date;
  
    @Field()
    @CreateDateColumn()
    updatedAt!: Date;
  
    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
      await validateOrReject(this);
    }
}

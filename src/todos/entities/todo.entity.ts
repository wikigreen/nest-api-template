import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  constructor(todo: Partial<Todo>) {
    Object.assign(this, todo);
  }
}

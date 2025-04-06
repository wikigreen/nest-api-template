import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Todo } from "./entities/todo.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(todo: Omit<Todo, "id">): Promise<Todo> {
    const newTodo = this.todoRepository.create(todo);
    return this.todoRepository.save(newTodo);
  }

  async findAll() {
    return this.todoRepository.find();
  }

  async findOne(id: string) {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async update(id: string, todoDto: Omit<Todo, "id">) {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    Object.assign(todo, todoDto);
    return await this.todoRepository.save(todo);
  }

  async remove(id: string) {
    const result = await this.todoRepository.delete({ id });
    if (!result.affected) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }
}

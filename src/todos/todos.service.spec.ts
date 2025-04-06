import { Test, TestingModule } from "@nestjs/testing";
import { TodosService } from "./todos.service";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Todo } from "./entities/todo.entity";

describe("TodosService", () => {
  let service: TodosService;
  let todoRepository: Repository<Todo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    todoRepository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  describe("create", () => {
    it("should create and save a new todo", async () => {
      const todoDto = { title: "Test Todo", description: "Test description" };
      const savedTodo = { id: "1", ...todoDto };

      // Use jest.spyOn() to mock the methods
      const createSpy = jest
        .spyOn(todoRepository, "create")
        .mockReturnValue(savedTodo);
      const saveSpy = jest
        .spyOn(todoRepository, "save")
        .mockResolvedValue(savedTodo);

      const result = await service.create(todoDto);

      expect(createSpy).toHaveBeenCalledWith(todoDto);
      expect(saveSpy).toHaveBeenCalledWith(savedTodo);
      expect(result).toEqual(savedTodo);

      // Optionally, restore the spied methods after the test
      createSpy.mockRestore();
      saveSpy.mockRestore();
    });
  });
});

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TodosService } from "./todos.service";
import { TodoDto } from "./dto/todo.dto";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("todos")
@Controller("todos")
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiOperation({ summary: "Create a new todo item" })
  @ApiBody({ type: TodoDto })
  @ApiResponse({ status: 201, description: "Todo created successfully." })
  async create(@Body() createTodoDto: TodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all todo items" })
  @ApiResponse({ status: 200, description: "List of all todos." })
  async findAll() {
    return this.todosService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a specific todo item by ID" })
  @ApiParam({ name: "id", description: "ID of the todo item" })
  @ApiResponse({ status: 200, description: "The todo item." })
  @ApiResponse({ status: 404, description: "Todo not found." })
  async findOne(@Param("id") id: string) {
    return this.todosService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a specific todo item by ID" })
  @ApiParam({ name: "id", description: "ID of the todo item" })
  @ApiBody({ type: TodoDto })
  @ApiResponse({ status: 200, description: "Todo updated successfully." })
  @ApiResponse({ status: 404, description: "Todo not found." })
  async update(@Param("id") id: string, @Body() updateTodoDto: TodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a specific todo item by ID" })
  @ApiParam({ name: "id", description: "ID of the todo item" })
  @ApiResponse({ status: 200, description: "Todo deleted successfully." })
  @ApiResponse({ status: 404, description: "Todo not found." })
  async remove(@Param("id") id: string) {
    return this.todosService.remove(id);
  }
}

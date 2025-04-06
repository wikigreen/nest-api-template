import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TodoDto {
  @ApiProperty({
    description: "The title of the todo item",
    example: "Buy groceries",
  })
  title: string;

  @ApiPropertyOptional({
    description: "Detailed description of the todo item",
    example: "Buy milk, eggs, and bread from the store.",
  })
  description: string;
}

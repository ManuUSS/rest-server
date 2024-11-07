import { prisma } from '../../data/postgres';
import { CreateTodoDto, TodoDataSource, TodoEntity } from '../../domain';
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo.dto';


export class TodoDataSourceImpl implements TodoDataSource {

  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }

  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map( TodoEntity.fromObject ); 
  }

  getById(id: number): Promise<TodoEntity | null> {
    throw new Error("Method not implemented.");
  }

  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity | null> {
    throw new Error("Method not implemented.");
  }
  
  deleteById(id: number): Promise<TodoEntity | null> {
    throw new Error("Method not implemented.");
  }
  
}
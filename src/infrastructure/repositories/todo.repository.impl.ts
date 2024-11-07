import { CreateTodoDto, TodoDataSource, TodoEntity, TodoRepository } from "../../domain";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";


export class TodoRepositoryImpl implements TodoRepository {

  constructor(
    private readonly dataSource:TodoDataSource
  ) {}

  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.dataSource.create( createTodoDto );
  }

  getAll(): Promise<TodoEntity[]> {
    return this.dataSource.getAll();
  }

  getById(id: number): Promise<TodoEntity | null> {
    return this.dataSource.getById( id );
  }

  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity | null> {
    return this.dataSource.updateById( updateTodoDto );
  }

  deleteById(id: number): Promise<TodoEntity | null> {
    return this.dataSource.deleteById( id );
  }

}
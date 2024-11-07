import { CreateTodoDto } from '../dtos';
import { UpdateTodoDto } from '../dtos/todos/update-todo.dto';
import { TodoEntity } from '../entities/todo.entity';


export abstract class TodoDataSource {

  abstract create( createTodoDto:CreateTodoDto ): Promise<TodoEntity>;
  abstract getAll(): Promise<TodoEntity[]>;

  abstract getById( id:number ): Promise<TodoEntity | null>;
  abstract updateById( updateTodoDto:UpdateTodoDto ): Promise<TodoEntity | null>;

  abstract deleteById( id:number ): Promise<TodoEntity | null>;

};

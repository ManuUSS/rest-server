import { CreateTodoDto } from '../dtos';
import { UpdateTodoDto } from '../dtos/todos/update-todo.dto';
import { TodoEntity } from '../entities/todo.entity';


export abstract class TodoRepository {

  abstract create( createTodoDto:CreateTodoDto ): Promise<TodoEntity>;
  abstract getAll(): Promise<TodoEntity[]>;

  abstract getById( id:number ): Promise<TodoEntity>;
  abstract updateById( updateTodoDto:UpdateTodoDto ): Promise<TodoEntity>;

  abstract deleteById( id:number ): Promise<TodoEntity>;

};

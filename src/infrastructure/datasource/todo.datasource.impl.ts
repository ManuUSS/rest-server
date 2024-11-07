import { prisma } from '../../data/postgres';
import { CreateTodoDto, TodoDataSource, TodoEntity } from '../../domain';
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo.dto';


export class TodoDataSourceImpl implements TodoDataSource {

  async create( createTodoDto:CreateTodoDto ): Promise<TodoEntity> {
    const newTodo = await prisma.todo.create({
      data: createTodoDto!
    });

    return TodoEntity.fromObject( newTodo );
  }

  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map( TodoEntity.fromObject ); 
  }

  async getById(id: number): Promise<TodoEntity> {

    const todo = await prisma.todo.findUnique({
      where: {
        id
      }
    });

    if ( !todo ) throw new Error('Todo not found');

    return TodoEntity.fromObject( todo );

  }

  async updateById ( updateTodoDto:UpdateTodoDto ): Promise<TodoEntity | null> {

    await this.getById( updateTodoDto.id );

    const updatedTodo = await prisma.todo.update({
      where: { id: updateTodoDto.id },
      data: updateTodoDto!.values
    });

    return TodoEntity.fromObject( updatedTodo );

  }
  
  async deleteById( id:number ): Promise<TodoEntity | null> {

    await this.getById( id );
    
    const deletedTodo = await prisma.todo.delete({ where: { id } });
    return TodoEntity.fromObject( deletedTodo );
  }
  
}
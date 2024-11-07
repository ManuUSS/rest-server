import type { Request, Response } from 'express';
import { CreateTodoDto } from '../../domain/dtos';
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo.dto';
import { TodoRepository, TodoUseCases } from '../../domain';

export class TodosController {


  constructor (
    private readonly todoRepository:TodoRepository,
  ) {};

  /**
   * Get all todos
   * @param { Request } req 
   * @param { Response } res 
   */
  public getTodos = ( req:Request, res:Response ) => {

    new TodoUseCases.GetTodos( this.todoRepository )
      .execute()
      .then( todos => res.json( todos ))
      .catch( error => res.status( 400 ).json({ error }));

  };

  /**
   * Get todo by id
   * @param { Request } req 
   * @param { Response } res 
   */
  public getTodoById = ( req:Request, res:Response ) => {
    const id = Number( req.params.id );
    
    new TodoUseCases.GetTodo( this.todoRepository )
      .execute( id )
      .then( todo => res.json( todo ))
      .catch( error => res.status( 400 ).json({ error }));

  };

  /**
   * Create a new todo
   * @param { Request } req 
   * @param { Response } res 
   */
  public createTodo = ( req:Request, res:Response ) => {
    
    const [ error, createTodoDto ] = CreateTodoDto.create( req.body );
    if( error ) {
      res.status( 400 ).json({ error });
      return;
    }

    new TodoUseCases.CreateTodo( this.todoRepository )
      .execute( createTodoDto! )
      .then( todo => res.json( todo ))
      .catch( error => res.status( 400 ).json({ error }));

  };

  /**
   * Update a todo
   * @param { Request } req 
   * @param { Response } res 
   */
  public updateTodo = ( req:Request, res:Response ) => {
  
    const id = Number( req.params.id );
    const [ error, updateTodoDto ] = UpdateTodoDto.update({ ...req.body, id });

    if( error ) res.status( 400 ).json({ error });

    new TodoUseCases.UpdateTodo( this.todoRepository )
      .execute( updateTodoDto! )
      .then( todo => res.json( todo ))
      .catch( error => res.status( 400 ).json({ error }));

  };

  /**
   * Delete a todo
   * @param { Request } req 
   * @param { Response } res 
   */
  public deleteTodo = ( req:Request, res:Response ) => {
      
    const id = Number( req.params.id );

    new TodoUseCases.DeleteTodo( this.todoRepository )
      .execute( id )
      .then( deletedTodo => res.json({ deletedTodo }))
      .catch( error => res.status( 400 ).json({ error }));
  
  };


};

import type { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto } from '../../domain/dtos';
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo.dto';
import { TodoRepository } from '../../domain';

export class TodosController {


  constructor (
    private readonly todoRepository:TodoRepository,
  ) {};

  /**
   * Get all todos
   * @async
   * @param { Request } req 
   * @param { Response } res 
   */
  public getTodos = async ( req:Request, res:Response ) => {
    const todos = await this.todoRepository.getAll();
    res.json( todos );
  };

  /**
   * Get todo by id
   * @async
   * @param { Request } req 
   * @param { Response } res 
   */
  public getTodoById = async ( req:Request, res:Response ) => {
    const id = Number( req.params.id );
    
    try {
      const todo = await this.todoRepository.getById( id );
      res.json( todo );
    } catch ( error ) {
      res.status( 400 ).json({ error });
    }

  };

  /**
   * Create a new todo
   * @async
   * @param { Request } req 
   * @param { Response } res 
   */
  public createTodo = async ( req:Request, res:Response ) => {
    
    const [ error, createTodoDto ] = CreateTodoDto.create( req.body );
    if( error ) {
      res.status( 400 ).json({ error });
      return;
    }

    const newTodo = await this.todoRepository.create( createTodoDto! );
    res.json( newTodo );

  };

  /**
   * Update a todo
   * @async
   * @param { Request } req 
   * @param { Response } res 
   */
  public updateTodo = async ( req:Request, res:Response ) => {
  
    const id = Number( req.params.id );
    const [ error, updateTodoDto ] = UpdateTodoDto.update({ ...req.body, id });

    if( error ) res.status( 400 ).json({ error });

    try {
      const updatedTodo = await this.todoRepository.updateById( updateTodoDto! );
      res.json( updatedTodo );
    } catch ( error ) {
      res.status( 400 ).json({ error });
    }

  };

  /**
   * Delete a todo
   * @async
   * @param { Request } req 
   * @param { Response } res 
   */
  public deleteTodo = async ( req:Request, res:Response ) => {
      
      const id = Number( req.params.id );
      const deletedTodo = await this.todoRepository.deleteById( id );


      res.json({ deletedTodo });
  
  };


};

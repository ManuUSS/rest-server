import type { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto } from '../../domain/dtos';

export class TodosController {


  constructor () {};

  /**
   * Get all todos
   * @async
   * @param { Request } req 
   * @param { Response } res 
   */
  public getTodos = async ( req:Request, res:Response ) => {
    const todos = await prisma.todo.findMany();
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

    if( isNaN( id ) ) {
      res.status( 400 ).json({ message: 'Invalid ID supplied' });
      return;
    }

    const todo = await prisma.todo.findUnique({
      where: {
        id
      }
    });
    
    todo 
      ? res.json( todo ) 
      : res.status( 404 ).json({ message: 'Todo not found' });

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

    const newTodo = await prisma.todo.create({
      data: createTodoDto!
    });

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
    if( isNaN( id ) ) {
      res.status( 400 ).json({ message: 'Invalid ID supplied' });
      return;
    }

    const todo = await prisma.todo.findUnique({ where: { id } });
    if( !todo ) {
      res.status( 404 ).json({ message: 'Todo not found' });
      return;
    }

    const { text, completedAt } = req.body;
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        text,
        completedAt: completedAt ? new Date( completedAt ) : null
      }
    });

    res.json( updatedTodo );

  };

  /**
   * Delete a todo
   * @async
   * @param { Request } req 
   * @param { Response } res 
   */
  public deleteTodo = async ( req:Request, res:Response ) => {
      
      const id = Number( req.params.id );
      if( isNaN( id ) ) {
        res.status( 400 ).json({ message: 'Invalid ID supplied' });
        return;
      }
      
      const todo = await prisma.todo.findUnique({ where: { id } });
      if( !todo ) {
        res.status( 404 ).json({ message: 'Todo not found' });
        return;
      }

      const deletedTodo = await prisma.todo.delete({ where: { id } });

      if( !deletedTodo ) {
        res.status( 400 ).json({ message: `Todo with ${ id } not found` });
        return;
      }

      res.json({ todo, deletedTodo });
  
  };


};

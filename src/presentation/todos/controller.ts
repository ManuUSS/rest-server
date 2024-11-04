import type { Request, Response } from 'express';
import { prisma } from '../../data/postgres';

export class TodosController {


  constructor () {};

  public getTodos = async ( req:Request, res:Response ) => {

    const todos = await prisma.todo.findMany();
    res.json( todos );
  };

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

  public createTodo = async ( req:Request, res:Response ) => {
    
    const { text } = req.body;
    
    if( !text ) {
      res.status( 400 ).json({ message: 'Text is required' });
      return;
    }

    const newTodo = await prisma.todo.create({
      data: {
        text,
      }
    });

    res.json( newTodo );

  };

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
    if( !text ) {
      res.status( 400 ).json({ message: 'Text is required' });
      return;
    }

    todo.text = text;
    todo.completedAt = completedAt || todo.completedAt;

    res.json( todo );

  };

  public deleteTodo = async ( req:Request, res:Response ) => {
      
      const id = Number( req.params.id );
      if( isNaN( id ) ) {
        res.status( 400 ).json({ message: 'Invalid ID supplied' });
        return;
      }
      
      const todo = await prisma.todo.delete({ where: { id } });
      if( !todo ) {
        res.status( 404 ).json({ message: 'Todo not found' });
        return;
      }
      
      res.json( todo );
  
  };


};

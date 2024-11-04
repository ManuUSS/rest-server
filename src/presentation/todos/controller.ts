import type { Request, Response } from 'express';

const todos = [
  { id: 1, title: 'Todo 1', completed: false },
  { id: 2, title: 'Todo 2', completed: false },
  { id: 3, title: 'Todo 3', completed: false },
];

export class TodosController {


  constructor () {};

  public getTodos = ( req:Request, res:Response ) => {
    res.json( todos );
  };

  public getTodoById = ( req:Request, res:Response ) => {
    const id = Number( req.params.id );

    if( isNaN( id ) ) {
      res.status( 400 ).json({ message: 'Invalid ID supplied' });
      return;
    }

    const todo = todos.find( todo => todo.id === id );
    
    todo 
      ? res.json( todo ) 
      : res.status( 404 ).json({ message: 'Todo not found' });

  };

  public createTodo = ( req:Request, res:Response ) => {
    
    const { title, completed = false } = req.body;
    
    if( !title ) {
      res.status( 400 ).json({ message: 'Title is required' });
      return;
    }

    const newTodo = { id: todos.length + 1, title, completed };

    todos.push( newTodo );

    res.json( newTodo );

  };

  public updateTodo = ( req:Request, res:Response ) => {
  
    const id = Number( req.params.id );
    if( isNaN( id ) ) {
      res.status( 400 ).json({ message: 'Invalid ID supplied' });
      return;
    }

    const todo = todos.find( todo => todo.id === id );
    if( !todo ) {
      res.status( 404 ).json({ message: 'Todo not found' });
      return;
    }

    const { title, completed } = req.body;
    if( !title ) {
      res.status( 400 ).json({ message: 'Title is required' });
      return;
    }

    todo.title = title;
    todo.completed = completed || todo.completed;

    res.json( todo );

  };



};

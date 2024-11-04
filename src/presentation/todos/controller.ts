import { Request, Response } from 'express';

export class TodosController {


  constructor () {};

  public getTodos = (req:Request, res:Response) => {

    res.json([
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: false },
      { id: 3, title: 'Todo 3', completed: false },
    ]);

  };


  

};

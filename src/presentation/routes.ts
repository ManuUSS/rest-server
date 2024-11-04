import { Router } from 'express';


export class AppRoutes {

  static get routes():Router {

    const router = Router();

    router.get('/api/todos', (req, res) => {

      res.json([
        { id: 1, title: 'Todo 1', completed: false },
        { id: 2, title: 'Todo 2', completed: false },
        { id: 3, title: 'Todo 3', completed: false },
      ]);

    });

    return router;
  };

};


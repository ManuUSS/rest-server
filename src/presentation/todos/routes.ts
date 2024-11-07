import { Router } from 'express';
import { TodosController } from './controller';
import { TodoDataSourceImpl } from '../../infrastructure/datasource/todo.datasource.impl';
import { TodoRepositoryImpl } from '../../infrastructure/repositories/todo.repository.impl';


export class TodoRoutes {

  static get routes():Router {

    const router = Router();
    
    const dataSource = new TodoDataSourceImpl();
    const todoRepository = new TodoRepositoryImpl( dataSource );

    const todosController = new TodosController( todoRepository );

    router.get( '/', todosController.getTodos );
    router.get( '/:id', todosController.getTodoById );

    router.post( '/', todosController.createTodo );
    router.patch( '/:id', todosController.updateTodo );

    router.delete( '/:id', todosController.deleteTodo );

    return router;
  };

};


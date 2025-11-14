import { Request, Response } from "express";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";

export class TodosController {
    constructor(
        private readonly todoRepository: TodoRepository,
    ) {}

    getTodos = (req: Request, res: Response) => {
        new GetTodos(this.todoRepository)
        .execute()
        .then((todo) => res.json(todo))
        .catch((error) => res.status(400).json(error));
    };

    getTodoById = (req: Request, res:Response) => {
        const id = +req.params.id;
        new GetTodo(this.todoRepository)
        .execute(id)
        .then((todo) => res.status(200).json(todo))
        .catch((error) => res.status(400).json({error}))

    };

    createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if(error) {
            res.status(400).json(error);
        }

        new CreateTodo(this.todoRepository)
        .execute(createTodoDto!)
        .then((todo) => res.json(todo))
        .catch((error) => res.status(400).json({error}))
    };

    updateTodo = async (req: Request, res:Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});

        if(error) {
          return res.status(404).json({error})
        }

        new UpdateTodo(this.todoRepository)
        .execute(updateTodoDto!)
        .then((todo) => res.status(200).json(todo))
        .catch((error) => res.status(400).json(error) )
        
    }

    deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if(!id) return res.status(400).json({ error: 'ID argument is not a number'});

        new DeleteTodo(this.todoRepository)
        .execute(id)
        .then((todo) => res.status(200).json(todo))
        .catch((error) => res.status(400).json({error}));
    }
}
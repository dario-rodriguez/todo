import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { Todo } from '../model/entities/todo.entity';
import { TodoCrudService } from '../services/todo.crud.service';

@Crud({
  model: {
    type: Todo,
  },
})
@CrudType(Todo)
@Controller('todo/todos')
export class TodoCrudController {
  constructor(public service: TodoCrudService) {}
}

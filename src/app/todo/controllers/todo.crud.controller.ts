import { Controller, UseGuards, BadRequestException, Get, Param } from '@nestjs/common';
import { Crud, CrudAuth, Override, CrudController, ParsedRequest, CrudRequest } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { Todo } from '../model/entities/todo.entity';
import { TodoCrudService } from '../services/todo.crud.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../core/user/model/entities/user.entity';
import { GetUser } from '../../core/auth/decorators/get-user.decorator';

@Crud({
  model: {
    type: Todo,
  },
})
@CrudType(Todo)
@Controller('todo/todos')
@ApiTags('todo')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@CrudAuth({
  property: 'user',
  filter: (user: User) => ({
    userId: user.id,
  }),
  persist: (user: User) => ({
    userId: user.id,
  }),
})
export class TodoCrudController {
  constructor(public service: TodoCrudService) {}

  get base(): CrudController<Todo> {
    return this;
  }

  @Get('toggle/:id')
  toggleTodo(@Param('id') id: number): Promise<Todo> {
    return this.service.toggle(id);
  }

  @Override()
  deleteOne(@GetUser() user: User, @ParsedRequest() req: CrudRequest): Promise<void | Todo> {
    if (user.id !== req.parsed.paramsFilter[0].value) {
      throw new BadRequestException();
    }

    return this.base.deleteOneBase!(req);
  }
}

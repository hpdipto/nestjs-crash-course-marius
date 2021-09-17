import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({ type: User, isArray: true })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  getUsers(@Query('name') name: string): any {
    return this.usersService.findAll(name);
  }

  @ApiOkResponse({ type: User })
  @Get(':id')
  getUserByID(@Param('id', ParseIntPipe) id: number): any {
    return this.usersService.findById(id);
  }

  @ApiCreatedResponse({ type: User })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Post()
  createUser(@Body() body: CreateUserDto): any {
    const user = this.usersService.createUser(body);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}

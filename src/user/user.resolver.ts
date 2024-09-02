import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginInput } from './dto/login-input.dto';

@Resolver('User')
export class UserResolver {
  constructor(private usersService: UserService) {}

  @Query(() => [User])
  async users(
    @Args('search', { type: () => String, nullable: true }) search?: string,
    @Args('page', { type: () => Number, nullable: true, defaultValue: 1 })
    page: number = 1,
    @Args('pageSize', { type: () => Number, nullable: true, defaultValue: 10 })
    pageSize: number = 10,
  ) {
    return this.usersService.getUsers(search, page, pageSize);
  }

  @Query(() => User, { nullable: true })
  async user(@Args('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput) {
    return this.usersService.createUser(data);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: number,
    @Args('data') data: UpdateUserInput,
  ) {
    return this.usersService.updateUser(id, data);
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: number) {
    return this.usersService.deleteUser(id);
  }

  @Mutation(() => String)
  async login(@Args('data') data: LoginInput): Promise<string> {
    return this.usersService.login(data);
  }
}

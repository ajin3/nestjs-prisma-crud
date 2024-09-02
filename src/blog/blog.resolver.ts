import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';

@Resolver('Blog')
export class BlogResolver {
  constructor(private blogService: BlogService) {}

  //Get All Blogs
  @Query(() => [Blog])
  async blogs() {
    return this.blogService.getBlogs();
  }

  //Get Blog by id
  @Query(() => Blog, { nullable: true })
  async blog(@Args('id') id: number) {
    return this.blogService.getBlogById(id);
  }

  //Create a new Blog
  @Mutation(() => Blog)
  async createBlog(@Args('data') data: CreateBlogInput) {
    return this.blogService.createBlog(data);
  }

  //Update an Existing Blog
  @Mutation(() => Blog)
  async updateBlog(
    @Args('id') id: number,
    @Args('data') data: UpdateBlogInput,
  ) {
    return this.blogService.updateBlog(id, data);
  }

  //Delete Blog
  @Mutation(() => Blog)
  async deleteBlog(@Args('id') id: number) {
    return this.blogService.deleteBlog(id);
  }
}

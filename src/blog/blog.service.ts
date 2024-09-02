import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Blog } from './entities/blog.entity';
import { CreateBlogInput } from './dto/create-blog.input'
import { UpdateBlogInput } from './dto/update-blog.input';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async createBlog(data: CreateBlogInput): Promise<Blog> {
    return this.prisma.blog.create({ data });
  }

  async getBlogById(id: number): Promise<Blog | null> {
    return this.prisma.blog.findUnique({ where: { id } });
  }

  async getBlogs(): Promise<Blog[]> {
    return this.prisma.blog.findMany();
  }

  async updateBlog(id: number, data: UpdateBlogInput): Promise<Blog> {
    return this.prisma.blog.update({ where: { id }, data });
  }

  async deleteBlog(id: number): Promise<Blog> {
    return this.prisma.blog.delete({ where: { id } });
  }
}

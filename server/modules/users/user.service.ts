import { UserRepository } from './user.repository';
import { Prisma, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async getUserById(id: string) {
    return this.repository.findById(id);
  }

  async getUserByEmail(email: string) {
    return this.repository.findByEmail(email);
  }

  async getUsers(filters?: {
    role?: UserRole;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.repository.findAll({
        ...filters,
        skip,
        take: limit,
      }),
      this.repository.count(filters),
    ]);

    return {
      users,
      total,
      page,
      limit,
    };
  }

  async createUser(data: {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.repository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || 'CUSTOMER',
    });
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    if (data.password && typeof data.password === 'string') {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.repository.update(id, data);
  }

  async deleteUser(id: string) {
    return this.repository.delete(id);
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/register-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { LoginAdminDto } from './dto/login-admin-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    try {
      const adminExists = await this.adminRepository.findOne({
        where: { email: createAdminDto.email },
      });

      if (adminExists) {
        throw new HttpException(
          'Admin with this email already exists',
          HttpStatus.CONFLICT,
        );
      } else {
        const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
        const admin = this.adminRepository.create({
          name: createAdminDto.name,
          email: createAdminDto.email,
          password: hashedPassword,
        });

        if (admin) {
          await this.adminRepository.save(admin);
          return {
            message: 'Admin created successfully',
            data: admin,
          };
        } else {
          throw new HttpException(
            'Failed to create admin',
            HttpStatus.BAD_GATEWAY,
          );
        }
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(loginAdminDto: LoginAdminDto) {
    try {
      const admin = await this.adminRepository.findOne({
        where: { email: loginAdminDto.email },
      });

      if (admin) {
        const isMatch = await bcrypt.compare(
          loginAdminDto.password,
          admin.password,
        );

        if (isMatch) {
          const payload = {
            id: admin.id,
            email: admin.email,
          };
          const token = await this.jwtService.sign({ payload });
          return {
            message: 'Admin logged in successfully',
            data: {
              admin,
              token,
            },
          };
        } else {
          throw new HttpException(
            'Password is incorrect',
            HttpStatus.UNAUTHORIZED,
          );
        }
      } else {
        throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const admins = await this.adminRepository.find();

      if (admins && admins.length > 0) {
        return {
          message: 'Admins fetched successfully',
          data: admins,
        };
      } else {
        throw new HttpException('No admins found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    try {
      const admin = await this.adminRepository.findOne({
        where: { id },
      });

      if (admin) {
        return {
          message: 'Admin fetched successfully',
          data: admin,
        };
      } else {
        throw new HttpException(
          `Admin with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    try {
      const admin = await this.adminRepository.findOne({
        where: { id },
      });

      if (admin) {
        await this.adminRepository.update(id, updateAdminDto);
        const updatedAdmin = await this.adminRepository.findOne({
          where: { id },
        });

        if (updatedAdmin) {
          return {
            message: 'Admin updated successfully',
            data: updatedAdmin,
          };
        } else {
          throw new HttpException(
            'Failed to fetch updated admin',
            HttpStatus.BAD_GATEWAY,
          );
        }
      } else {
        throw new HttpException(
          `Admin with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      const admin = await this.adminRepository.findOne({
        where: { id },
      });

      if (admin) {
        await this.adminRepository.delete(id);
        return {
          message: 'Admin removed successfully',
        };
      } else {
        throw new HttpException(
          `Admin with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

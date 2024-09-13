import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    try {
      const teacherExists = await this.teacherRepository.findOne({
        where: { email: createTeacherDto.email },
      });

      if (teacherExists) {
        throw new HttpException(
          'Teacher already exists with this email',
          HttpStatus.CONFLICT,
        );
      }

      const teacher = this.teacherRepository.create(createTeacherDto);
      if (!teacher) {
        throw new HttpException(
          'Teacher creation failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      await this.teacherRepository.save(teacher);
      return {
        message: 'Teacher created successfully',
        data: teacher,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const teachers = await this.teacherRepository.find();
      if (teachers.length === 0) {
        throw new HttpException('No teachers found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'Teachers retrieved successfully',
        data: teachers,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    try {
      const teacher = await this.teacherRepository.findOne({ where: { id } });
      if (!teacher) {
        throw new HttpException(
          `Teacher with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        message: 'Teacher retrieved successfully',
        data: teacher,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    try {
      const teacher = await this.teacherRepository.findOne({ where: { id } });
      if (!teacher) {
        throw new HttpException(
          `Teacher with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const updatedTeacher = await this.teacherRepository.save({
        ...teacher,
        ...updateTeacherDto,
      });
      return {
        message: 'Teacher updated successfully',
        data: updatedTeacher,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const teacher = await this.teacherRepository.findOne({ where: { id } });
      if (!teacher) {
        throw new HttpException(
          `Teacher with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      await this.teacherRepository.remove(teacher);
      return {
        message: 'Teacher removed successfully',
        data: teacher,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

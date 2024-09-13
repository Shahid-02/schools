import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly redisService: RedisService,
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    try {
      const student = this.studentRepository.create(createStudentDto);

      if (student) {
        await this.studentRepository.save(student);

        const cachedDataDelete = this.redisService.getClient();
        cachedDataDelete.del('students_with_parents');

        return {
          message: 'Student created successfully',
          data: student,
        };
      } else {
        throw new HttpException(
          'Student creation failed',
          HttpStatus.BAD_GATEWAY,
        );
      }
    } catch (error) {
      console.error('Error in creating student:', error);
      throw new HttpException(
        'Student creation failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const students = await this.studentRepository.find();

      if (students && students.length > 0) {
        return {
          message: 'Students fetched successfully',
          data: students,
        };
      } else {
        throw new HttpException('No students found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.error('Error in fetching all students:', error);
      throw new HttpException(
        'Error fetching students',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number) {
    try {
      const student = await this.studentRepository.findOne({ where: { id } });

      if (student) {
        return {
          message: 'Student fetched successfully',
          data: student,
        };
      } else {
        throw new HttpException(
          `Student with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      console.error('Error in fetching student:', error);
      throw new HttpException('Error fetching student', HttpStatus.BAD_REQUEST);
    }
  }

  async getStudentsAndParentsData(pageNumber: number) {
    try {
      const client = this.redisService.getClient();

      const limit = 10;
      const offset = (pageNumber - 1) * limit;

      // // Check cache first
      // const cachedData = await client.get(
      //   `students_with_parents_page_${pageNumber}`,
      // );
      // if (cachedData) {
      //   return {
      //     message:
      //       'Students and Parents Data Fetched Successfully (from cache)',
      //     data: JSON.parse(cachedData),
      //   };
      // }

      // Fetch paginated data from the database
      const [studentsWithParents, total] =
        await this.studentRepository.findAndCount({
          relations: ['parent'],
          order: { id: 'ASC' },
          skip: offset,
          take: limit,
        });

      if (studentsWithParents && studentsWithParents.length > 0) {
        // Cache the data for future requests
        await client.set(
          `students_with_parents_page_${pageNumber}`,
          JSON.stringify(studentsWithParents),
          'EX',
          3600, // Cache expiry set to 1 hour
        );

        return {
          message: 'Students and Parents fetched successfully',
          data: studentsWithParents,
          total, // Total number of records
          currentPage: pageNumber,
          totalPages: Math.ceil(total / limit), // Calculate total pages
        };
      } else {
        throw new HttpException(
          'No students and parents data found',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      console.error('Error in fetching students and parents:', error);
      throw new HttpException(
        'Error fetching data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    try {
      const student = await this.studentRepository.findOne({ where: { id } });

      if (student) {
        await this.studentRepository.update(id, updateStudentDto);

        const updatedStudent = await this.studentRepository.findOne({
          where: { id },
        });

        if (updatedStudent) {
          return {
            message: 'Student updated successfully',
            data: updatedStudent,
          };
        } else {
          throw new HttpException(
            `Updated student with ID ${id} not found`,
            HttpStatus.NOT_FOUND,
          );
        }
      } else {
        throw new HttpException(
          `Student with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      console.error('Error in updating student:', error);
      throw new HttpException(
        'Error updating student',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const student = await this.studentRepository.findOne({ where: { id } });

      if (student) {
        await this.studentRepository.delete(id);
        return {
          message: 'Student deleted successfully',
        };
      } else {
        throw new HttpException(
          `Student with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      console.error('Error in deleting student:', error);
      throw new HttpException(
        'Error deleting student',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // async findByAge(age: number) {
  //   try {
  //     const students = await this.studentRepository.find({
  //       where: { age },
  //     });

  //     if (!students.length) {
  //       throw new HttpException(
  //         `No students found with age ${age}`,
  //         HttpStatus.NOT_FOUND,
  //       );
  //     }

  //     return {
  //       message: 'Students with specified age fetched successfully',
  //       data: students,
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  // async findByGrade(grade: string) {
  //   try {
  //     const students = await this.studentRepository.find({
  //       where: { grade },
  //     });

  //     if (!students.length) {
  //       throw new HttpException(
  //         `No students found with grade ${grade}`,
  //         HttpStatus.NOT_FOUND,
  //       );
  //     }

  //     return {
  //       message: 'Students with specified grade fetched successfully',
  //       data: students,
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  //   async countAllStudents() {
  //     try {
  //       const count = await this.studentRepository.count();

  //       return {
  //         message: 'Total number of students counted successfully',
  //         data: count,
  //       };
  //     } catch (error) {
  //       console.log(error);
  //       throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  //     }
  //   }

  async getStudentsWithPagination(page: number) {
    try {
      const limit = 10;
      const [students, total] = await this.studentRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        message: 'Students fetched with pagination',
        data: students,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

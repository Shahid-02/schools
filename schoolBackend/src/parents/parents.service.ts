import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { Repository } from 'typeorm';
import { Parent } from './entities/parent.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ParentsService {
  constructor(
    @InjectRepository(Parent)
    private readonly parentsRepository: Repository<Parent>,
  ) {}

  async create(createParentDto: CreateParentDto) {
    try {
      const parentEmailFind = await this.parentsRepository.findOne({
        where: { email: createParentDto.email },
      });
      if (parentEmailFind) {
        throw new HttpException(
          'Parent with this email already exists',
          HttpStatus.CONFLICT,
        );
      } else {
        const parent = this.parentsRepository.create(createParentDto);
        if (parent) {
          await this.parentsRepository.save(parent);
          return {
            message: 'Parent created successfully',
            data: parent,
          };
        } else {
          throw new HttpException(
            'Parent creation failed',
            HttpStatus.BAD_GATEWAY,
          );
        }
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(pageNumber: number) {
    try {
      const limit = 10;
      const offset = (pageNumber - 1) * limit;

      // Fetch paginated data from the database
      const [parents, total] = await this.parentsRepository.findAndCount({
        order: { id: 'ASC' },
        skip: offset,
        take: limit,
      });

      if (parents && parents.length > 0) {
        return {
          message: 'All Parents are fetched successfully',
          data: parents,
          total, // Total number of records
          currentPage: pageNumber,
          totalPages: Math.ceil(total / limit), // Total pages based on the limit
        };
      } else {
        throw new HttpException('No Parents found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    try {
      const parent = await this.parentsRepository.findOne({
        where: { id },
      });
      if (parent) {
        return {
          message: 'Parent fetched successfully',
          data: parent,
        };
      } else {
        throw new HttpException(
          `Parent with id ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateParentDto: UpdateParentDto) {
    try {
      const parent = await this.parentsRepository.findOne({ where: { id } });
      if (parent) {
        await this.parentsRepository.update(id, updateParentDto);
        const updatedParent = await this.parentsRepository.findOne({
          where: { id },
        });
        return {
          message: 'Parent updated successfully',
          data: updatedParent,
        };
      } else {
        throw new HttpException(
          `Parent with id ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const parent = await this.parentsRepository.findOne({ where: { id } });
      if (parent) {
        await this.parentsRepository.remove(parent);
        return {
          message: 'Parent removed successfully',
        };
      } else {
        throw new HttpException(
          `Parent with id ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

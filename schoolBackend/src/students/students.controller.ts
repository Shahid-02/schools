import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get('/all')
  findAll() {
    return this.studentsService.findAll();
  }

  @Get('byId/:id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.studentsService.findOne(id);
  }

  @Get('/:page')
  async getStudentsAndParentsData(@Param('page') page: number) {
    const pageNumber = Number(page);
    return await this.studentsService.getStudentsAndParentsData(pageNumber);
  }
  // @Get('/:page')
  // async getStudentsWithPagination(@Param('page') page: number) {
  //   const pageNumber = Number(page);
  //   return this.studentsService.getStudentsWithPagination(pageNumber);
  // }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  name?: string;
  gender?: string;
  class?: string;
  dateOfBirth?: string;
  bloodGroup?: string;
  religion?: string;
  admissionDate?: string;
}

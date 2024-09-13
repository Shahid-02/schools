import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  readonly name: string;

  @IsNotEmpty({ message: 'Gender is required' })
  @IsString({ message: 'Gender must be a string' })
  readonly gender: string;

  @IsString()
  readonly class: string;

  @IsNotEmpty({ message: 'Date of Birth is required' })
  @IsDateString({}, { message: 'Date of Birth must be a valid date' })
  readonly dateOfBirth: string;

  @IsNotEmpty({ message: 'Blood Group is required' })
  @IsString({ message: 'Blood Group must be a string' })
  readonly bloodGroup: string;

  @IsNotEmpty({ message: 'Religion is required' })
  @IsString({ message: 'Religion must be a string' })
  readonly religion: string;

  @IsNotEmpty({ message: 'Admission Date is required' })
  @IsDateString({}, { message: 'Admission Date must be a valid date' })
  readonly admissionDate: string;
}

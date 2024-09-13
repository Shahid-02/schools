import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsDateString,
} from 'class-validator';

export class CreateTeacherDto {
  @IsNotEmpty({ message: 'First Name is required' })
  @IsString({ message: 'First Name must be a string' })
  readonly firstName: string;

  @IsNotEmpty({ message: 'Last Name is required' })
  @IsString({ message: 'Last Name must be a string' })
  readonly lastName: string;

  @IsNotEmpty({ message: 'Gender is required' })
  @IsString({ message: 'Gender must be a string' })
  readonly gender: string;

  @IsNotEmpty({ message: 'Date of Birth is required' })
  @IsDateString({}, { message: 'Date of Birth must be a valid date' })
  readonly dateOfBirth: string;

  @IsNotEmpty({ message: 'Blood Group is required' })
  @IsString({ message: 'Blood Group must be a string' })
  readonly bloodGroup: string;

  @IsNotEmpty({ message: 'Religion is required' })
  @IsString({ message: 'Religion must be a string' })
  readonly religion: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email address' })
  readonly email: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @IsPhoneNumber(null, { message: 'Invalid phone number' })
  readonly phone: string;

  @IsNotEmpty({ message: 'Class is required' })
  @IsString({ message: 'Class must be a string' })
  readonly class: string;

  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address must be a string' })
  readonly address: string;

  @IsNotEmpty({ message: 'Admission Date is required' })
  @IsDateString({}, { message: 'Admission Date must be a valid date' })
  readonly admissionDate: string;
}

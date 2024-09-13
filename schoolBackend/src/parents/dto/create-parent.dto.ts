import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateParentDto {
  @IsNotEmpty({ message: 'Father name is required' })
  readonly fatherName: string;

  @IsNotEmpty({ message: 'Mother name is required' })
  readonly motherName: string;

  @IsEmail({}, { message: 'Invalid email address' })
  readonly email: string;

  @IsPhoneNumber(null, { message: 'Invalid phone number' })
  readonly phoneNumber: string;

  @IsNotEmpty({ message: 'Father occupation is required' })
  readonly fatherOccupation: string;

  @IsNotEmpty({ message: 'Address is required' })
  readonly address: string;

  @IsNotEmpty({ message: 'Religion is required' })
  readonly religion: string;
}

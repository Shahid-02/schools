import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './register-admin.dto';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {}

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
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { ParentsService } from './parents.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('parents')
export class ParentsController {
  constructor(
    private readonly parentsService: ParentsService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  create(@Body() createParentDto: CreateParentDto) {
    return this.parentsService.create(createParentDto);
  }

  @Get('/:page')
  findAll(@Param('page') page: number) {
    const pageNumber = Number(page);
    return this.parentsService.findAll(pageNumber);
  }

  @Get('/:id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.parentsService.findOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateParentDto: UpdateParentDto) {
    return this.parentsService.update(+id, updateParentDto);
  }
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 80 * 1024 }),
          // new FileTypeValidator({ fileType: 'image/jpeg/png' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);

    if (!file) {
      return { message: 'File upload failed' };
    }

    try {
      const uploadResult = await this.cloudinaryService.uploadImage(
        file.buffer,
        'image',
      );

      return {
        message: 'File uploaded successfully',
        data: uploadResult,
      };
    } catch (error) {
      return {
        message: 'File upload failed',
        error: error.message,
      };
    }
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.parentsService.remove(+id);
  }
}

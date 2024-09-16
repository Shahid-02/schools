import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { StudentsModule } from './students/students.module';
import { ParentsModule } from './parents/parents.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TeacherModule } from './teacher/teacher.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './students/entities/student.entity';
import { Parent } from './parents/entities/parent.entity';
import { Admin } from './admin/entities/admin.entity';
import { RedisModule } from './redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { Teacher } from './teacher/entities/teacher.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AuthModule } from './middlerware/auth/auth.module';
import { AuthService } from './middlerware/auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Config rate limit
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 55,
      },
    ]),

    // Config database
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'khan72242',
      database: 'shcoolsDataBase',
      entities: [Student, Parent, Admin, Teacher],
      synchronize: true,
    }),
    StudentsModule,
    ParentsModule,
    SubjectsModule,
    TeacherModule,
    AdminModule,
    RedisModule,
    CloudinaryModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
// export class RootModule {}
export class RootModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthService)
      .exclude(
        { path: 'admin/register', method: RequestMethod.POST },
        {
          path: 'admin/login',
          method: RequestMethod.POST,
        },
      )
      .forRoutes('*');
  }
}

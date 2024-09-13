import { Student } from 'src/students/entities/student.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Parent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fatherName: string;

  @Column()
  motherName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  fatherOccupation: string;

  @Column()
  address: string;

  @Column()
  religion: string;

  @OneToOne(() => Student, (student) => student.parent)
  student: Student;
}

import { Parent } from 'src/parents/entities/parent.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  class: string;

  @Column()
  dateOfBirth: string;

  @Column()
  bloodGroup: string;

  @Column()
  religion: string;

  @Column()
  admissionDate: string;

  @Column()
  parentId: number;

  @OneToOne(() => Parent, (parent) => parent.student)
  @JoinColumn({ name: 'parentId', referencedColumnName: 'id' })
  parent: Parent;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  gender: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  bloodGroup: string;

  @Column()
  religion: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  class: string;

  @Column()
  address: string;

  @Column()
  admissionDate: Date;
}

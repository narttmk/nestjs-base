import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index('user_email_idx')
    @Column({ unique: true })
    email: string;

    @Index('user_username_idx')
    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
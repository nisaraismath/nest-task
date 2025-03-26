import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsEmail, IsEnum } from 'class-validator';

export enum UserRole {
    Super_Admin = 'Super_Admin',
    Admin = 'Admin',
    User = 'User'
}

export enum UserStatus {
    Active = 'Active',
    Inactive = 'Inactive'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: 'text',
        nullable:false
    })
    username: string;

    @Column({
        type: 'text',
        unique: true,
        nullable:false

    })
    @IsEmail()
    email: string

    @Column({
        nullable:false,
        select: false
    })
    password?: string

    @Column({
        type: 'text',
        nullable:false

    })
    firstName: string

    @Column({
        type: 'text',
        nullable:false

    })
    lastName: string

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.User
    })
    @IsEnum(UserRole)
    role: UserRole;

    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.Active
    })
    @IsEnum(UserStatus)
    status: UserStatus;

    @CreateDateColumn({
        type: "timestamp"
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: "timestamp"
    })
    updatedAt: Date;
    
}



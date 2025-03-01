import { IsNotEmpty, IsString, Matches, MaxLength, Min, MinLength } from 'class-validator';

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(128)
    @Matches(/^(?=.*[A-Z]).*$/, { message: 'Password must contain at least one uppercase letter' })
    @Matches(/^(?=.*[a-z]).*$/, { message: 'Password must contain at least one lowercase letter' })
    @Matches(/^(?=.*\d).*$/, { message: 'Password must contain at least one number' })
    @Matches(/^(?=.*[!@#$%^&*]).*$/, { message: 'Password must contain at least one special character' })
    password: string;
} 
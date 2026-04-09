import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LogInUserDto, RegisterUserDto, ResetPasswordDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import * as argon from "argon2";
import { Otp } from '../utils/otp';
import * as jwt from "jsonwebtoken";
import { Mail } from '../utils/mail';
import { LogService } from '../log/log.service';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User)
  private usersRepo: Repository<User>, private logService: LogService) { }

  async createUser(dto: RegisterUserDto) {
    try {
      const user = await this.usersRepo.findOne({ where: { email: dto.email } });
      if (user) {
        throw new BadRequestException('User already exists');
      }

      const hashedPassword = await argon.hash(dto.password);
      const otp = new Otp().generateOTP();
      const newUser = this.usersRepo.create({ ...dto, password: hashedPassword, verificationCode: otp.token, verificationTime: otp.expiration });
      const saveUser = await this.usersRepo.save(newUser);

      const messageBody = `
      <p>Dear ${saveUser.firstName}</p>
      <p>Thank you for registering on KodasHub. Please verify your email address to complete your registration.</p>
      <p>Your verification code is <b>${otp.token}</b>. This code will expire in 10 mins</p>
      <p>If you did not create this account, please ignore this email</p>
      <p>Thank you for using KodasHub</p>
      <p>Best regards,</p>
      <p><b>The KodasHub Team</b></p>
      `;
      const sendMail = await new Mail().sendMail(saveUser.email, "Verify your email", messageBody);
      return { message: sendMail.message, result: { id: saveUser.id, email: saveUser.email } }
    } catch (error) {
      throw error;
    }
  }

  async resendVerificationCode(email: string) {
    try {
      const user = await this.usersRepo.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (user.isVerified) {
        throw new BadRequestException('User already verified');
      }

      const otp = new Otp().generateOTP();
      user.verificationCode = otp.token;
      user.verificationTime = otp.expiration;
      await this.usersRepo.save(user);

      const messageBody = `
      <p>Dear ${user.firstName}</p>
      <p>Thank you for registering on KodasHub. Please verify your email address to complete your registration.</p>
      <p>Your verification code is <b>${otp.token}</b>. This code will expire in 10 mins</p>
      <p>If you did not create this account, please ignore this email</p>
      <p>Thank you for using KodasHub</p>
      <p>Best regards,</p>
      <p><b>The KodasHub Team</b></p>
      `;
      await new Mail().sendMail(user.email, "Verify your email", messageBody);
      return { message: 'Verification code resent successfully' }
    } catch (error) {
      throw error
    }
  }

  async verifyUser(token: string) {
    try {
      const user = await this.usersRepo.findOne({ where: { verificationCode: token } });
      if (!user) {
        throw new BadRequestException('Invalid verification code');
      }
      if (user.isVerified) {
        throw new BadRequestException('User already verified');
      }
      if (user.verificationTime && user.verificationTime < new Date()) {
        throw new BadRequestException('Verification code expired');
      }

      user.isVerified = true;
      user.verificationCode = "";
      user.verificationTime = undefined;
      await this.usersRepo.save(user);

      return { message: 'User verified successfully' }
    } catch (error) {
      throw error
    }
  }

  async loginUser(dto: LogInUserDto, req: Request) {
    try {
      const user = await this.usersRepo.findOne({ where: { email: dto.email } });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      if (!user.isVerified) {
        throw new UnauthorizedException('User not verified');
      }

      if (user.isDeleted) {
        throw new UnauthorizedException('User not found, contact admin');
      }

      const isPasswordValid = await argon.verify(user.password, dto.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      await this.logService.create({ action: "login", description: "User logged in successfully" }, user.id, req);
      const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRATION_TIME || '1h' });
      return { message: 'User logged in successfully', result: { id: user.id, email: user.email, token } }
    } catch (error) {
      throw error
    }
  }

  async forgotPassword(email: string) {
    try {
      if (!email) throw new BadRequestException("Email is required")

      const user = await this.usersRepo.findOne({ where: { email } });
      if (!user) throw new NotFoundException('User not found');

      if (user.isDeleted) throw new NotFoundException('User not found, contact admin');

      const otp = new Otp().generateOTP();
      user.resetPasswordCode = otp.token;
      user.resetPasswordTime = otp.expiration;
      await this.usersRepo.save(user);

      const messageBody = `
      <p>Dear ${user.firstName}</p>
      <p>Thank you for using KodasHub. Please use the code below to reset your password.</p>
      <p>Your verification code is <b>${otp.token}</b>. This code will expire in 10 mins</p>
      <p>If you did not request this, please ignore this email</p>
      <p>Thank you for using KodasHub</p>
      <p>Best regards,</p>
      <p><b>The KodasHub Team</b></p>
      `;
      await new Mail().sendMail(user.email, "Reset your password", messageBody);
      return { message: 'Password reset code sent successfully' }
    } catch (error) {
      throw error
    }
  }

  async resetPassword(dto: ResetPasswordDto, req: Request) {
    try {
      if (!dto.token) throw new BadRequestException("Token is required")

      const user = await this.usersRepo.findOne({ where: { resetPasswordCode: dto.token } });
      if (!user) {
        throw new BadRequestException('Invalid verification code');
      }
      if (user.isDeleted) {
        throw new NotFoundException('User not found, contact admin');
      }
      if (user.resetPasswordTime && user.resetPasswordTime < new Date()) {
        throw new BadRequestException('Verification code expired');
      }
      if (dto.newPassword !== dto.confirmPassword) {
        throw new BadRequestException('Passwords do not match');
      }

      user.password = await argon.hash(dto.newPassword);
      user.resetPasswordCode = "";
      user.resetPasswordTime = new Date();

      await this.usersRepo.save(user);
      await this.logService.create({ action: "Reset password", description: "Password reset successfully" }, user.id, req);
      return { message: 'Password reset successfully' }
    } catch (error) {
      throw error
    }
  }
}

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema,UserModel } from './user.model'; 



@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Provide ItemModel
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
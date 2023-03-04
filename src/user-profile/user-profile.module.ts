import { Module } from '@nestjs/common'
import { UserProfileService } from './services/user-profile.service'
import { NutritionistProfileService } from './services/nutritionist-profile.service'
import { UserProfileResolver } from './resolvers/user-profile.resolver'
import { PrismaService } from 'src/PrismaService/PrismaService'

@Module({
  providers: [
    PrismaService,
    UserProfileResolver,
    NutritionistProfileService,
    UserProfileService,
  ],
})
export class UserProfileModule {}

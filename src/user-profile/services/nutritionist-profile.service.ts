import { Injectable } from '@nestjs/common'
import { CreateUserProfileInput } from '../dto/create-user-profile.input'
import { UserActivityStatus, UserAccessType } from '@prisma/client'
import { UserProfile } from '../entities/user-profile.entity'
import { transformPrismaUserToUserGraphQLEntity } from '../dataTransform/transformPrismaUserToUserGraphQLEntity'
import { PrismaService } from '../../PrismaService/PrismaService'
import { transformCreateUserInputToPrismaCreateUserPayload } from '../dataTransform/transformCreateUserInputToPrismaCreateUserPayload'

@Injectable()
export class NutritionistProfileService {
  constructor(private prisma: PrismaService) {}

  async create(
    createUserProfileInput: CreateUserProfileInput,
  ): Promise<UserProfile> {
    const createdUser = await this.prisma.user.create({
      data: transformCreateUserInputToPrismaCreateUserPayload(
        createUserProfileInput,
        UserAccessType.NUTRITIONIST,
      ),
      include: { personalData: true },
    })

    return transformPrismaUserToUserGraphQLEntity(createdUser)
  }

  async findAll(): Promise<Array<UserProfile>> {
    const users = await this.prisma.user.findMany({
      where: {
        status: { not: UserActivityStatus.REMOVED },
        access: { some: { type: UserAccessType.NUTRITIONIST } },
      },
      include: { personalData: true },
    })

    return users.map((user) => transformPrismaUserToUserGraphQLEntity(user))
  }

  async findOne(id: string): Promise<UserProfile | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
        status: { not: UserActivityStatus.REMOVED },
        access: { some: { type: UserAccessType.NUTRITIONIST } },
      },
      include: { personalData: true },
    })

    if (!user) {
      return null
    }

    return transformPrismaUserToUserGraphQLEntity(user)
  }
}

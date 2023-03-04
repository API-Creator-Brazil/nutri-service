import { Injectable } from '@nestjs/common'
import { UpdateUserProfileInput } from '../dto/update-user-profile.input'
import { UserActivityStatus } from '@prisma/client'
import { UserProfile } from '../entities/user-profile.entity'
import { transformPrismaUserToUserGraphQLEntity } from '../dataTransform/transformPrismaUserToUserGraphQLEntity'
import { PrismaService } from '../../PrismaService/PrismaService'
import { transformUpdateUserPersonalDataToPrismaUpdateUserPayload } from '../dataTransform/transformUpdateUserPersonalDataToPrismaUpdateUserPayload'

@Injectable()
export class UserProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UserProfile[]> {
    const users = await this.prisma.user.findMany({
      where: {
        status: { not: UserActivityStatus.REMOVED },
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
      },
      include: { personalData: true },
    })

    if (user === null) {
      return null
    }

    return transformPrismaUserToUserGraphQLEntity(user)
  }

  async updatePersonalData(
    id: string,
    updateUserProfileInput: UpdateUserProfileInput,
  ): Promise<UserProfile | null> {
    const updatedUser = await this.prisma.$transaction(async (transaction) => {
      const activeUser = await transaction.user.findFirst({
        where: {
          id,
          status: { not: UserActivityStatus.REMOVED },
        },
      })

      if (activeUser === null) {
        return null
      }

      return await transaction.user.update({
        data: transformUpdateUserPersonalDataToPrismaUpdateUserPayload(
          updateUserProfileInput,
        ),
        where: { id },
        include: { personalData: true },
      })
    })

    if (updatedUser === null) {
      return null
    }

    return transformPrismaUserToUserGraphQLEntity(updatedUser)
  }

  async remove(id: string): Promise<UserProfile | null> {
    const removedUser = await this.prisma.$transaction(async (transaction) => {
      const activeUser = await transaction.user.findFirst({
        where: {
          id,
          status: { not: UserActivityStatus.REMOVED },
        },
      })

      if (activeUser === null) {
        return null
      }

      return await transaction.user.update({
        data: { status: UserActivityStatus.REMOVED },
        where: { id },
        include: { personalData: true },
      })
    })

    if (removedUser === null) {
      return null
    }

    return transformPrismaUserToUserGraphQLEntity(removedUser)
  }
}

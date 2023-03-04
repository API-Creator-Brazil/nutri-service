import { Prisma, UserAccessType, UserActivityStatus } from '@prisma/client'
import { CreateUserProfileInput } from '../dto/create-user-profile.input'
import { parseUserPersonalData } from './parseUserPersonalData'

export const transformCreateUserInputToPrismaCreateUserPayload = (
  createUserProfileInput: CreateUserProfileInput,
  accessType: UserAccessType,
): Prisma.UserCreateInput => {
  return {
    personalData: {
      createMany: {
        data: parseUserPersonalData(createUserProfileInput),
      },
    },
    access: {
      createMany: {
        data: [{ type: accessType }],
      },
    },
    status: UserActivityStatus.ACTIVE,
  }
}

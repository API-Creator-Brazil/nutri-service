import { Prisma } from '@prisma/client'
import { UpdateUserProfileInput } from '../dto/update-user-profile.input'
import { parseUserPersonalData } from './parseUserPersonalData'

export const transformUpdateUserPersonalDataToPrismaUpdateUserPayload = (
  updateUserProfileInput: UpdateUserProfileInput,
): Prisma.UserUpdateInput => {
  return {
    personalData: {
      deleteMany: {},
      createMany: {
        data: parseUserPersonalData(updateUserProfileInput),
      },
    },
  }
}

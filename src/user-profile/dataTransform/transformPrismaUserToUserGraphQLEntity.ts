import { User, UserPersonalData, UserPersonalDataType } from '@prisma/client'
import { UserProfile } from '../entities/user-profile.entity'

type UserWithPersonalData = User & {
  personalData: UserPersonalData[]
}

export const transformPrismaUserToUserGraphQLEntity = (
  user: UserWithPersonalData,
): UserProfile => {
  return {
    id: user.id,
    status: user.status,
    name: findPersonalData(user, UserPersonalDataType.NAME),
    email: findPersonalData(user, UserPersonalDataType.EMAIL),
    phone: findPersonalData(user, UserPersonalDataType.PHONE),
    cpf: findPersonalData(user, UserPersonalDataType.CPF),
    birthday: findPersonalData(user, UserPersonalDataType.BIRTHDAY),
  }
}

const findPersonalData = (
  user: UserWithPersonalData,
  type: UserPersonalDataType,
): string | undefined => {
  const data = user.personalData.find((data) => data.type === type)

  if (!data) {
    return undefined
  }

  return data.value
}

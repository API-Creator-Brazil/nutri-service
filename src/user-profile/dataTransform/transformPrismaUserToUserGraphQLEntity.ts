import { User, UserPersonalData, UserPersonalDataType } from '@prisma/client'
import { UserProfile } from '../entities/user-profile.entity'

type UserWithPersonalData = User & {
  personalData: UserPersonalData[]
}

export const transformPrismaUserToUserGraphQLEntity = (
  user: UserWithPersonalData,
): UserProfile => {
  const name = findPersonalData(user, UserPersonalDataType.NAME)
  const email = findPersonalData(user, UserPersonalDataType.EMAIL)
  const phone = findPersonalData(user, UserPersonalDataType.PHONE)

  if (name === undefined) {
    throw new Error('Expected name to exist')
  }

  if (email === undefined) {
    throw new Error('Expected name to exist')
  }

  if (phone === undefined) {
    throw new Error('Expected name to exist')
  }

  return {
    id: user.id,
    status: user.status,
    name,
    email,
    phone,
    cpf: findPersonalData(user, UserPersonalDataType.CPF),
    birthday: findPersonalData(user, UserPersonalDataType.BIRTHDAY),
  }
}

const findPersonalData = (
  user: UserWithPersonalData,
  type: UserPersonalDataType,
): string | undefined => {
  const data = user.personalData.find((data) => data.type === type)

  if (data === undefined) {
    return undefined
  }

  return data.value
}

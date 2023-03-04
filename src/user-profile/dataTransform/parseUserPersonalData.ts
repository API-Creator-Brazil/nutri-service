import { Prisma, UserPersonalDataType } from '@prisma/client'
import { RawUserProfileInput } from '../dto/raw-user-profile.input'

export const parseUserPersonalData = (
  createUserProfileInput: RawUserProfileInput,
): Prisma.Enumerable<Prisma.UserPersonalDataCreateManyUserInput> => {
  const userPersonalData: Prisma.Enumerable<Prisma.UserPersonalDataCreateManyUserInput> =
    []

  userPersonalData.push({
    value: createUserProfileInput.name,
    type: UserPersonalDataType.NAME,
  })

  userPersonalData.push({
    value: createUserProfileInput.email,
    type: UserPersonalDataType.EMAIL,
  })

  userPersonalData.push({
    value: createUserProfileInput.phone,
    type: UserPersonalDataType.PHONE,
  })

  if (createUserProfileInput.cpf !== undefined) {
    userPersonalData.push({
      value: createUserProfileInput.cpf,
      type: UserPersonalDataType.CPF,
    })
  }

  if (createUserProfileInput.birthday !== undefined) {
    userPersonalData.push({
      value: createUserProfileInput.birthday,
      type: UserPersonalDataType.BIRTHDAY,
    })
  }

  return userPersonalData
}

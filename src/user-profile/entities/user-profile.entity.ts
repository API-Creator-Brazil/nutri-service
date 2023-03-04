import { Field, ObjectType } from '@nestjs/graphql'
import { UserActivityStatus } from '@prisma/client'
import { CPFScalar } from 'src/CustomGraphQLScalars/CPF'
import { DateStringScalar } from 'src/CustomGraphQLScalars/DateString'
import { EmailScalar } from 'src/CustomGraphQLScalars/Email'
import { FullNameScalar } from 'src/CustomGraphQLScalars/FullName'
import { PhoneScalar } from 'src/CustomGraphQLScalars/Phone'
import { UserActivityStatusEnum } from 'src/CustomGraphQLScalars/UserActivityStatus'
import { CustomUUIDScalar } from 'src/CustomGraphQLScalars/UUID'
import { RawUserProfileInput } from '../dto/raw-user-profile.input'

@ObjectType()
export class UserProfile extends RawUserProfileInput {
  @Field(() => CustomUUIDScalar, { description: 'User id' })
  id: string

  @Field(() => FullNameScalar, { description: 'User name' })
  name: string

  @Field(() => EmailScalar, { description: 'User email' })
  email: string

  @Field(() => PhoneScalar, { description: 'User phone' })
  phone: string

  @Field(() => CPFScalar, { description: 'User cpf' })
  cpf?: string

  @Field(() => DateStringScalar, { description: 'User birthday' })
  birthday?: string

  @Field(() => UserActivityStatusEnum, { description: 'User status' })
  status: UserActivityStatus
}

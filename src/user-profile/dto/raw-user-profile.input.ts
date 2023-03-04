import { InputType, Field } from '@nestjs/graphql'
import { CPFScalar } from 'src/CustomGraphQLScalars/CPF'
import { DateStringScalar } from 'src/CustomGraphQLScalars/DateString'
import { EmailScalar } from 'src/CustomGraphQLScalars/Email'
import { FullNameScalar } from 'src/CustomGraphQLScalars/FullName'
import { PhoneScalar } from 'src/CustomGraphQLScalars/Phone'

@InputType()
export class RawUserProfileInput {
  @Field(() => FullNameScalar, { description: 'User name' })
  name: string

  @Field(() => EmailScalar, { description: 'User email' })
  email: string

  @Field(() => PhoneScalar, { description: 'User phone' })
  phone: string

  @Field(() => CPFScalar, { description: 'User cpf', nullable: true })
  cpf?: string

  @Field(() => DateStringScalar, {
    description: 'User birthday',
    nullable: true,
  })
  birthday?: string
}

import { Field, InputType } from '@nestjs/graphql'
import { CustomUUIDScalar } from 'src/CustomGraphQLScalars/UUID'
import { RawUserProfileInput } from './raw-user-profile.input'

@InputType()
export class UpdateUserProfileInput extends RawUserProfileInput {
  @Field(() => CustomUUIDScalar, { description: 'user id' })
  id: string
}

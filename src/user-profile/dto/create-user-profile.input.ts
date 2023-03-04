import { InputType } from '@nestjs/graphql'
import { RawUserProfileInput } from './raw-user-profile.input'

@InputType()
export class CreateUserProfileInput extends RawUserProfileInput {}

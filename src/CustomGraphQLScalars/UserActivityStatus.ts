import { registerEnumType } from '@nestjs/graphql'

export enum UserActivityStatusEnum {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
  REMOVED = 'REMOVED',
}

registerEnumType(UserActivityStatusEnum, {
  name: 'UserActivityStatusEnum',
  description: 'User activity status',
})

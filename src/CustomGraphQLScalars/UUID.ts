import { GraphQLScalarType, Kind } from 'graphql'
import validator from 'validator'

export function validate(uuid: unknown): string | never {
  if (typeof uuid !== 'string' || !validator.isUUID(uuid)) {
    throw new Error('invalid uuid')
  }
  return uuid
}

export const CustomUUIDScalar = new GraphQLScalarType({
  name: 'UUID',
  description: 'UUID parser',
  serialize: (value) => validate(value),
  parseValue: (value) => validate(value),
  parseLiteral: (ast) => ast.kind === Kind.STRING && validate(ast.value),
})

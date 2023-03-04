import { GraphQLScalarType, Kind } from 'graphql'
import validator from 'validator'

export function validate(value: unknown): string | never {
  if (typeof value !== 'string' || !validator.isEmail(value)) {
    throw new Error('invalid email')
  }
  return value
}

export const EmailScalar = new GraphQLScalarType({
  name: 'Email',
  description: 'Email parser',
  serialize: (value) => validate(value),
  parseValue: (value) => validate(value),
  parseLiteral: (ast) => ast.kind === Kind.STRING && validate(ast.value),
})

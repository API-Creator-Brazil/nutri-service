import { GraphQLScalarType, Kind } from 'graphql'
import validator from 'validator'

export function validate(value: unknown): string | never {
  if (typeof value !== 'string' || !validator.isMobilePhone(value)) {
    throw new Error('invalid phone')
  }
  return value
}

export const PhoneScalar = new GraphQLScalarType({
  name: 'Phone',
  description: 'Phone parser',
  serialize: (value) => validate(value),
  parseValue: (value) => validate(value),
  parseLiteral: (ast) => ast.kind === Kind.STRING && validate(ast.value),
})

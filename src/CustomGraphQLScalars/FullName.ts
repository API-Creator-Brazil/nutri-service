import { GraphQLScalarType, Kind } from 'graphql'
import validator from 'validator'

export function validate(value: unknown): string | never {
  if (
    typeof value !== 'string' ||
    !value
      .split(' ')
      .every((word) => validator.isAlpha(word) && word.length >= 2) ||
    value.split(' ').length < 2
  ) {
    throw new Error('invalid full name')
  }
  return value
}

export const FullNameScalar = new GraphQLScalarType({
  name: 'FullName',
  description: 'FullName parser',
  serialize: (value) => validate(value),
  parseValue: (value) => validate(value),
  parseLiteral: (ast) => ast.kind === Kind.STRING && validate(ast.value),
})

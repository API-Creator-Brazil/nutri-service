import { GraphQLScalarType, Kind } from 'graphql'
import validator from 'validator'

export function validate(value: unknown): string | never {
  if (
    typeof value !== 'string' ||
    !validator.isDate(value, { format: 'DD/MM/YYYY' })
  ) {
    throw new Error('invalid date')
  }
  return value
}

export const DateStringScalar = new GraphQLScalarType({
  name: 'DateString',
  description: 'Date parser DD/M/MYYY',
  serialize: (value) => validate(value),
  parseValue: (value) => validate(value),
  parseLiteral: (ast) => ast.kind === Kind.STRING && validate(ast.value),
})

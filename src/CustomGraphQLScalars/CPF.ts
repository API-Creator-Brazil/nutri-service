import { GraphQLScalarType, Kind } from 'graphql'
import { cpf } from 'cpf-cnpj-validator'

export function validate(value: unknown): string | never {
  if (typeof value !== 'string' || !cpf.isValid(value)) {
    throw new Error('invalid cpf')
  }
  return value
}

export const CPFScalar = new GraphQLScalarType({
  name: 'CPF',
  description: 'CPF parser',
  serialize: (value) => validate(value),
  parseValue: (value) => validate(value),
  parseLiteral: (ast) => ast.kind === Kind.STRING && validate(ast.value),
})

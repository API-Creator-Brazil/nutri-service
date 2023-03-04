import { validate } from './Email'

describe('Email - validation', () => {
  it('should parse string', () => {
    expect(validate('test@mail.com')).toBe('test@mail.com')
  })

  it.each([
    ['test@mail'],
    ['@mail.com'],
    ['test@.com'],
    [undefined],
    [null],
    [123],
    [123.1],
    [new Date()],
    [{ birthday: new Date() }],
  ])('should throw if invalid (%s)', (invaludValue) => {
    expect(() => validate(invaludValue)).toThrow()
  })
})

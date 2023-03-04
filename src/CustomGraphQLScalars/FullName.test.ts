import { validate } from './FullName'

describe('FullName - validation', () => {
  it('should parse string', () => {
    expect(validate('john doe')).toBe('john doe')
  })

  it.each([
    ['john'],
    ['john d'],
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

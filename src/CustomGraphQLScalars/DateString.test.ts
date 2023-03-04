import { validate } from './DateString'

describe('DateString - validation', () => {
  it('should parse string', () => {
    expect(validate('01/01/2000')).toBe('01/01/2000')
  })

  it.each([
    ['01012000'],
    [undefined],
    [null],
    [1012000],
    [1012000.1],
    [new Date()],
    [{ birthday: new Date() }],
  ])('should throw if invalid (%s)', (invaludValue) => {
    expect(() => validate(invaludValue)).toThrow()
  })
})

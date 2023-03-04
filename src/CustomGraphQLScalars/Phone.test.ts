import { validate } from './Phone'

describe('Phone - validation', () => {
  it('should parse string', () => {
    expect(validate('(11)91234-5678')).toBe('(11)91234-5678')
  })

  it.each([
    ['91234-5678'],
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

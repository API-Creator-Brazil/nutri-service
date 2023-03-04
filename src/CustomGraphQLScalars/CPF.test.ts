import { validate } from './CPF'

describe('CPF - validation', () => {
  it('should parse string', () => {
    expect(validate('466.536.540-79')).toBe('466.536.540-79')
  })

  it.each([
    ['12345678911'],
    [undefined],
    [null],
    [12345678911],
    [123456789.11],
    [new Date()],
    [{ birthday: new Date() }],
  ])('should throw if invalid (%s)', (invaludValue) => {
    expect(() => validate(invaludValue)).toThrow()
  })
})

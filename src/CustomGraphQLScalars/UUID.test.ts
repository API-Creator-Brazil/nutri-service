import { validate } from './UUID'

describe('UUID - validation', () => {
  it('should parse string', () => {
    expect(validate('7ba16bce-b2e8-40b9-a817-ec8221c5f5da')).toBe(
      '7ba16bce-b2e8-40b9-a817-ec8221c5f5da',
    )
  })

  it.each([
    ['7ba16bce'],
    ['7ba16bce-b2e8-'],
    ['7ba16bce-b2e8-40b9-a817-'],
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

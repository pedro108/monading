import Maybe from '../monads/maybe'

describe('Maybe', () => {
  describe('.bind', () => {
    it('executes a function that receives the Maybe monad value', () => {
      const value = 5

      const operatedMonadicValue = Maybe.of(value).bind(v => v ** 2)

      expect(operatedMonadicValue.flatten()).toEqual(25)
    })

    it('allows functions to be composed to operate on the monadic value', () => {
      const value = 5

      const operatedMonadicValue = Maybe.of(value)
        .bind(v => v - 3)
        .bind(v => v ** 2)

      expect(operatedMonadicValue.flatten()).toEqual(4)
    })

    it('returns a Maybe with nothing when one of the functions in the composition returns an invalid value', () => {
      const value = 5

      const operatedMonadicValue = Maybe.of(value)
        .bind(v => v - 3)
        .bind(() => null)
        .bind(v => v ** 2)

      expect(operatedMonadicValue.flatten()).toEqual(Maybe.Nothing)
    })
  })

  describe('.lift', () => {})
})

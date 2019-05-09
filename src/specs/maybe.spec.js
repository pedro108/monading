import Maybe from '../monads/maybe'

describe('Maybe', () => {
  describe('.value', () => {
    it('returns the value in the monad', () => {
      const value = randomValue()
      const maybeValue = Maybe.of(value)

      expect(maybeValue.value()).toEqual(value)
    })
  })

  describe('.bind', () => {
    it('executes a function that receives the Maybe monad value', () => {
      const value = randomValue()

      const maybeValue = Maybe.of(value).bind(v => v ** 2)

      expect(maybeValue.value()).toEqual(value ** 2)
    })

    it('allows functions to be composed to operate on the monadic value', () => {
      const value = randomValue()

      const maybeValue = Maybe.of(value)
        .bind(v => v - 3)
        .bind(v => v ** 2)

      expect(maybeValue.value()).toEqual((value - 3) ** 2)
    })

    it('returns a Maybe with nothing when one of the functions in the composition returns an invalid value', () => {
      const value = randomValue()

      const maybeValue = Maybe.of(value)
        .bind(v => v - 3)
        .bind(() => null)
        .bind(v => v ** 2)

      expect(maybeValue.value()).toEqual(Maybe.Nothing)
    })
  })

  describe('.orElse', () => {
    it('returns the monad value if it is in a valid state', () => {
      const value = randomValue()

      const maybeValue = Maybe.of(value)

      expect(maybeValue.orElse('another value')).toEqual(value)
    })

    it('returns the value given to the function if the monad holds a value in an invalid state', () => {
      const value = undefined

      const maybeValue = Maybe.of(value)

      expect(maybeValue.orElse('another value')).toEqual('another value')
    })
  })

  describe('.lift', () => {
    it('turns a function that operates with a value to a function that operates with a monadic value', () => {
      const f = (v) => v ** 2

      const liftedF = Maybe.lift(f)

      expect(f(undefined)).toEqual(NaN)
      expect(liftedF(undefined).value()).toEqual(Maybe.Nothing)
      expect(liftedF(5).value()).toEqual(25)
    })
  })
})

function randomValue() {
  return Math.floor(Math.random() * 10**10)
}

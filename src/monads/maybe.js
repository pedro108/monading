import Monad from './monad'

const Nothing = Symbol('Nothing')

const Maybe = Monad({
  isInvalid: (v) => (v === null || v === undefined),
  empty: Nothing,
  type: Symbol('Maybe'),
  operations: {
    orElse(monad) {
      return function (defaultValue) {
        if (monad.isEmpty()) {
          return defaultValue
        }

        return monad.value
      }
    }
  }
})

Maybe.Nothing = Nothing

export default Maybe

import Monad from './monad'

const Nothing = Symbol('Nothing')

const Maybe = Monad({
  unit(value) {
    return (value === null || value === undefined) ? Nothing : value
  },
  empty: Nothing,
  type: Symbol('Maybe'),
  operations: {
    orElse(context) {
      return function (defaultValue) {
        if (context.isEmpty()) {
          return defaultValue
        }

        return context.value
      }
    }
  }
})

Maybe.Nothing = Nothing

export default Maybe

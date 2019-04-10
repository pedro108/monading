export default function Monad({ isInvalid, empty, type, operations = {} }) {
  const monad = function(v) {
    const _v = unit(v)

    function unit(v) {
      if (typeof isInvalid === 'function' && isInvalid(v)) {
        return empty
      }

      if (v && v.__type__ === type) {
        return v.flatten()
      }

      return v
    }

    function isEmpty() {
      return _v === empty
    }

    function bind(f) {
      if (isEmpty()) {
        return monad.of(empty)
      }

      return monad.of(f(_v))
    }

    function flatten() {
      return _v
    }

    function bindOperations() {
      return Object.keys(operations)
        .reduce((acc, operationName) => {
          const operation = operations[operationName]
          const operationContext = { value: _v, isEmpty }

          return {
            ...acc,
            [operationName]: operation(operationContext)
          }
        }, {})
    }

    return {
      bind,
      flatten,
      ...bindOperations(),
      __type__: type,
    }
  }

  monad.of = (v) => new monad(v)

  monad.lift = (f) => (mV) => monad.of(mV).bind(f)

  return monad
}

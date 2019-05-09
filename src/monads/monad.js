export default function Monad({ unit, empty, type, operations = {} }) {
  const monad = function(v) {
    const _v = _unit(v)

    function _unit(v) {
      if (v && v.__type__ === type) {
        return v.flatten()
      }

      return unit(v)
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

    function value() {
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
      value,
      ...bindOperations(),
      __type__: type,
    }
  }

  monad.of = (v) => new monad(v)

  monad.lift = (f) => (mV) => monad.of(mV).bind(f)

  return monad
}

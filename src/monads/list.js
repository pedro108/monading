import Monad from './monad'

const List = Monad({
  isInvalid: (arr) => !Array.isArray(arr),
  empty: [],
  type: Symbol('List'),
  operations: {
    map(monad) {
      const op = function (f, arr = monad.value, i = 0) {
        if (i < arr.length) {
          const newArr = [ ...arr ]
          newArr[i] = f(arr[i])

          return op(f, newArr, i + 1)
        }

        return List.of(arr)
      }

      return op
    }
  }
})

export default List

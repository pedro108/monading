import Monad from './monad'

const List = Monad({
  unit(value) {
    return Array.isArray(value) ? value : [value]
  },
  empty: [],
  type: Symbol('List'),
  operations: {
    map(context) {
      const op = function (f, arr = context.value, i = 0) {
        if (i < arr.length) {
          const newArr = [ ...arr ]
          newArr[i] = f(arr[i])

          return op(f, newArr, i + 1)
        }

        return List.of(arr)
      }

      return op
    },

    reduce(context) {
      const op = function (f, acc, arr = context.value, i = 0) {
        if (i < arr.length) {
          return op(f, f(acc, arr[i]), arr,i + 1)
        }

        return acc
      }

      return op
    },

    filter(context) {
      return function (f) {
        const arr = context.value
        let newArr = []
        for (let i = 0; i < arr.length; i++) {
          if (f(arr[i])) {
            newArr.push(arr[i])
          }
        }

        return List.of(newArr)
      }
    }
  }
})

List.of = (...args) => {
  const flatten = (arr) => {
    if (!Array.isArray(arr)) return arr

    return arr.reduce((acc, value) => {
      return acc.concat(flatten(value))
    }, [])
  }

  return new List(flatten(args))
}

export default List

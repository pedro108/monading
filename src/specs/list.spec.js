import List from '../monads/list'

describe('List', () => {
  describe('.lift', () => {
    it('turns a function that operates with an array to a function that operates with a List monad', () => {
      const push1 = (arr) => arr.concat(1)

      const mPush1 = List.lift(push1)

      expect(push1([])).toEqual(mPush1([]).value())
    })
  })

  describe('.of', () => {
    it('creates a List monad for the arguments list as a flattened array', () => {
      const list = List.of(1, 2, [3, 4], [[5], 6])

      expect(list.value()).toEqual([1, 2, 3, 4, 5, 6])
    })
  })

  describe('.map', () => {
    it('executes the given map function to every element in the List monad', () => {
      const list = List.of([0, 1, 2, 3, 4, 5])

      expect(list.map((v) => 2 ** v).value()).toEqual([1, 2, 4, 8, 16, 32])
    })
  })

  describe('.reduce', () => {
    it('executes the given reduce function to every element in the List monad to generate a single value that is accumulated on each step', () => {
      const list = List.of(1, 10, 100, 1000)

      expect(list.reduce((acc, v) => acc + v, 0)).toEqual(1111)
    })
  })

  describe('.filter', () => {
    it('returns a new list monad with an array of values that returns true for the given function', () => {
      const list = List.of(1, 2, 3, 4, 5, 6, 7)

      expect(list.filter((v) => v % 2 === 1).value()).toEqual([1, 3, 5, 7])
    })
  })
})

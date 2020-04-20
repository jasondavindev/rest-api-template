import { Offer } from '@/database/models'

describe('Offer', () => {
  describe('when seats is greater than 0', () => {
    it('decrements seats', () => {
      const offer = new Offer()
      offer.seats = 10

      expect(offer.decrement()).toBe(9)
    })
  })

  describe('when seats is less than 1', () => {
    it('throws a error', () => {
      const offer = new Offer()
      offer.seats = 0

      expect(offer.decrement).toThrowError()
    })
  })
})

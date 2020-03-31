import { Offer } from '@/database/models'

test('Offer model', () => {
  const offer = new Offer()
  offer.seats = 10

  expect(offer.decrement()).toBe(9)

  offer.seats = 0

  expect(offer.decrement).toThrowError()
})

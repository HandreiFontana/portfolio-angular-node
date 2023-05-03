import { faker } from '@faker-js/faker'

export function generateNewPlaceData(overide = {}) {
  return {
    placeName: faker.datatype.string(100),
    customerId: null,
    stateId: null,
    cityId: null,
    size: faker.datatype.string(100),
    address: faker.datatype.string(4096),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePlaceData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    placeName: faker.datatype.string(100),
    customerId: null,
    stateId: null,
    cityId: null,
    size: faker.datatype.string(100),
    address: faker.datatype.string(4096),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePlacesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generatePlaceData(overide)
    }
  )
}

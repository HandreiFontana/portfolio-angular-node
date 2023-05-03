import { faker } from '@faker-js/faker'

export function generateNewCityData(overide = {}) {
  return {
    stateId: null,
    cityName: faker.datatype.string(60),
    ibgeCode: faker.datatype.string(60),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateCityData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    stateId: null,
    cityName: faker.datatype.string(60),
    ibgeCode: faker.datatype.string(60),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateCitiesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateCityData(overide)
    }
  )
}

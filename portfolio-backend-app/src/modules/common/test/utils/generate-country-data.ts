import { faker } from '@faker-js/faker'

export function generateNewCountryData(overide = {}) {
  return {
    countryName: faker.datatype.string(60),
    countryCode: faker.datatype.string(60),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateCountryData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    countryName: faker.datatype.string(60),
    countryCode: faker.datatype.string(60),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateCountriesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateCountryData(overide)
    }
  )
}

import { faker } from '@faker-js/faker'

export function generateNewStateData(overide = {}) {
  return {
    federativeUnit: faker.datatype.string(2),
    stateName: faker.datatype.string(60),
    ibgeCode: faker.datatype.string(60),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateStateData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    federativeUnit: faker.datatype.string(2),
    stateName: faker.datatype.string(60),
    ibgeCode: faker.datatype.string(60),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateStatesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateStateData(overide)
    }
  )
}

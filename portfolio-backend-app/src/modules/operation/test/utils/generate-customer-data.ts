import { faker } from '@faker-js/faker'

export function generateNewCustomerData(overide = {}) {
  return {
    customerName: faker.datatype.string(100),
    email: faker.datatype.string(100),
    phone: faker.datatype.string(20),
    countryId: null,
    stateId: null,
    cityId: null,
    address: faker.datatype.string(4096),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateCustomerData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    customerName: faker.datatype.string(100),
    email: faker.datatype.string(100),
    phone: faker.datatype.string(20),
    countryId: null,
    stateId: null,
    cityId: null,
    address: faker.datatype.string(4096),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateCustomersData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateCustomerData(overide)
    }
  )
}

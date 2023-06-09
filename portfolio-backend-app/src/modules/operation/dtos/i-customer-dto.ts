interface ICustomerDTO {
  id?: string
  customerName?: string
  email?: string
  phone?: string
  countryId?: string
  stateId?: string
  cityId?: string
  address?: JSON
  createdAt?: Date
  updatedAt?: Date
}

export { ICustomerDTO }

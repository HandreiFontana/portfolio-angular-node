interface IPlaceDTO {
  id?: string
  placeName?: string
  customerId?: string
  stateId?: string
  cityId?: string
  size?: string
  address?: JSON
  createdAt?: Date
  updatedAt?: Date
}

export { IPlaceDTO }

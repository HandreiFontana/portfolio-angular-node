import { inject, injectable } from 'tsyringe'
import { Place } from '@modules/operation/infra/typeorm/entities/place'
import { IPlaceRepository } from '@modules/operation/repositories/i-place-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  placeName: string
  customerId: string
  stateId: string
  cityId: string
  size: string
  address: string
}

@injectable()
class CreatePlaceUseCase {
  constructor(
    @inject('PlaceRepository')
    private placeRepository: IPlaceRepository
  ) {}

  async execute({
    placeName,
    customerId,
    stateId,
    cityId,
    size,
    address
  }: IRequest): Promise<Place> {
    const result = await this.placeRepository.create({
        placeName,
        customerId,
        stateId,
        cityId,
        size,
        address
      })
      .then(placeResult => {
        return placeResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreatePlaceUseCase }

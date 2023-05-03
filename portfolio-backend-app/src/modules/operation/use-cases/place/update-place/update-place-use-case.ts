import { inject, injectable } from 'tsyringe'
import { Place } from '@modules/operation/infra/typeorm/entities/place'
import { IPlaceRepository } from '@modules/operation/repositories/i-place-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  placeName: string
  customerId: string
  stateId: string
  cityId: string
  size: string
  address: string
}

@injectable()
class UpdatePlaceUseCase {
  constructor(
    @inject('PlaceRepository')
    private placeRepository: IPlaceRepository
  ) {}

  async execute({
    id,
    placeName,
    customerId,
    stateId,
    cityId,
    size,
    address
  }: IRequest): Promise<HttpResponse> {
    const place = await this.placeRepository.update({
      id,
      placeName,
      customerId,
      stateId,
      cityId,
      size,
      address
    })

    return place
  }
}

export { UpdatePlaceUseCase }

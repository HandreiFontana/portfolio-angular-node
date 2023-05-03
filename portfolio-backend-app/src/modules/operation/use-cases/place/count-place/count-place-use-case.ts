import { inject, injectable } from 'tsyringe'
import { Place } from '@modules/operation/infra/typeorm/entities/place'
import { IPlaceRepository } from '@modules/operation/repositories/i-place-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountPlaceUseCase {
  constructor(
    @inject('PlaceRepository')
    private placeRepository: IPlaceRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const placesCount = await this.placeRepository.count(
      search
    )

    return placesCount
  }
}

export { CountPlaceUseCase }

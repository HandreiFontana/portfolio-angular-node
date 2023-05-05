import { inject, injectable } from 'tsyringe'
import { Place } from '@modules/operation/infra/typeorm/entities/place'
import { IPlaceRepository } from '@modules/operation/repositories/i-place-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountPlaceUseCase {
  constructor(
    @inject('PlaceRepository')
    private placeRepository: IPlaceRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const placesCount = await this.placeRepository.count(
      search,
      filter
    )

    return placesCount
  }
}

export { CountPlaceUseCase }

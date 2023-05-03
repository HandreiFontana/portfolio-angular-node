import { inject, injectable } from 'tsyringe'
import { Place } from '@modules/operation/infra/typeorm/entities/place'
import { IPlaceRepository } from '@modules/operation/repositories/i-place-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetPlaceUseCase {
  constructor(
    @inject('PlaceRepository')
    private placeRepository: IPlaceRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const place = await this.placeRepository.get(id)

    return place
  }
}

export { GetPlaceUseCase }

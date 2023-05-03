import { inject, injectable } from "tsyringe"
import { IPlaceRepository } from '@modules/operation/repositories/i-place-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectPlaceUseCase {
  constructor(
    @inject('PlaceRepository')
    private placeRepository: IPlaceRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const place = await this.placeRepository.idSelect(id)

    return place
  }
}

export { IdSelectPlaceUseCase }

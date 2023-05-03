import { inject, injectable } from 'tsyringe'
import { IPlaceRepository } from '@modules/operation/repositories/i-place-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeletePlaceUseCase {
  constructor(
    @inject('PlaceRepository')
    private placeRepository: IPlaceRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const place = await this.placeRepository.multiDelete(ids)

    return place
  }
}

export { MultiDeletePlaceUseCase }

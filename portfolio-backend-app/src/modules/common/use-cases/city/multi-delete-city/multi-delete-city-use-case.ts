import { inject, injectable } from 'tsyringe'
import { ICityRepository } from '@modules/common/repositories/i-city-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteCityUseCase {
  constructor(
    @inject('CityRepository')
    private cityRepository: ICityRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const city = await this.cityRepository.multiDelete(ids)

    return city
  }
}

export { MultiDeleteCityUseCase }

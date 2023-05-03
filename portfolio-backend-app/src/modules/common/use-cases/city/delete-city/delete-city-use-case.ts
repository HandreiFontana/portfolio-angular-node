import { inject, injectable } from 'tsyringe'
import { City } from '@modules/common/infra/typeorm/entities/city'
import { ICityRepository } from '@modules/common/repositories/i-city-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteCityUseCase {
  constructor(
    @inject('CityRepository')
    private cityRepository: ICityRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const city = await this.cityRepository.delete(id)

    return city
  }
}

export { DeleteCityUseCase }

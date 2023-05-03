import { inject, injectable } from "tsyringe"
import { ICityRepository } from '@modules/common/repositories/i-city-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectCityUseCase {
  constructor(
    @inject('CityRepository')
    private cityRepository: ICityRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const city = await this.cityRepository.idSelect(id)

    return city
  }
}

export { IdSelectCityUseCase }

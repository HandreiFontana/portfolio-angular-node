import { inject, injectable } from 'tsyringe'
import { City } from '@modules/common/infra/typeorm/entities/city'
import { ICityRepository } from '@modules/common/repositories/i-city-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountCityUseCase {
  constructor(
    @inject('CityRepository')
    private cityRepository: ICityRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const citiesCount = await this.cityRepository.count(
      search,
      filter
    )

    return citiesCount
  }
}

export { CountCityUseCase }

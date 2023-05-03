import { inject, injectable } from 'tsyringe'
import { ICityRepository } from '@modules/common/repositories/i-city-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectCityUseCase {
  constructor(
    @inject('CityRepository')
    private cityRepository: ICityRepository
  ) {}

  async execute({
    filter,
    stateId
  }): Promise<ResponseProps> {
    const cities = await this.cityRepository.select(filter, stateId)

    const newCities = {
      items: cities.data,
      hasNext: false
    }

    return newCities
  }
}

export { SelectCityUseCase }

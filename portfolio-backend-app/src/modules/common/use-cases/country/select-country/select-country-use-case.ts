import { inject, injectable } from 'tsyringe'
import { ICountryRepository } from '@modules/common/repositories/i-country-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectCountryUseCase {
  constructor(
    @inject('CountryRepository')
    private countryRepository: ICountryRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const countries = await this.countryRepository.select(filter)

    const newCountries = {
      items: countries.data,
      hasNext: false
    }

    return newCountries
  }
}

export { SelectCountryUseCase }

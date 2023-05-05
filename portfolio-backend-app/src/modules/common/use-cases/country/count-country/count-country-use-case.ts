import { inject, injectable } from 'tsyringe'
import { Country } from '@modules/common/infra/typeorm/entities/country'
import { ICountryRepository } from '@modules/common/repositories/i-country-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountCountryUseCase {
  constructor(
    @inject('CountryRepository')
    private countryRepository: ICountryRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const countriesCount = await this.countryRepository.count(
      search,
      filter
    )

    return countriesCount
  }
}

export { CountCountryUseCase }

import { inject, injectable } from 'tsyringe'
import { Country } from '@modules/common/infra/typeorm/entities/country'
import { ICountryRepository } from '@modules/common/repositories/i-country-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountCountryUseCase {
  constructor(
    @inject('CountryRepository')
    private countryRepository: ICountryRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const countriesCount = await this.countryRepository.count(
      search
    )

    return countriesCount
  }
}

export { CountCountryUseCase }

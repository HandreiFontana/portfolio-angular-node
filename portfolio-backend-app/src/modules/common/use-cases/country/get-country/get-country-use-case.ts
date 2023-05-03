import { inject, injectable } from 'tsyringe'
import { Country } from '@modules/common/infra/typeorm/entities/country'
import { ICountryRepository } from '@modules/common/repositories/i-country-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetCountryUseCase {
  constructor(
    @inject('CountryRepository')
    private countryRepository: ICountryRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const country = await this.countryRepository.get(id)

    return country
  }
}

export { GetCountryUseCase }

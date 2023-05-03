import { inject, injectable } from 'tsyringe'
import { Country } from '@modules/common/infra/typeorm/entities/country'
import { ICountryRepository } from '@modules/common/repositories/i-country-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteCountryUseCase {
  constructor(
    @inject('CountryRepository')
    private countryRepository: ICountryRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const country = await this.countryRepository.delete(id)

    return country
  }
}

export { DeleteCountryUseCase }

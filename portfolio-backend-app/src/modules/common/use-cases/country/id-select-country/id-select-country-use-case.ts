import { inject, injectable } from "tsyringe"
import { ICountryRepository } from '@modules/common/repositories/i-country-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectCountryUseCase {
  constructor(
    @inject('CountryRepository')
    private countryRepository: ICountryRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const country = await this.countryRepository.idSelect(id)

    return country
  }
}

export { IdSelectCountryUseCase }

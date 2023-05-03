import { inject, injectable } from 'tsyringe'
import { ICountryRepository } from '@modules/common/repositories/i-country-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteCountryUseCase {
  constructor(
    @inject('CountryRepository')
    private countryRepository: ICountryRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const country = await this.countryRepository.multiDelete(ids)

    return country
  }
}

export { MultiDeleteCountryUseCase }

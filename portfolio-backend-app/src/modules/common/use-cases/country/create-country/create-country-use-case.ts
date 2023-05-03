import { inject, injectable } from 'tsyringe'
import { Country } from '@modules/common/infra/typeorm/entities/country'
import { ICountryRepository } from '@modules/common/repositories/i-country-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  countryName: string
  countryCode: string
}

@injectable()
class CreateCountryUseCase {
  constructor(
    @inject('CountryRepository')
    private countryRepository: ICountryRepository
  ) {}

  async execute({
    countryName,
    countryCode
  }: IRequest): Promise<Country> {
    const result = await this.countryRepository.create({
        countryName,
        countryCode
      })
      .then(countryResult => {
        return countryResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateCountryUseCase }

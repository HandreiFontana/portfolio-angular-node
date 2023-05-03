import { inject, injectable } from 'tsyringe'
import { Country } from '@modules/common/infra/typeorm/entities/country'
import { ICountryRepository } from '@modules/common/repositories/i-country-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  countryName: string
  countryCode: string
}

@injectable()
class UpdateCountryUseCase {
  constructor(
    @inject('CountryRepository')
    private countryRepository: ICountryRepository
  ) {}

  async execute({
    id,
    countryName,
    countryCode
  }: IRequest): Promise<HttpResponse> {
    const country = await this.countryRepository.update({
      id,
      countryName,
      countryCode
    })

    return country
  }
}

export { UpdateCountryUseCase }

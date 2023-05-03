import { inject, injectable } from 'tsyringe'
import { ICountryRepository } from '@modules/common/repositories/i-country-repository'
import { ICountryDTO } from '@modules/common/dtos/i-country-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: ICountryDTO[],
  hasNext: boolean
}

@injectable()
class ListCountryUseCase {
  constructor(
    @inject('CountryRepository')
    private countryRepository: ICountryRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const countries = await this.countryRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countCountries = await this.countryRepository.count(
      search
    )

    const numeroCountry = page * rowsPerPage

    const countriesResponse = {
      items: countries.data,
      hasNext: numeroCountry < countCountries.data.count
    }

    return countriesResponse
  }
}

export { ListCountryUseCase }

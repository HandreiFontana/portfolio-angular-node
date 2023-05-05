import { inject, injectable } from 'tsyringe'
import { ICityRepository } from '@modules/common/repositories/i-city-repository'
import { ICityDTO } from '@modules/common/dtos/i-city-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: ICityDTO[],
  hasNext: boolean
}

@injectable()
class ListCityUseCase {
  constructor(
    @inject('CityRepository')
    private cityRepository: ICityRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const cities = await this.cityRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countCities = await this.cityRepository.count(
      search,
      filter
    )

    const numeroCity = page * rowsPerPage

    const citiesResponse = {
      items: cities.data,
      hasNext: numeroCity < countCities.data.count
    }

    return citiesResponse
  }
}

export { ListCityUseCase }

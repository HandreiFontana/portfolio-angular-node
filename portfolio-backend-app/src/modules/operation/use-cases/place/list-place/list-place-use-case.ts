import { inject, injectable } from 'tsyringe'
import { IPlaceRepository } from '@modules/operation/repositories/i-place-repository'
import { IPlaceDTO } from '@modules/operation/dtos/i-place-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string
}

interface ResponseProps {
  items: IPlaceDTO[],
  hasNext: boolean
}

@injectable()
class ListPlaceUseCase {
  constructor(
    @inject('PlaceRepository')
    private placeRepository: IPlaceRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = ''
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const places = await this.placeRepository.list(
      search,
      newPage,
      rowsPerPage,
      order
    )

    const countPlaces = await this.placeRepository.count(
      search
    )

    const numeroPlace = page * rowsPerPage

    const placesResponse = {
      items: places.data,
      hasNext: numeroPlace < countPlaces.data.count
    }

    return placesResponse
  }
}

export { ListPlaceUseCase }

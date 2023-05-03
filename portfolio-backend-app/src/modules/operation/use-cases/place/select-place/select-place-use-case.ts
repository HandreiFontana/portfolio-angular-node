import { inject, injectable } from 'tsyringe'
import { IPlaceRepository } from '@modules/operation/repositories/i-place-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectPlaceUseCase {
  constructor(
    @inject('PlaceRepository')
    private placeRepository: IPlaceRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const places = await this.placeRepository.select(filter)

    const newPlaces = {
      items: places.data,
      hasNext: false
    }

    return newPlaces
  }
}

export { SelectPlaceUseCase }

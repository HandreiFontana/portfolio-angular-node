import { inject, injectable } from 'tsyringe'
import { City } from '@modules/common/infra/typeorm/entities/city'
import { ICityRepository } from '@modules/common/repositories/i-city-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  stateId: string
  cityName: string
  ibgeCode: string
}

@injectable()
class UpdateCityUseCase {
  constructor(
    @inject('CityRepository')
    private cityRepository: ICityRepository
  ) {}

  async execute({
    id,
    stateId,
    cityName,
    ibgeCode
  }: IRequest): Promise<HttpResponse> {
    const city = await this.cityRepository.update({
      id,
      stateId,
      cityName,
      ibgeCode
    })

    return city
  }
}

export { UpdateCityUseCase }

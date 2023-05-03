import { IStateDTO } from '@modules/common/dtos/i-state-dto'
import { IStateRepository } from '@modules/common/repositories/i-state-repository'
import { State } from '@modules/common/infra/typeorm/entities/state'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class StateRepositoryInMemory implements IStateRepository {
  states: State[] = []

  // create
  async create ({
    federativeUnit,
    stateName,
    ibgeCode
  }: IStateDTO): Promise<HttpResponse> {
    const state = new State()

    Object.assign(state, {
      federativeUnit,
      stateName,
      ibgeCode
    })

    this.states.push(state)

    return ok(state)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredStates = this.states

    filteredStates = filteredStates.filter((state) => {
      if (state.federativeUnit.includes(search)) return true
      if (state.stateName.includes(search)) return true

      return false
    })

    return ok(filteredStates.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredStates = this.states

    filteredStates = filteredStates.filter((state) => {
      if (state.federativeUnit.includes(filter)) return true
      if (state.stateName.includes(filter)) return true

      return false
    })

    return ok(filteredStates)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (
    search: string,
  ): Promise<HttpResponse> {
    let filteredStates = this.states

    filteredStates = filteredStates.filter((state) => {
      if (state.federativeUnit.includes(search)) return true
      if (state.stateName.includes(search)) return true

      return false
    })

    return ok(filteredStates.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const state = this.states.find((state) => state.id === id)

    if (typeof state === 'undefined') {
      return notFound()
    } else {
      return ok(state)
    }
  }


  // update
  async update ({
    id,
    federativeUnit,
    stateName,
    ibgeCode
  }: IStateDTO): Promise<HttpResponse> {
    const index = this.states.findIndex((state) => state.id === id)

    this.states[index].federativeUnit = federativeUnit
    this.states[index].stateName = stateName
    this.states[index].ibgeCode = ibgeCode

    return ok(this.states[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.states.findIndex((state) => state.id === id)

    this.states.splice(index, 1)

    return ok(this.states)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { StateRepositoryInMemory }

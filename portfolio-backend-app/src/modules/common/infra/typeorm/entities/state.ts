import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'


@Entity('states')
class State {
  @PrimaryColumn()
  id?: string

  @Column({ name: 'federative_unit', nullable: true })
  federativeUnit?: string

  @Column({ name: 'state_name', nullable: true })
  stateName?: string

  @Column({ name: 'ibge_code', nullable: true })
  ibgeCode?: string

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { State }

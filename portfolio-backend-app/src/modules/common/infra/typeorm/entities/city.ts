import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { State } from '@modules/common/infra/typeorm/entities/state'

@Entity('cities')
class City {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => State, { nullable: true, eager: true })
  @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
  stateId?: string

  @Column({ name: 'city_name', nullable: true })
  cityName?: string

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

export { City }

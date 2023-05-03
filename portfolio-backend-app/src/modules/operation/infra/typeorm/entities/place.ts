import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Customer } from '@modules/operation/infra/typeorm/entities/customer'
import { State } from '@modules/common/infra/typeorm/entities/state'
import { City } from '@modules/common/infra/typeorm/entities/city'

@Entity('places')
class Place {
  @PrimaryColumn()
  id?: string

  @Column({ name: 'place_name', nullable: true })
  placeName?: string

  @ManyToOne(() => Customer, { nullable: true, eager: true })
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customerId?: string

  @ManyToOne(() => State, { nullable: true, eager: true })
  @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
  stateId?: string

  @ManyToOne(() => City, { nullable: true, eager: true })
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
  cityId?: string

  @Column({ name: 'size', nullable: true })
  size?: string

  @Column({ name: 'address', nullable: true })
  address?: string

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

export { Place }

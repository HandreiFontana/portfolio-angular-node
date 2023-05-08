import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Country } from '@modules/common/infra/typeorm/entities/country'
import { State } from '@modules/common/infra/typeorm/entities/state'
import { City } from '@modules/common/infra/typeorm/entities/city'

@Entity('customers')
class Customer {
  @PrimaryColumn()
  id?: string

  @Column({ name: 'customer_name', nullable: true })
  customerName?: string

  @Column({ name: 'email', nullable: true })
  email?: string

  @Column({ name: 'phone', nullable: true })
  phone?: string

  @ManyToOne(() => Country, { nullable: true, eager: true })
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id' })
  countryId?: string

  @ManyToOne(() => State, { nullable: true, eager: true })
  @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
  stateId?: string

  @ManyToOne(() => City, { nullable: true, eager: true })
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
  cityId?: string

  @Column({ name: 'address', nullable: true, type: 'json' })
  address?: JSON

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

export { Customer }

import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'


@Entity('countries')
class Country {
  @PrimaryColumn()
  id?: string

  @Column({ name: 'country_name', nullable: true })
  countryName?: string

  @Column({ name: 'country_code', nullable: true })
  countryCode?: string

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

export { Country }

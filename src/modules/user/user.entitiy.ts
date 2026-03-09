import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true, nullable: false, type: 'varchar' })
  email: string

  @Column({ nullable: false, type: 'varchar' })
  password: string

  @Column({ unique: true, nullable: false, type: 'varchar' })
  nickname: string

  @Column({ nullable: true, type: 'varchar' })
  refreshToken?: string | null

  @Column({ nullable: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}

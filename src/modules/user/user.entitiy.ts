import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Feedback } from '../feedback/feedback.entity'

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

  @OneToMany(() => Feedback, (feedback) => feedback.sender)
  sentFeedbacks: Feedback[]

  @OneToMany(() => Feedback, (feedback) => feedback.receiver)
  receivedFeedbacks: Feedback[]

  @Column({ nullable: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}

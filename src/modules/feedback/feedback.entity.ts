import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../user/user.entitiy'

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar' })
  title: string

  @Column({ type: 'text' })
  content: string

  @ManyToOne(() => User, (user) => user.sentFeedbacks)
  sender: User

  @ManyToOne(() => User, (user) => user.receivedFeedbacks)
  receiver: User

  @Column({ type: 'boolean', default: true, name: 'is_public' })
  isPublic: boolean

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}

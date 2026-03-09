import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateFeedbackDto } from './dto/create-feedback.dto'
import { Feedback } from './feedback.entity'

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
  ) {}

  async leaveFeedback(senderId: string, createFeedbackDto: CreateFeedbackDto) {
    const { title, content, receiverId, isPublic } = createFeedbackDto

    if (senderId === receiverId) {
      throw new BadRequestException('본인에게는 피드백을 남길 수 없습니다.')
    }

    const newFeedback = this.feedbackRepository.create({
      title,
      content,
      isPublic,
      sender: { id: senderId },
      receiver: { id: receiverId },
    })

    return await this.feedbackRepository.save(newFeedback)
  }

  async getFeedbackList(targetUserId: string, viewerId?: string) {
    const queryBuilder = this.feedbackRepository
      .createQueryBuilder('feedback')
      .leftJoinAndSelect('feedback.sender', 'sender')
      .where('feedback.receiverId = :targetUserId', { targetUserId })

    const isOwner = viewerId === targetUserId

    if (!isOwner) {
      queryBuilder.andWhere('feedback.isPublic = :isPublic', { isPublic: true })
    }

    queryBuilder.orderBy('feedback.createdAt', 'DESC')

    const feedbackList = await queryBuilder.getMany()
    return feedbackList
  }
}

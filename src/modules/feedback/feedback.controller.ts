import { AccessTokenGuard } from '@/guards/access-token.guard'
import { JwtPayload } from '@/types/jwt-payload.type'
import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, Req, UseGuards } from '@nestjs/common'
import { CreateFeedbackDto } from './dto/create-feedback.dto'
import { FeedbackService } from './feedback.service'

@Controller('feedbacks')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @UseGuards(AccessTokenGuard)
  @Post('')
  async createFeedback(@Req() req: Request & { user: JwtPayload }, @Body() createFeedbackDto: CreateFeedbackDto) {
    const senderId = req.user.id
    return this.feedbackService.leaveFeedback(senderId, createFeedbackDto)
  }

  @UseGuards(AccessTokenGuard)
  @Get('profile/:targetUserId')
  async getProfileFeedbacks(
    @Param('targetUserId', ParseUUIDPipe) targetUserId: string,
    @Query('viewerId', ParseUUIDPipe) viewerId?: string,
  ) {
    return this.feedbackService.getFeedbackList(targetUserId, viewerId)
  }
}

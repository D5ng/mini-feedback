import { AccessTokenGuard } from '@/guards/access-token.guard'
import { JwtPayload } from '@/types/jwt-payload.type'
import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { CreateFeedbackDto } from './dto/create-feedback.dto'
import { FeedbackService } from './feedback.service'

@ApiTags('피드백')
@Controller('users/:userId/feedbacks')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @UseGuards(AccessTokenGuard)
  @Post('')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '피드백 작성',
    description: '특정 유저에게 피드백을 남깁니다.',
  })
  @ApiCreatedResponse({
    description: '피드백이 정상적으로 생성되었습니다.',
  })
  @ApiParam({
    name: 'userId',
    description: '피드백을 받을 유저의 ID입니다.',
  })
  async createFeedback(
    @Req() req: Request & { user: JwtPayload },
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() createFeedbackDto: CreateFeedbackDto,
  ) {
    const senderId = req.user.id
    return this.feedbackService.leaveFeedback(senderId, userId, createFeedbackDto)
  }

  @UseGuards(AccessTokenGuard)
  @Get('')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '유저 피드백 조회',
    description: '특정 유저에 대한 피드백 목록을 조회합니다.',
  })
  @ApiParam({
    name: 'userId',
    description: '피드백을 조회할 유저의 ID입니다.',
  })
  @ApiQuery({
    name: 'viewerId',
    required: false,
    description: '피드백을 조회하는 유저의 ID입니다(공개 범위 계산에 사용).',
  })
  @ApiOkResponse({
    description: '피드백 목록이 정상적으로 반환되었습니다.',
  })
  async getProfileFeedbacks(@Param('userId', ParseUUIDPipe) userId: string, @Query('viewerId', ParseUUIDPipe) viewerId?: string) {
    return this.feedbackService.getFeedbackList(userId, viewerId)
  }
}

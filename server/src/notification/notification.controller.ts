import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { RequestNotificationDto } from './dto/notification.dto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiInternalServerErrorResponse({
  description: 'Internal server error occurred while sending notification',
})
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiOperation({
    summary: 'Request a notification service',
    description: 'Send a notification request for a specific service',
  })
  @ApiOkResponse({
    description: 'Notification request sent successfully',
    type: Object,
    example: {
      message: 'Notification request sent successfully',
      status: 200,
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid request data',
  })
  @Post('request-service')
  @HttpCode(HttpStatus.OK)
  requestService(@Body() requestNotificationDto: RequestNotificationDto) {
    return this.notificationService.requestService(requestNotificationDto);
  }
}

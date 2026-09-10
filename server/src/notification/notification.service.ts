import { Injectable } from '@nestjs/common';
import { RequestNotificationDto } from './dto/notification.dto';
import { Mail } from './../utils/mail';

@Injectable()
export class NotificationService {
  async requestService(requestNotificationDto: RequestNotificationDto) {
    const { name, email, service, domain, provider, description, priority } =
      requestNotificationDto;

    const response = await new Mail().sendMail(
      email,
      service,
      description,
      name,
      domain,
      provider,
      priority,
    );

    return response;
  }
}

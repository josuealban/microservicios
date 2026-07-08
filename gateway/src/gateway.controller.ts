import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  USER_PATTERNS,
  MATCH_PATTERNS,
  MESSAGE_PATTERNS,
  SUBSCRIPTION_PLAN_PATTERNS,
} from './common/patterns';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { Roles } from './auth/roles.decorator';
import { Role } from './auth/role.enum';
import { Public } from './auth/public.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class GatewayController {
  constructor(
    @Inject('USUARIOS_SERVICE')
    private readonly usuariosClient: ClientProxy,

    @Inject('MATCHES_SERVICE')
    private readonly matchesClient: ClientProxy,

    @Inject('MENSAJERIA_SERVICE')
    private readonly mensajeriaClient: ClientProxy,
  ) {}

  // ─── AUTH ────────────────────────────────────────────────────────────────────

  @Public()
  @Post('auth/login')
  login(@Body() body: unknown) {
    return firstValueFrom(this.usuariosClient.send(USER_PATTERNS.LOGIN, body));
  }

  // ─── USUARIOS ────────────────────────────────────────────────────────────────

  @Public()
  @Post('users')
  createUser(@Body() body: unknown) {
    return firstValueFrom(this.usuariosClient.send(USER_PATTERNS.REGISTER, body));
  }

  @Get('users')
  findAllUsers() {
    return firstValueFrom(this.usuariosClient.send(USER_PATTERNS.FIND_ALL, {}));
  }

  @Get('users/:id')
  findUser(@Param('id') id: string) {
    return firstValueFrom(this.usuariosClient.send(USER_PATTERNS.FIND_ONE, Number(id)));
  }

  @Patch('users/:id')
  updateUser(@Param('id') id: string, @Body() body: unknown) {
    return firstValueFrom(
      this.usuariosClient.send(USER_PATTERNS.UPDATE, { id: Number(id), body }),
    );
  }

  @Put('users/:id')
  replaceUser(@Param('id') id: string, @Body() body: unknown) {
    return firstValueFrom(
      this.usuariosClient.send(USER_PATTERNS.REPLACE, { id: Number(id), body }),
    );
  }

  @Roles(Role.ADMIN)
  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return firstValueFrom(this.usuariosClient.send(USER_PATTERNS.DELETE, Number(id)));
  }

  // ─── PHOTOS ──────────────────────────────────────────────────────────────────

  @Post('photos')
  createPhoto(@Body() body: unknown) {
    return firstValueFrom(this.usuariosClient.send(USER_PATTERNS.CREATE_PHOTO, body));
  }

  @Get('photos/user/:userId')
  findPhotosByUser(@Param('userId') userId: string) {
    return firstValueFrom(
      this.usuariosClient.send(USER_PATTERNS.FIND_PHOTOS_BY_USER, Number(userId)),
    );
  }

  @Put('photos/:id')
  replacePhoto(@Param('id') id: string, @Body() body: unknown) {
    return firstValueFrom(
      this.usuariosClient.send(USER_PATTERNS.REPLACE_PHOTO, { id: Number(id), body }),
    );
  }

  @Roles(Role.ADMIN)
  @Delete('photos/:id')
  deletePhoto(@Param('id') id: string) {
    return firstValueFrom(this.usuariosClient.send(USER_PATTERNS.DELETE_PHOTO, Number(id)));
  }

  // ─── SUBSCRIPTIONS (usuario) ─────────────────────────────────────────────────

  @Post('subscriptions')
  createSubscription(@Body() body: unknown) {
    return firstValueFrom(this.usuariosClient.send(USER_PATTERNS.CREATE_SUBSCRIPTION, body));
  }

  @Get('subscriptions/user/:userId')
  findSubscriptionByUser(@Param('userId') userId: string) {
    return firstValueFrom(
      this.usuariosClient.send(USER_PATTERNS.FIND_SUBSCRIPTION_BY_USER, {
        userId: Number(userId),
      }),
    );
  }

  // ─── INTERACTIONS / MATCHES ───────────────────────────────────────────────────

  @Post('interactions')
  createInteraction(@Body() body: unknown) {
    return firstValueFrom(this.matchesClient.send(MATCH_PATTERNS.CREATE_INTERACTION, body));
  }

  @Get('interactions/user/:userId')
  findInteractionsByUser(@Param('userId') userId: string) {
    return firstValueFrom(
      this.matchesClient.send(MATCH_PATTERNS.FIND_INTERACTIONS_BY_USER, Number(userId)),
    );
  }

  @Put('interactions/:id')
  replaceInteraction(@Param('id') id: string, @Body() body: unknown) {
    return firstValueFrom(
      this.matchesClient.send(MATCH_PATTERNS.REPLACE_INTERACTION, { id: Number(id), body }),
    );
  }

  @Get('matches/user/:userId')
  findMatchesByUser(@Param('userId') userId: string) {
    return firstValueFrom(
      this.matchesClient.send(MATCH_PATTERNS.FIND_MATCHES_BY_USER, Number(userId)),
    );
  }

  @Get('matches/:id')
  findMatchById(@Param('id') id: string) {
    return firstValueFrom(this.matchesClient.send(MATCH_PATTERNS.FIND_MATCH_BY_ID, Number(id)));
  }

  @Put('matches/:id')
  replaceMatch(@Param('id') id: string, @Body() body: unknown) {
    return firstValueFrom(
      this.matchesClient.send(MATCH_PATTERNS.REPLACE_MATCH, { id: Number(id), body }),
    );
  }

  // ─── MENSAJERÍA ───────────────────────────────────────────────────────────────

  @Post('chats')
  createChat(@Body() body: unknown) {
    return firstValueFrom(this.mensajeriaClient.send(MESSAGE_PATTERNS.CREATE_CHAT, body));
  }

  @Get('chats/:id')
  findChatById(@Param('id') id: string) {
    return firstValueFrom(
      this.mensajeriaClient.send(MESSAGE_PATTERNS.FIND_CHAT_BY_ID, Number(id)),
    );
  }

  @Put('chats/:id')
  replaceChat(@Param('id') id: string, @Body() body: unknown) {
    return firstValueFrom(
      this.mensajeriaClient.send(MESSAGE_PATTERNS.REPLACE_CHAT, { id: Number(id), body }),
    );
  }

  @Post('messages')
  sendMessage(@Body() body: unknown) {
    return firstValueFrom(this.mensajeriaClient.send(MESSAGE_PATTERNS.SEND_MESSAGE, body));
  }

  @Get('messages/chat/:chatId')
  getMessagesByChat(@Param('chatId') chatId: string) {
    return firstValueFrom(
      this.mensajeriaClient.send(MESSAGE_PATTERNS.GET_MESSAGES_BY_CHAT, Number(chatId)),
    );
  }

  @Put('messages/:id')
  replaceMessage(@Param('id') id: string, @Body() body: unknown) {
    return firstValueFrom(
      this.mensajeriaClient.send(MESSAGE_PATTERNS.REPLACE_MESSAGE, { id: Number(id), body }),
    );
  }

  @Roles(Role.ADMIN)
  @Delete('messages/:id')
  deleteMessage(@Param('id') id: string) {
    return firstValueFrom(
      this.mensajeriaClient.send(MESSAGE_PATTERNS.DELETE_MESSAGE, Number(id)),
    );
  }

  // ─── SUBSCRIPTION PLANS (catálogo) ───────────────────────────────────────────

  @Public()
  @Get('subscription-plans')
  findAllSubscriptionPlans() {
    return firstValueFrom(
      this.mensajeriaClient.send(SUBSCRIPTION_PLAN_PATTERNS.FIND_ALL, {}),
    );
  }

  @Public()
  @Get('subscription-plans/:tier')
  findOneSubscriptionPlan(@Param('tier') tier: string) {
    return firstValueFrom(
      this.mensajeriaClient.send(SUBSCRIPTION_PLAN_PATTERNS.FIND_ONE, tier),
    );
  }

  @Roles(Role.ADMIN)
  @Post('subscription-plans')
  createSubscriptionPlan(@Body() body: unknown) {
    return firstValueFrom(
      this.mensajeriaClient.send(SUBSCRIPTION_PLAN_PATTERNS.CREATE, body),
    );
  }

  @Roles(Role.ADMIN)
  @Put('subscription-plans/:tier')
  updateSubscriptionPlan(@Param('tier') tier: string, @Body() dto: unknown) {
    return firstValueFrom(
      this.mensajeriaClient.send(SUBSCRIPTION_PLAN_PATTERNS.UPDATE, { tier, dto }),
    );
  }

  @Roles(Role.ADMIN)
  @Delete('subscription-plans/:tier')
  deleteSubscriptionPlan(@Param('tier') tier: string) {
    return firstValueFrom(
      this.mensajeriaClient.send(SUBSCRIPTION_PLAN_PATTERNS.DELETE, tier),
    );
  }
}

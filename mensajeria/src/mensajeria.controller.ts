import { Controller } from '@nestjs/common';

// Microservicio TCP — no expone rutas HTTP.
// Las rutas HTTP las maneja exclusivamente apps/gateway.
@Controller()
export class MensajeriaController {}


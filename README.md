# Separación de Servicios

Este repositorio contiene la arquitectura de microservicios separada para la aplicación.

## Características y Arquitectura
- **Proyectos Independientes**: Cada carpeta es un proyecto NestJS independiente con su propio `package.json`, `.env` y configuración.
- **Configuración Global**: Se utiliza `@nestjs/config` (`ConfigModule.forRoot`) de forma global en todos los proyectos.
- **Validación Global**: Se utiliza `ValidationPipe` de forma global en todos los proyectos.
- **Microservicios Aislados**: Cada microservicio tiene su propia base de datos, su propio cliente Prisma y gestiona sus datos de forma aislada (sin relaciones cruzadas).
- **Gateway sin BD**: El `gateway` actúa únicamente como enrutador HTTP a TCP y **NO usa Prisma** ni tiene base de datos.

## Servicios
1. **Gateway** (Puerto 3000): API HTTP pública que enruta peticiones hacia los microservicios usando TCP. No usa Prisma.
2. **Usuarios** (Puerto 3001): Microservicio TCP para usuarios y perfiles. Usa Prisma con la base de datos `usuarios_db`.
3. **Matches** (Puerto 3002): Microservicio TCP para interacciones y matches. Usa Prisma con la base de datos `matches_db`.
4. **Mensajeria** (Puerto 3003): Microservicio TCP para chats, mensajes y planes. Usa Prisma con la base de datos `mensajeria_db`.

## Instalación
Cada microservicio funciona independientemente. Para instalarlos:
cd gateway && npm install
cd usuarios && npm install
cd matches && npm install
cd mensajeria && npm install

## Prisma
Para generar Prisma en cada microservicio:
cd usuarios && npx prisma generate
cd matches && npx prisma generate
cd mensajeria && npx prisma generate

## Ejecución
cd gateway && npm run start:dev
cd usuarios && npm run start:dev
cd matches && npm run start:dev
cd mensajeria && npm run start:dev

## Postman
Todas las pruebas de Postman deben realizarse atacando únicamente a http://localhost:3000 (Gateway). El Gateway delegará internamente a los microservicios TCP.

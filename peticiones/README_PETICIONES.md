# 🚀 Guía de Pruebas de la API (Postman)

Este directorio contiene las colecciones de Postman del proyecto **Tinder-App** (Tindel) y las instrucciones necesarias para realizar pruebas sobre el sistema de microservicios.

## 📌 Reglas Importantes para Pruebas

1. **Todas las peticiones deben pasar a través del API Gateway**: 
   * La única URL base que se debe usar es: **`http://localhost:3000`**.
2. **No probar directamente los puertos de los microservicios**:
   * Los puertos **`3001`** (Usuarios), **`3002`** (Matches) y **`3003`** (Mensajería) corresponden a comunicación interna TCP. Estos no reciben peticiones HTTP externas.

## 📥 Importar Colección en Postman

Para comenzar con las pruebas, debes importar la colección oficial ubicada en:
* **`peticiones/tindel_microservicios_gateway.postman_collection.json`**

*(Las colecciones viejas o alternativas han sido organizadas en la carpeta `peticiones/anteriores/` y no deben mezclarse con las pruebas actuales).*

---

## 🚦 Orden Recomendado para Probar Endpoints

Para garantizar el flujo de datos lógico del sistema (creación de usuarios, login, generación de tokens JWT, interacciones y chats/mensajes), se recomienda seguir estrictamente este orden:

### 1. Autenticación y Usuarios
1. **`POST /users`** - Crear usuarios de prueba (ej. Registrar un usuario A y un usuario B).
2. **`POST /auth/login`** - Iniciar sesión con un usuario creado.
3. **Copiar el Token JWT** de la respuesta del login.
4. **Configurar el Bearer Token**: En Postman, establece el token en la pestaña **Authorization** (tipo *Bearer Token*) o a nivel de colección para los endpoints protegidos por RBAC.
5. **`GET /users`** - Listar usuarios (solo accesible si el token corresponde a un usuario con rol `ADMIN`).
6. **`GET /users/:id`** - Obtener detalles de un usuario.
7. **`PATCH /users/:id`** - Actualización parcial de un usuario.
8. **`PUT /users/:id`** - Actualización completa de un usuario.
9. **`DELETE /users/:id`** - Eliminar un usuario (restringido a `ADMIN`).

### 2. Gestión de Fotos
10. **`POST /photos`** - Subir una nueva foto asociada a un usuario.
11. **`GET /photos/user/:userId`** - Consultar fotos por usuario.
12. **`PUT /photos/:id`** - Reemplazar/actualizar detalles de una foto.
13. **`DELETE /photos/:id`** - Eliminar una foto (restringido a `ADMIN`).

### 3. Interacciones y Matches
14. **`POST /interactions`** - Registrar una interacción (LIKE, DISLIKE, SUPERLIKE).
    * *Nota:* Si el usuario A le da LIKE al usuario B, y luego el usuario B le da LIKE al usuario A, se generará un **Match** de forma automática y atómica.
15. **`GET /interactions/user/:userId`** - Consultar interacciones de un usuario.
16. **`PUT /interactions/:id`** - Actualizar interacción.
17. **`GET /matches/user/:userId`** - Obtener los Matches activos de un usuario.
18. **`GET /matches/:id`** - Obtener detalles de un Match.
19. **`PUT /matches/:id`** - Actualizar un Match.

### 4. Chats y Mensajería
20. **`POST /chats`** - Crear un canal de chat (requiere un `matchId` válido).
21. **`GET /chats/:id`** - Obtener un chat por ID.
22. **`POST /messages`** - Enviar un mensaje (valida que pertenezca a un chat existente).
23. **`GET /messages/chat/:chatId`** - Obtener el historial de mensajes de un chat.
24. **`PUT /messages/:id`** - Editar contenido de un mensaje.
25. **`DELETE /messages/:id`** - Borrar un mensaje (restringido a `ADMIN`).

### 5. Suscripciones y Catálogo de Planes
26. **`POST /subscription-plans`** - Crear un plan en el catálogo (ej. GOLD, PREMIUM, BRONZE) (restringido a `ADMIN`).
27. **`GET /subscription-plans`** - Ver planes disponibles.
28. **`GET /subscription-plans/:tier`** - Obtener detalles de un plan por su nivel (tier).
29. **`PUT /subscription-plans/:tier`** - Modificar un plan del catálogo (restringido a `ADMIN`).
30. **`DELETE /subscription-plans/:tier`** - Eliminar un plan del catálogo (restringido a `ADMIN`).
31. **`POST /subscriptions`** - Suscribir a un usuario a un plan.
32. **`GET /subscriptions/user/:userId`** - Obtener la suscripción activa de un usuario.

import { Elysia } from 'elysia';
import { eventRoutes } from './routes/event.routes';
import { EventService } from './services/event.service';

const PORT = process.env.PORT || 3000;

EventService.setupSettings()
  .then(() => console.log('⚙️ Configurações do Meilisearch atualizadas'))
  .catch(console.error);

const app = new Elysia()
  .group('/api/v1', (app) => app.use(eventRoutes))
  .get('/health', (): { status: string; uptime: number } => ({
    status: 'ok',
    uptime: process.uptime(),
  }))
  .listen(PORT);

console.log(`🚀 Servidor rodando em http://${app.server?.hostname}:${app.server?.port}`);
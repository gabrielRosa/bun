import { Elysia, t } from 'elysia';
import { EventService } from '../services/event.service';
import type { IEvent } from '../models/event.model';
import type { SearchResponse } from 'meilisearch';

export const eventRoutes = new Elysia({ prefix: '/events' })
  .get('/', async ({ query }): Promise<SearchResponse<IEvent>> => {
    return await EventService.search(query.q || '');
  }, {
    query: t.Object({
      q: t.Optional(t.String())
    })
  });
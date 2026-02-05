import { MeiliSearch, type Index, type EnqueuedTask, type SearchResponse } from 'meilisearch';
import type { IEvent } from '@/models/event.model';

const client = new MeiliSearch({
  host: Bun.env.MEILI_HOST || 'http://localhost:7700',
  apiKey: Bun.env.MEILI_KEY,
});

const eventIndex: Index<IEvent> = client.index('eventos');

export const EventService = {
  async search(query: string): Promise<SearchResponse<IEvent>> {
    return await eventIndex.search(query, {
      attributesToHighlight: ['name', 'description'],
      highlightPreTag: '<mark>',
      highlightPostTag: '</mark>',
    });
  },

  async addEvents(events: IEvent[]): Promise<EnqueuedTask> {
    return await eventIndex.addDocuments(events);
  },

  async setupSettings(): Promise<EnqueuedTask> {
    return await eventIndex.updateSettings({
      searchableAttributes: ['name', 'description', 'region'],
      filterableAttributes: ['region'],
      rankingRules: [
        'words',
        'typo',
        'proximity',
        'attribute',
        'sort',
        'exactness',
      ],
    });
  }
};
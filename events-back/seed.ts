import { EventService } from '@/services/event.service';
import { logger } from './src/config/logger';
import type { IEvent } from '@/models/event.model';

const mockEvents: IEvent[] = [
  {
    id: 1,
    name: 'Tech Conference 2026',
    region: 'North',
    date: '2026-05-20',
    description: 'A deep dive into Bun and Elysia performance.'
  },
  {
    id: 2,
    name: 'Jazz in the Park',
    region: 'South',
    date: '2026-06-15',
    description: 'Relaxing evening with live jazz music and food trucks.'
  },
  {
    id: 3,
    name: 'Local Farmers Market',
    region: 'East',
    date: '2026-04-10',
    description: 'Fresh organic produce from local farmers.'
  },
  {
    id: 4,
    name: 'Startup Weekend',
    region: 'West',
    date: '2026-07-22',
    description: 'Build a company in 54 hours. Mentorship and networking.'
  },
  {
    id: 5,
    name: 'Rock Festival',
    region: 'South',
    date: '2026-08-05',
    description: 'The biggest rock bands in the country performing live.'
  }
];

async function runSeed() {
  try {
    logger.info('Starting database seed...');
    console.log('Meili Key loaded:', Bun.env.MEILI_KEY ? 'Yes' : 'No');

    await EventService.setupSettings();
    logger.info('Index settings synchronized.');

    const task = await EventService.addEvents(mockEvents);
    
    logger.info({ taskId: task.taskUid }, 'Seed data sent to Meilisearch!');
    logger.info('The indexing process is asynchronous. It will be ready in a few seconds.');
  } catch (error) {
    logger.error({ error }, 'Seed failed');
    process.exit(1);
  }
}

runSeed();
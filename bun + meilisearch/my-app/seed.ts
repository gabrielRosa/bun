import { MeiliConnection } from './meili';
import type { Event } from './event';

const INDEX_NAME = 'events';

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Global Tech Summit 2026',
    location: 'San Francisco, CA',
    date: '2026-05-20',
    description: 'A comprehensive look into the future of Bun.js.'
  },
  {
    id: '2',
    title: 'Jazz Under the Stars',
    location: 'Central Park, NY',
    date: '2026-06-15',
    description: 'An evening of live performances by world-class jazz musicians.'
  },
  {
    id: '3',
    title: 'AI & Robotics Workshop',
    location: 'Austin, TX',
    date: '2026-04-10',
    description: 'Hands-on training for building autonomous agents using TypeScript.'
  },
  {
    id: '4',
    title: 'Sustainable Energy Expo',
    location: 'Berlin, Germany',
    date: '2026-09-12',
    description: 'Showcasing the latest innovations in renewable energy and green tech.'
  }
];

async function runSeed() {
  console.log('🚀 Starting the seeding process...');

  try {
    await MeiliConnection.deleteIndex(INDEX_NAME);
    console.log(`- Index "${INDEX_NAME}" deleted successfully.`);
  } catch (e) {
    console.log(`- Index "${INDEX_NAME}" did not exist. Creating a new one...`);
  }

  try {
    const index = MeiliConnection.index(INDEX_NAME);

    console.log('- Configuring index settings...');
    await index.updateSettings({
      searchableAttributes: ['title', 'description', 'location'],
      filterableAttributes: ['location'],
      rankingRules: [
        'words',
        'typo',
        'proximity',
        'attribute',
        'sort',
        'exactness'
      ],
    });

    console.log(`- Sending ${mockEvents.length} events to Meilisearch...`);
    const task = await index.addDocuments(mockEvents);

    console.log('✅ Seed completed successfully!');
    console.log(`- Task UID: ${task.taskUid}`);
    console.log('Note: The indexing process is asynchronous. It will be searchable in a few seconds.');

  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

// Execute the seed function
await runSeed();
console.log('Seed process finished exit point.');
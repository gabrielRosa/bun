import { MeiliConnection } from './meili';
import type { Event } from './event';

const eventIndex = MeiliConnection.index('events');

Bun.serve({
  port: 3000,
  routes: {
    "/events": {
      async GET(req) {
        const url = new URL(req.url);
        const query = url.searchParams.get('q') || '';
        const results = await eventIndex.search(query);
        return Response.json(results);
      },

      async POST(req) {
        const body = await req.json() as Event;
        const task = await eventIndex.addDocuments([body]);
        return Response.json({ message: 'Enqueued', task }, { status: 202 });
      }
    },
    "/event/:id": {
      async GET({ params }) {
        try {
          const doc = await eventIndex.getDocument(params.id);
          return Response.json(doc);
        } catch (e) {
          return Response.json({ 
            error: 'Event not found', 
            attemptedId: params.id 
          }, { status: 404 });
        }
      },

      async PUT(ctx) {
        try {
          const id = ctx.params.id;
          const body = await ctx.json() as Partial<Event>;
          const task = await eventIndex.updateDocuments([{ id, ...body }]);
          
          return Response.json({ message: 'Update enqueued', task }, { status: 202 });
        } catch (error) {
          return Response.json({ error: 'Failed to update' }, { status: 400 });
        }
      },

      async DELETE({ params }) {
        const task = await eventIndex.deleteDocument(params.id);
        return Response.json({ message: 'Deletion enqueued', task }, { status: 202 });
      }
    }
  },

  fetch() {
    return new Response("Not Found", { status: 404 });
  },
});

console.log('🚀 Server started on http://localhost:3000');
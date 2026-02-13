import { MeiliSearch } from 'meilisearch';

class MeiliClient {

  private static instance: MeiliSearch;

  private constructor() { }

  public static getInstance(): MeiliSearch {
    if (!MeiliClient.instance) {
      MeiliClient.instance = new MeiliSearch({
        host: Bun.env.MEILI_HOST || 'http://localhost:7700',
        apiKey: Bun.env.MEILI_KEY || 'MASTER_KEYa85ece4d-06c5-4e0d-b8cd-fdd8e89b9b16',
      });
    }
    return MeiliClient.instance;
  }

}

export const MeiliConnection = MeiliClient.getInstance();
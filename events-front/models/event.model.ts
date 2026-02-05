export interface IEventFormatted {
  id: string;
  name: string;
  region: string;
  date: string;
  description: string;
}

export interface IEvent {
  id: number;
  name: string;
  region: string;
  date: string;
  description: string;
  _formatted: IEventFormatted;
}

export interface ISearchResponse {
  hits: IEvent[];
  query: string;
  processingTimeMs: number;
  limit: number;
  offset: number;
  estimatedTotalHits: number;
}
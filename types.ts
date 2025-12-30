
export interface CrawlStats {
  pagesCrawled: number;
  pdfsFound: number;
  imagesFound: number;
  refinedNodes: number;
}

export interface Organization {
  id: string;
  domain: string;
  status: 'idle' | 'crawling' | 'refining' | 'paused' | 'completed' | 'error';
  progress: number;
  stats: CrawlStats;
  lastUpdated: string;
}

export interface ScrapedContent {
  url: string;
  rawText: string;
  refinedText?: string;
  category?: string;
  organizationId: string;
}

export enum JobAction {
  RESUME = 'RESUME',
  RESTART = 'RESTART'
}

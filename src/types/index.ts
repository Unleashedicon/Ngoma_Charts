export type ChartMovement = 'up' | 'down' | 'same' | 'new';

export interface ChartEntry {
  rank: number;
  title: string;
  artist: string;
  coverUrl: string;
  movement: ChartMovement;
  movementDelta?: number;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
}

export interface ProjectCardData {
  number: string;
  category: string;
  name: string;
  col1Images: string[];
  col2Image: string;
}
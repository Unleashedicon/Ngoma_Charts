import type { Album, ChartEntry } from '@/types';

export const albums: Album[] = [
  { id: '1', title: 'Nebula Dreams', artist: 'Jack', coverUrl: '/album-covers/album-01.jpg' },
  { id: '2', title: 'Golden Hour', artist: 'Jack', coverUrl: '/album-covers/album-02.jpg' },
  { id: '3', title: 'Tribal Echoes', artist: 'Jack', coverUrl: '/album-covers/album-03.jpg' },
  { id: '4', title: 'Moonlit Tides', artist: 'Jack', coverUrl: '/album-covers/album-04.jpg' },
  { id: '5', title: 'Phoenix Rising', artist: 'Jack', coverUrl: '/album-covers/album-05.jpg' },
  { id: '6', title: 'Neon City', artist: 'Jack', coverUrl: '/album-covers/album-06.jpg' },
  { id: '7', title: 'Liquid Chrome', artist: 'Jack', coverUrl: '/album-covers/album-07.jpg' },
  { id: '8', title: 'Savannah Gold', artist: 'Jack', coverUrl: '/album-covers/album-08.jpg' },
  { id: '9', title: 'Abstract Soul', artist: 'Jack', coverUrl: '/album-covers/album-09.jpg' },
  { id: '10', title: 'Enchanted Woods', artist: 'Jack', coverUrl: '/album-covers/album-10.jpg' },
  { id: '11', title: 'Vinyl Classics', artist: 'Jack', coverUrl: '/album-covers/album-11.jpg' },
  { id: '12', title: 'Rhythm of Africa', artist: 'Jack', coverUrl: '/album-covers/album-12.jpg' },
];

export const chartEntries: ChartEntry[] = [
  { rank: 1, title: 'Finale', artist: 'Bien & Alikiba', coverUrl: '/album-covers/album-05.jpg', movement: 'same' },
  { rank: 2, title: 'Nairobi Nights', artist: 'Sauti Sol', coverUrl: '/album-covers/album-06.jpg', movement: 'up', movementDelta: 3 },
  { rank: 3, title: 'Tribal Echoes', artist: 'Fena Gitu', coverUrl: '/album-covers/album-03.jpg', movement: 'down', movementDelta: 1 },
  { rank: 4, title: 'Golden Hour', artist: 'Nviiri the Storyteller', coverUrl: '/album-covers/album-02.jpg', movement: 'up', movementDelta: 5 },
  { rank: 5, title: 'Mwaka Mpya', artist: 'Khaligraph Jones', coverUrl: '/album-covers/album-08.jpg', movement: 'same' },
  { rank: 6, title: 'Liquid Chrome', artist: 'Bensoul', coverUrl: '/album-covers/album-07.jpg', movement: 'new' },
  { rank: 7, title: 'Sherehe', artist: 'Otile Brown', coverUrl: '/album-covers/album-04.jpg', movement: 'down', movementDelta: 2 },
  { rank: 8, title: 'Nebula Dreams', artist: 'Nikita Kering', coverUrl: '/album-covers/album-01.jpg', movement: 'up', movementDelta: 4 },
  { rank: 9, title: 'Enchanted Woods', artist: 'Wangechi', coverUrl: '/album-covers/album-10.jpg', movement: 'same' },
  { rank: 10, title: 'Vinyl Classics', artist: 'Chris Kaiga', coverUrl: '/album-covers/album-11.jpg', movement: 'new' },
];

export const exploreCards = [
  {
    number: '01',
    category: 'Albums',
    name: 'Album Charts',
    description: 'Full-length projects dominating the charts across all platforms',
    col1Images: ['/album-covers/album-01.jpg', '/album-covers/album-05.jpg'],
    col2Image: '/album-covers/album-08.jpg',
  },
  {
    number: '02',
    category: 'Singles',
    name: 'Single Charts',
    description: 'The hottest individual tracks making waves right now',
    col1Images: ['/album-covers/album-02.jpg', '/album-covers/album-06.jpg'],
    col2Image: '/album-covers/album-09.jpg',
  },
  {
    number: '03',
    category: 'Year End',
    name: 'Year-End Charts',
    description: 'The definitive rankings closing out the year in Kenyan music',
    col1Images: ['/album-covers/album-03.jpg', '/album-covers/album-07.jpg'],
    col2Image: '/album-covers/album-12.jpg',
  },
];
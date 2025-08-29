import { Restaurant } from './types';

export const defaultRestaurants: Restaurant[] = [
  // Top Michelin 3-Star Restaurant
  {
    id: '1',
    name: 'De Librije',
    city: 'Zwolle',
    tags: ['Michelin 3-Star', 'Dutch Cuisine', 'Historic'],
    latitude: 52.5168,
    longitude: 6.0830,
    description: 'Three Michelin stars - the pinnacle of Dutch culinary excellence by Chef Jonnie Boer'
  },

  // Michelin 2-Star Restaurants
  {
    id: '2',
    name: 'Inter Scaldes',
    city: 'Kruiningen',
    tags: ['Michelin 2-Star', 'Seafood', 'Zeeland'],
    latitude: 51.4486,
    longitude: 4.0294,
    description: 'Two Michelin stars - exceptional seafood cuisine by Chef Jannis Brevet'
  },
  {
    id: '3',
    name: 'Ciel Bleu',
    city: 'Amsterdam',
    tags: ['Michelin 2-Star', 'French', 'Sky View'],
    latitude: 52.3702,
    longitude: 4.8952,
    description: 'Two Michelin stars - French haute cuisine with panoramic Amsterdam views'
  },

  // Michelin 1-Star Restaurants - Amsterdam & Region
  {
    id: '4',
    name: 'Spectrum',
    city: 'Amsterdam',
    tags: ['Michelin 1-Star', 'Modern European', 'Canal View'],
    latitude: 52.3640,
    longitude: 4.8884,
    description: 'One Michelin star - innovative modern cuisine overlooking Amsterdam canals'
  },
  {
    id: '5',
    name: 'Vinkeles',
    city: 'Amsterdam',
    tags: ['Michelin 1-Star', 'French', 'Historic'],
    latitude: 52.3673,
    longitude: 4.8945,
    description: 'One Michelin star - French cuisine in atmospheric 18th-century bakery'
  },
  {
    id: '6',
    name: 'Yamazato',
    city: 'Amsterdam',
    tags: ['Michelin 1-Star', 'Japanese', 'Sushi'],
    latitude: 52.3702,
    longitude: 4.8951,
    description: 'One Michelin star - authentic Japanese kaiseki cuisine and sushi mastery'
  },
  {
    id: '7',
    name: 'De Kas',
    city: 'Amsterdam',
    tags: ['Michelin 1-Star', 'Greenhouse', 'Sustainable'],
    latitude: 52.3676,
    longitude: 4.9041,
    description: 'One Michelin star - farm-to-table excellence in beautiful greenhouse setting'
  },

  // Michelin 1-Star Restaurants - Other Cities
  {
    id: '8',
    name: 'FG Restaurant',
    city: 'Rotterdam',
    tags: ['Michelin 1-Star', 'Modern European', 'Fine Dining'],
    latitude: 51.9225,
    longitude: 4.4792,
    description: 'One Michelin star - innovative modern European cuisine by Chef François Geurds'
  },
  {
    id: '9',
    name: 'Parkheuvel',
    city: 'Rotterdam',
    tags: ['Michelin 1-Star', 'French', 'Park View'],
    latitude: 51.9244,
    longitude: 4.4731,
    description: 'One Michelin star - classic French cuisine overlooking beautiful park'
  },
  {
    id: '10',
    name: 'Joelia',
    city: 'Rotterdam',
    tags: ['Michelin 1-Star', 'French', 'Luxury'],
    latitude: 51.9244,
    longitude: 4.4731,
    description: 'One Michelin star - sophisticated French cuisine in luxury hotel setting'
  },
  {
    id: '11',
    name: "Calla's",
    city: 'The Hague',
    tags: ['Michelin 1-Star', 'French', 'Elegant'],
    latitude: 52.0705,
    longitude: 4.3007,
    description: 'One Michelin star - refined French cuisine in elegant setting'
  },
  {
    id: '12',
    name: 'Pure C',
    city: 'Cadzand',
    tags: ['Michelin 1-Star', 'Seafood', 'Coastal'],
    latitude: 51.3747,
    longitude: 3.3989,
    description: 'One Michelin star - exceptional seafood steps from the North Sea'
  },
  {
    id: '13',
    name: 'Latour',
    city: 'Noordwijk',
    tags: ['Michelin 1-Star', 'Beach', 'Contemporary'],
    latitude: 52.2379,
    longitude: 4.4478,
    description: 'One Michelin star - contemporary cuisine with stunning beach views'
  },
  {
    id: '14',
    name: 'De Leest',
    city: 'Vaassen',
    tags: ['Michelin 1-Star', 'Dutch Cuisine', 'Country'],
    latitude: 52.2897,
    longitude: 6.0569,
    description: 'One Michelin star - elevated Dutch cuisine in countryside setting'
  },
  {
    id: '15',
    name: 'De Echoput',
    city: 'Apeldoorn',
    tags: ['Michelin 1-Star', 'Forest', 'Country'],
    latitude: 52.2112,
    longitude: 5.9113,
    description: 'One Michelin star - culinary excellence in beautiful forest setting'
  },
  {
    id: '16',
    name: 'De Lindehof',
    city: 'Nuenen',
    tags: ['Michelin 1-Star', 'French', 'Garden'],
    latitude: 51.4705,
    longitude: 5.5486,
    description: 'One Michelin star - French refinement with beautiful garden terrace'
  },
  {
    id: '17',
    name: 'De Bokkedoorns',
    city: 'Overveen',
    tags: ['Michelin 1-Star', 'Dunes', 'Elegant'],
    latitude: 52.3890,
    longitude: 4.6234,
    description: 'One Michelin star - elegant cuisine near stunning coastal dunes'
  },

  // Top Gault-Millau Rated Restaurants
  {
    id: '18',
    name: 'Greetje',
    city: 'Amsterdam',
    tags: ['Gault-Millau 16/20', 'Modern Dutch', 'Creative'],
    latitude: 52.3728,
    longitude: 4.8936,
    description: 'Gault-Millau 16/20 - creative modern interpretation of traditional Dutch cuisine'
  },
  {
    id: '19',
    name: 'Bridges',
    city: 'Amsterdam',
    tags: ['Gault-Millau 15/20', 'French', 'Luxury Hotel'],
    latitude: 52.3588,
    longitude: 4.8980,
    description: 'Gault-Millau 15/20 - refined French cuisine in prestigious Grand Hotel'
  },
  {
    id: '20',
    name: 'Château Neercanne',
    city: 'Maastricht',
    tags: ['Gault-Millau 15/20', 'Castle', 'Historic'],
    latitude: 50.8514,
    longitude: 5.6913,
    description: 'Gault-Millau 15/20 - historic castle dining in southern Limburg'
  }
];
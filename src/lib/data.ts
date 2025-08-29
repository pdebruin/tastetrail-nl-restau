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
  {
    id: '4',
    name: 'Restaurant 212',
    city: 'Amsterdam',
    tags: ['Michelin 2-Star', 'Modern Dutch', 'Fine Dining'],
    latitude: 52.3740,
    longitude: 4.8897,
    description: 'Two Michelin stars - modern Dutch gastronomy with international influences'
  },

  // Michelin 1-Star Restaurants - Amsterdam & Region
  {
    id: '5',
    name: 'Spectrum',
    city: 'Amsterdam',
    tags: ['Michelin 1-Star', 'Modern European', 'Canal View'],
    latitude: 52.3640,
    longitude: 4.8884,
    description: 'One Michelin star - innovative modern cuisine overlooking Amsterdam canals'
  },
  {
    id: '6',
    name: 'Vinkeles',
    city: 'Amsterdam',
    tags: ['Michelin 1-Star', 'French', 'Historic'],
    latitude: 52.3673,
    longitude: 4.8945,
    description: 'One Michelin star - French cuisine in atmospheric 18th-century bakery'
  },
  {
    id: '7',
    name: 'Yamazato',
    city: 'Amsterdam',
    tags: ['Michelin 1-Star', 'Japanese', 'Sushi'],
    latitude: 52.3702,
    longitude: 4.8951,
    description: 'One Michelin star - authentic Japanese kaiseki cuisine and sushi mastery'
  },
  {
    id: '8',
    name: 'De Kas',
    city: 'Amsterdam',
    tags: ['Michelin 1-Star', 'Greenhouse', 'Sustainable'],
    latitude: 52.3676,
    longitude: 4.9041,
    description: 'One Michelin star - farm-to-table excellence in beautiful greenhouse setting'
  },
  {
    id: '9',
    name: 'Bougainville',
    city: 'Amsterdam',
    tags: ['Michelin 1-Star', 'French', 'Classic'],
    latitude: 52.3584,
    longitude: 4.8841,
    description: 'One Michelin star - classic French gastronomy in intimate setting'
  },
  {
    id: '10',
    name: 'RIJKS',
    city: 'Amsterdam',
    tags: ['Michelin 1-Star', 'Dutch Cuisine', 'Museum'],
    latitude: 52.3600,
    longitude: 4.8852,
    description: 'One Michelin star - Dutch cuisine in the Rijksmuseum with cultural flair'
  },

  // Michelin 1-Star Restaurants - Rotterdam & Region
  {
    id: '11',
    name: 'FG Restaurant',
    city: 'Rotterdam',
    tags: ['Michelin 1-Star', 'Modern European', 'Fine Dining'],
    latitude: 51.9225,
    longitude: 4.4792,
    description: 'One Michelin star - innovative modern European cuisine by Chef François Geurds'
  },
  {
    id: '12',
    name: 'Parkheuvel',
    city: 'Rotterdam',
    tags: ['Michelin 1-Star', 'French', 'Park View'],
    latitude: 51.9244,
    longitude: 4.4731,
    description: 'One Michelin star - classic French cuisine overlooking beautiful park'
  },
  {
    id: '13',
    name: 'Joelia',
    city: 'Rotterdam',
    tags: ['Michelin 1-Star', 'French', 'Luxury'],
    latitude: 51.9244,
    longitude: 4.4731,
    description: 'One Michelin star - sophisticated French cuisine in luxury hotel setting'
  },
  {
    id: '14',
    name: 'Zeezout',
    city: 'Rotterdam',
    tags: ['Michelin 1-Star', 'Seafood', 'Harbor'],
    latitude: 51.9244,
    longitude: 4.4792,
    description: 'One Michelin star - fresh seafood cuisine with harbor views'
  },

  // Michelin 1-Star Restaurants - The Hague & Region
  {
    id: '15',
    name: "Calla's",
    city: 'The Hague',
    tags: ['Michelin 1-Star', 'French', 'Elegant'],
    latitude: 52.0705,
    longitude: 4.3007,
    description: 'One Michelin star - refined French cuisine in elegant setting'
  },
  {
    id: '16',
    name: 'Restaurant Saur',
    city: 'The Hague',
    tags: ['Michelin 1-Star', 'Modern Dutch', 'Creative'],
    latitude: 52.0705,
    longitude: 4.3007,
    description: 'One Michelin star - creative modern Dutch cuisine with innovative techniques'
  },

  // Michelin 1-Star Restaurants - North & Coastal
  {
    id: '17',
    name: 'Pure C',
    city: 'Cadzand',
    tags: ['Michelin 1-Star', 'Seafood', 'Coastal'],
    latitude: 51.3747,
    longitude: 3.3989,
    description: 'One Michelin star - exceptional seafood steps from the North Sea'
  },
  {
    id: '18',
    name: 'Latour',
    city: 'Noordwijk',
    tags: ['Michelin 1-Star', 'Beach', 'Contemporary'],
    latitude: 52.2379,
    longitude: 4.4478,
    description: 'One Michelin star - contemporary cuisine with stunning beach views'
  },
  {
    id: '19',
    name: 'De Bokkedoorns',
    city: 'Overveen',
    tags: ['Michelin 1-Star', 'Dunes', 'Elegant'],
    latitude: 52.3890,
    longitude: 4.6234,
    description: 'One Michelin star - elegant cuisine near stunning coastal dunes'
  },
  {
    id: '20',
    name: 'Ode',
    city: 'Rotterdam',
    tags: ['Michelin 1-Star', 'Contemporary', 'Urban'],
    latitude: 51.9225,
    longitude: 4.4792,
    description: 'One Michelin star - contemporary cuisine in Rotterdam\'s vibrant food scene'
  },

  // Michelin 1-Star Restaurants - Central & East Netherlands
  {
    id: '21',
    name: 'De Leest',
    city: 'Vaassen',
    tags: ['Michelin 1-Star', 'Dutch Cuisine', 'Country'],
    latitude: 52.2897,
    longitude: 6.0569,
    description: 'One Michelin star - elevated Dutch cuisine in countryside setting'
  },
  {
    id: '22',
    name: 'De Echoput',
    city: 'Apeldoorn',
    tags: ['Michelin 1-Star', 'Forest', 'Country'],
    latitude: 52.2112,
    longitude: 5.9113,
    description: 'One Michelin star - culinary excellence in beautiful forest setting'
  },
  {
    id: '23',
    name: 'Seinpost',
    city: 'Scheveningen',
    tags: ['Michelin 1-Star', 'Seafood', 'Beach'],
    latitude: 52.1076,
    longitude: 4.2776,
    description: 'One Michelin star - innovative seafood cuisine right on the beach'
  },
  {
    id: '24',
    name: 'Cheval Blanc',
    city: 'Heemstede',
    tags: ['Michelin 1-Star', 'French', 'Classic'],
    latitude: 52.3507,
    longitude: 4.6261,
    description: 'One Michelin star - timeless French cuisine in charming historic setting'
  },

  // Michelin 1-Star Restaurants - South Netherlands
  {
    id: '25',
    name: 'De Lindehof',
    city: 'Nuenen',
    tags: ['Michelin 1-Star', 'French', 'Garden'],
    latitude: 51.4705,
    longitude: 5.5486,
    description: 'One Michelin star - French refinement with beautiful garden terrace'
  },
  {
    id: '26',
    name: 'Château Neercanne',
    city: 'Maastricht',
    tags: ['Michelin 1-Star', 'Castle', 'Historic'],
    latitude: 50.8514,
    longitude: 5.6913,
    description: 'One Michelin star - historic castle dining in southern Limburg'
  },
  {
    id: '27',
    name: 'Toine Hermsen',
    city: 'Maastricht',
    tags: ['Michelin 1-Star', 'French', 'Traditional'],
    latitude: 50.8503,
    longitude: 5.6973,
    description: 'One Michelin star - traditional French cuisine with Limburg influences'
  },
  {
    id: '28',
    name: 'Beluga',
    city: 'Maastricht',
    tags: ['Michelin 1-Star', 'Contemporary', 'Riverside'],
    latitude: 50.8513,
    longitude: 5.6890,
    description: 'One Michelin star - contemporary cuisine along the Maas river'
  },

  // Top Gault-Millau Rated Restaurants
  {
    id: '29',
    name: 'Greetje',
    city: 'Amsterdam',
    tags: ['Gault-Millau 16/20', 'Modern Dutch', 'Creative'],
    latitude: 52.3728,
    longitude: 4.8936,
    description: 'Gault-Millau 16/20 - creative modern interpretation of traditional Dutch cuisine'
  },
  {
    id: '30',
    name: 'Bridges',
    city: 'Amsterdam',
    tags: ['Gault-Millau 15/20', 'French', 'Luxury Hotel'],
    latitude: 52.3588,
    longitude: 4.8980,
    description: 'Gault-Millau 15/20 - refined French cuisine in prestigious Grand Hotel'
  },
  {
    id: '31',
    name: 'Restaurant Vandaag',
    city: 'Amsterdam',
    tags: ['Gault-Millau 15/20', 'Modern Dutch', 'Innovative'],
    latitude: 52.3676,
    longitude: 4.8925,
    description: 'Gault-Millau 15/20 - innovative Dutch cuisine with contemporary presentation'
  },
  {
    id: '32',
    name: 'Restaurant Graham',
    city: 'Amsterdam',
    tags: ['Gault-Millau 14/20', 'Casual Fine', 'Modern'],
    latitude: 52.3702,
    longitude: 4.8845,
    description: 'Gault-Millau 14/20 - modern casual fine dining with creative flair'
  },
  {
    id: '33',
    name: 'Restaurant De Juwelier',
    city: 'Amsterdam',
    tags: ['Gault-Millau 14/20', 'French', 'Neighborhood'],
    latitude: 52.3640,
    longitude: 4.8925,
    description: 'Gault-Millau 14/20 - intimate French cuisine in charming neighborhood setting'
  },
  {
    id: '34',
    name: 'De Hardloop',
    city: 'Nijmegen',
    tags: ['Gault-Millau 15/20', 'Regional', 'Historic'],
    latitude: 51.8426,
    longitude: 5.8518,
    description: 'Gault-Millau 15/20 - regional cuisine in historic Nijmegen setting'
  },
  {
    id: '35',
    name: 'Restaurant De Zwethheul',
    city: 'Zweth',
    tags: ['Gault-Millau 15/20', 'Country', 'Traditional'],
    latitude: 52.0389,
    longitude: 4.3347,
    description: 'Gault-Millau 15/20 - country cuisine in peaceful traditional setting'
  },
  {
    id: '36',
    name: 'Restaurant ML',
    city: 'Haarlem',
    tags: ['Gault-Millau 14/20', 'Modern European', 'City Center'],
    latitude: 52.3874,
    longitude: 4.6462,
    description: 'Gault-Millau 14/20 - modern European cuisine in historic Haarlem'
  },

  // Additional High-Quality Restaurants
  {
    id: '37',
    name: 'Bord\'Eau Restaurant Gastronomique',
    city: 'Amsterdam',
    tags: ['Fine Dining', 'French', 'Canal House'],
    latitude: 52.3676,
    longitude: 4.8840,
    description: 'Exceptional French gastronomy in elegant Amsterdam canal house'
  },
  {
    id: '38',
    name: 'Restaurant Johannes',
    city: 'Amsterdam',
    tags: ['Fine Dining', 'Dutch', 'Modern'],
    latitude: 52.3702,
    longitude: 4.8925,
    description: 'Modern Dutch cuisine with international influences and seasonal focus'
  },
  {
    id: '39',
    name: 'Restaurant FLORE',
    city: 'Amsterdam',
    tags: ['Fine Dining', 'Contemporary', 'Seasonal'],
    latitude: 52.3640,
    longitude: 4.8840,
    description: 'Contemporary seasonal cuisine with focus on local ingredients'
  },
  {
    id: '40',
    name: 'Restaurant Copper Palm',
    city: 'Amsterdam',
    tags: ['Fine Dining', 'Asian Fusion', 'Creative'],
    latitude: 52.3728,
    longitude: 4.8897,
    description: 'Creative Asian fusion cuisine with sophisticated presentation'
  },
  {
    id: '41',
    name: 'Restaurant Fred',
    city: 'Rotterdam',
    tags: ['Fine Dining', 'French', 'Contemporary'],
    latitude: 51.9225,
    longitude: 4.4792,
    description: 'Contemporary French cuisine in Rotterdam\'s culinary heart'
  },
  {
    id: '42',
    name: 'Restaurant De Jong',
    city: 'Haarlem',
    tags: ['Fine Dining', 'Modern Dutch', 'Historic'],
    latitude: 52.3874,
    longitude: 4.6462,
    description: 'Modern Dutch cuisine in beautiful historic Haarlem location'
  },
  {
    id: '43',
    name: 'Restaurant De Saffraan',
    city: 'Amersfoort',
    tags: ['Fine Dining', 'French', 'Garden'],
    latitude: 52.1561,
    longitude: 5.3878,
    description: 'French cuisine with beautiful garden setting in historic Amersfoort'
  },
  {
    id: '44',
    name: 'Restaurant Auberge De Kieviet',
    city: 'Wassenaar',
    tags: ['Fine Dining', 'French', 'Country'],
    latitude: 52.1448,
    longitude: 4.4025,
    description: 'Classic French country cuisine in peaceful Wassenaar setting'
  },
  {
    id: '45',
    name: 'Restaurant Katseveer',
    city: 'Wilhelminadorp',
    tags: ['Fine Dining', 'Seafood', 'Zeeland'],
    latitude: 51.5300,
    longitude: 3.8800,
    description: 'Fresh Zeeland seafood with panoramic views over Oosterschelde'
  },
  {
    id: '46',
    name: 'Restaurant De Vrienden van Jacob',
    city: 'Santpoort',
    tags: ['Fine Dining', 'Modern European', 'Coastal'],
    latitude: 52.4173,
    longitude: 4.6267,
    description: 'Modern European cuisine near the beautiful Dutch coast'
  },
  {
    id: '47',
    name: 'Restaurant Noble',
    city: 'Haarlem',
    tags: ['Fine Dining', 'Contemporary', 'Wine Focus'],
    latitude: 52.3874,
    longitude: 4.6462,
    description: 'Contemporary cuisine with exceptional wine pairings in Haarlem'
  },
  {
    id: '48',
    name: 'Restaurant Onder de Boompjes',
    city: 'Hattem',
    tags: ['Fine Dining', 'Regional', 'Historic'],
    latitude: 52.4733,
    longitude: 6.0689,
    description: 'Regional cuisine in historic Hanseatic town of Hattem'
  },
  {
    id: '49',
    name: 'Restaurant De Nieuwe Winkel',
    city: 'Nijmegen',
    tags: ['Fine Dining', 'Vegetarian', 'Sustainable'],
    latitude: 51.8426,
    longitude: 5.8518,
    description: 'Innovative vegetarian fine dining with sustainable focus'
  },
  {
    id: '50',
    name: 'Restaurant De Gieser Wildeman',
    city: 'Noordeloos',
    tags: ['Fine Dining', 'Modern Dutch', 'Countryside'],
    latitude: 51.9333,
    longitude: 4.9167,
    description: 'Modern Dutch cuisine in beautiful countryside location'
  }
];
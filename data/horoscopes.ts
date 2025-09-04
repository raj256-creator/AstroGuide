import { DailyHoroscope, ZodiacSign } from '../types/horoscope';

export const zodiacSigns: ZodiacSign[] = [
  {
    name: 'Aries',
    symbol: '♈',
    element: 'Fire',
    dates: 'March 21 - April 19'
  },
  {
    name: 'Taurus',
    symbol: '♉',
    element: 'Earth',
    dates: 'April 20 - May 20'
  },
  {
    name: 'Gemini',
    symbol: '♊',
    element: 'Air',
    dates: 'May 21 - June 20'
  },
  {
    name: 'Cancer',
    symbol: '♋',
    element: 'Water',
    dates: 'June 21 - July 22'
  },
  {
    name: 'Leo',
    symbol: '♌',
    element: 'Fire',
    dates: 'July 23 - August 22'
  },
  {
    name: 'Virgo',
    symbol: '♍',
    element: 'Earth',
    dates: 'August 23 - September 22'
  },
  {
    name: 'Libra',
    symbol: '♎',
    element: 'Air',
    dates: 'September 23 - October 22'
  },
  {
    name: 'Scorpio',
    symbol: '♏',
    element: 'Water',
    dates: 'October 23 - November 21'
  },
  {
    name: 'Sagittarius',
    symbol: '♐',
    element: 'Fire',
    dates: 'November 22 - December 21'
  },
  {
    name: 'Capricorn',
    symbol: '♑',
    element: 'Earth',
    dates: 'December 22 - January 19'
  },
  {
    name: 'Aquarius',
    symbol: '♒',
    element: 'Air',
    dates: 'January 20 - February 18'
  },
  {
    name: 'Pisces',
    symbol: '♓',
    element: 'Water',
    dates: 'February 19 - March 20'
  }
];

export const dailyHoroscopes: DailyHoroscope[] = [
  {
    sign: 'Aries',
    date: new Date().toISOString().split('T')[0],
    description: 'Your fiery energy is particularly strong today. Take on new challenges with confidence, but remember to pace yourself. A conversation with a friend might reveal an unexpected opportunity.',
    luckyNumber: 7,
    luckyColor: 'Red',
    mood: 'Energetic'
  },
  {
    sign: 'Taurus',
    date: new Date().toISOString().split('T')[0],
    description: 'Stability and patience will serve you well today. Focus on practical matters and avoid rushing into decisions. Your determination will help you overcome any obstacles.',
    luckyNumber: 3,
    luckyColor: 'Green',
    mood: 'Grounded'
  },
  {
    sign: 'Gemini',
    date: new Date().toISOString().split('T')[0],
    description: 'Communication is your superpower today. Express your ideas clearly and listen to others with an open mind. Multiple opportunities may present themselves.',
    luckyNumber: 5,
    luckyColor: 'Yellow',
    mood: 'Curious'
  },
  {
    sign: 'Cancer',
    date: new Date().toISOString().split('T')[0],
    description: 'Trust your intuition today. Your emotional intelligence will guide you to make the right decisions. Spend quality time with loved ones.',
    luckyNumber: 2,
    luckyColor: 'Silver',
    mood: 'Intuitive'
  },
  {
    sign: 'Leo',
    date: new Date().toISOString().split('T')[0],
    description: 'Your natural charisma shines brightly today. Take center stage and share your talents with the world. Success is within reach if you stay confident.',
    luckyNumber: 8,
    luckyColor: 'Gold',
    mood: 'Confident'
  },
  {
    sign: 'Virgo',
    date: new Date().toISOString().split('T')[0],
    description: 'Attention to detail will pay off today. Organize your thoughts and priorities. A methodical approach will lead to significant progress.',
    luckyNumber: 6,
    luckyColor: 'Navy Blue',
    mood: 'Analytical'
  },
  {
    sign: 'Libra',
    date: new Date().toISOString().split('T')[0],
    description: 'Balance and harmony are your themes today. Seek fairness in all dealings and avoid making hasty judgments. Beauty surrounds you.',
    luckyNumber: 4,
    luckyColor: 'Pink',
    mood: 'Balanced'
  },
  {
    sign: 'Scorpio',
    date: new Date().toISOString().split('T')[0],
    description: 'Deep transformation is possible today. Embrace change and let go of what no longer serves you. Your intensity will attract positive outcomes.',
    luckyNumber: 9,
    luckyColor: 'Maroon',
    mood: 'Transformative'
  },
  {
    sign: 'Sagittarius',
    date: new Date().toISOString().split('T')[0],
    description: 'Adventure calls to you today. Expand your horizons through learning or travel. Your optimistic outlook will inspire others.',
    luckyNumber: 1,
    luckyColor: 'Purple',
    mood: 'Adventurous'
  },
  {
    sign: 'Capricorn',
    date: new Date().toISOString().split('T')[0],
    description: 'Your ambitious nature will drive you toward success today. Set clear goals and work steadily toward them. Recognition is coming your way.',
    luckyNumber: 10,
    luckyColor: 'Brown',
    mood: 'Ambitious'
  },
  {
    sign: 'Aquarius',
    date: new Date().toISOString().split('T')[0],
    description: 'Innovation and originality are highlighted today. Think outside the box and embrace your uniqueness. Technology may play a helpful role.',
    luckyNumber: 11,
    luckyColor: 'Turquoise',
    mood: 'Innovative'
  },
  {
    sign: 'Pisces',
    date: new Date().toISOString().split('T')[0],
    description: 'Your compassionate nature draws others to you today. Trust your dreams and creative instincts. Spiritual practices may bring clarity.',
    luckyNumber: 12,
    luckyColor: 'Sea Green',
    mood: 'Compassionate'
  }
];
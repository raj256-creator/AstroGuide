# AstroGuide - Cosmic Journey Mobile App

A comprehensive astrology and spiritual guidance mobile application built with React Native and Expo, featuring horoscopes, numerology calculations, shopping for spiritual items, and user feedback management.

## 🌟 Features

### Core Features
- **Daily Horoscopes**: Personalized horoscope readings for all 12 zodiac signs
- **Numerology Calculator**: Calculate life path and destiny numbers with detailed interpretations
- **User Authentication**: Secure login and registration system
- **User Profiles**: Personalized profiles with zodiac sign information
- **Feedback System**: Users can submit feedback with admin management
- **Shopping System**: Purchase crystals, gems, and spiritual materials
- **Admin Dashboard**: Comprehensive admin panel for feedback management

### Shopping System
- **Product Categories**:
  - Crystals & Gems (Amethyst, Rose Quartz, Clear Quartz, Black Tourmaline)
  - Psychological Materials (Meditation guides, Tarot cards, Dream journals)
  - Physiological Materials (Essential oils, Yoga mats, Herbal teas)
- **Shopping Cart**: Add/remove items, quantity management
- **Checkout System**: Complete order processing
- **Order Management**: Track purchases and order history

### Admin Features
- **Feedback Management**: View, filter, and update feedback status
- **Statistics Dashboard**: Overview of feedback submissions
- **Status Updates**: Mark feedback as pending, reviewed, or resolved

## 🛠 Technologies Used

### Frontend Framework
- **React Native**: 0.80.0
- **Expo SDK**: 54.0.0
- **Expo Router**: 6.0.17 (File-based routing)
- **TypeScript**: 5.8.3

### UI/UX Libraries
- **Expo Linear Gradient**: 14.2.3 (Beautiful gradient backgrounds)
- **Expo Linear Gradient**: 13.0.2 (Beautiful gradient backgrounds)
- **Lucide React Native**: 0.475.0 (Modern icon library)
- **React Native Picker**: 2.11.1 (Dropdown selections)
- **React Native Gesture Handler**: 2.25.0 (Touch interactions)
- **React Native Reanimated**: 3.18.4 (Smooth animations)

### Backend & Database
- **Supabase**: Backend-as-a-Service
  - PostgreSQL database
  - Real-time subscriptions
  - Row Level Security (RLS)
  - Authentication system
- **Supabase JS Client**: 2.57.2

### Navigation & Routing
- **Expo Router**: File-based routing system
- **React Navigation**: 7.0.14 (Bottom tabs navigation)
- **React Native Screens**: 4.11.0 (Native screen optimization)

### Development Tools
- **Expo CLI**: Development and build tools
- **Metro Bundler**: JavaScript bundler
- **Babel**: JavaScript compiler
- **ESLint**: Code linting
- **Prettier**: Code formatting

### Platform Support
- **iOS**: Native iOS app support
- **Android**: Native Android app support
- **Web**: Progressive Web App (PWA) support

## 📱 App Structure

### File-based Routing (Expo Router)
```
app/
├── _layout.tsx                 # Root layout with providers
├── index.tsx                   # Welcome/landing screen
├── +not-found.tsx             # 404 error screen
├── auth/
│   ├── login.tsx              # Login screen
│   └── register.tsx           # Registration screen
└── (tabs)/                    # Tab-based navigation
    ├── _layout.tsx            # Tab layout configuration
    ├── index.tsx              # Home screen
    ├── horoscope.tsx          # Daily horoscope screen
    ├── numerology.tsx         # Numerology calculator
    ├── shop.tsx               # Shopping system
    ├── feedback.tsx           # User feedback form
    ├── admin.tsx              # Admin dashboard
    └── profile.tsx            # User profile screen
```

### Component Architecture
```
components/
├── GradientBackground.tsx     # Reusable gradient background
├── Button.tsx                 # Custom button component
├── Input.tsx                  # Form input component
└── LoadingSpinner.tsx         # Loading indicator
```

### Context Providers
```
contexts/
├── AuthContext.tsx            # Authentication state management
└── CartContext.tsx            # Shopping cart state management
```

### Data & Types
```
data/
├── horoscopes.ts              # Zodiac signs and daily horoscopes
├── numerology.ts              # Numerology interpretations
└── shopItems.ts               # Product catalog

types/
├── user.ts                    # User interface definitions
├── horoscope.ts               # Horoscope type definitions
├── numerology.ts              # Numerology type definitions
└── shop.ts                    # Shopping system types
```

### Utilities
```
utils/
└── numerologyCalculator.ts    # Numerology calculation functions
```

## 🗄 Database Schema

### Feedback Table
```sql
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### Row Level Security (RLS)
- **Insert Policy**: Anyone can submit feedback (anon, authenticated)
- **Select Policy**: Authenticated users can read all feedback
- **Update Policy**: Authenticated users can update feedback status

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Supabase account (for database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd astroguide
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Click "Connect to Supabase" in the app interface
   - Configure your environment variables

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the app**
   - Scan QR code with Expo Go app (mobile)
   - Press 'w' to open in web browser
   - Press 'i' for iOS simulator
   - Press 'a' for Android emulator

### Environment Variables
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build:web` - Build for web deployment
- `npm run lint` - Run ESLint code analysis

## 🎨 Design System

### Color Palette
- **Primary**: #6B46C1 (Purple)
- **Secondary**: #F59E0B (Amber)
- **Background**: Linear gradient (#0F0F23 → #1A1A40 → #2D1B69)
- **Text**: #FFFFFF (White), #D1D5DB (Light Gray)
- **Success**: #10B981 (Green)
- **Error**: #EF4444 (Red)

### Typography
- **Headers**: Bold, large sizes (24-40px)
- **Body**: Regular, readable sizes (14-18px)
- **Labels**: Medium weight, smaller sizes (12-16px)

### Components
- **Cards**: Glassmorphism effect with backdrop blur
- **Buttons**: Rounded corners with gradient shadows
- **Inputs**: Dark theme with purple accents
- **Icons**: Lucide icon library for consistency

## 🔐 Authentication System

### Features
- Email/password authentication
- User registration with zodiac sign calculation
- Persistent login sessions
- Cross-platform storage (localStorage for web)
- Form validation and error handling

### User Data Structure
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  dateOfBirth: string;
  zodiacSign: string;
  createdAt: string;
}
```

## 🛒 Shopping System

### Product Categories
1. **Crystals & Gems**
   - Amethyst Crystal ($29.99)
   - Rose Quartz ($24.99)
   - Clear Quartz ($19.99)
   - Black Tourmaline ($34.99)

2. **Psychological Materials**
   - Meditation Guide Book ($15.99)
   - Tarot Card Deck ($39.99)
   - Dream Journal ($12.99)
   - Chakra Balancing Kit ($49.99)

3. **Physiological Materials**
   - Essential Oil Set ($44.99)
   - Himalayan Salt Lamp ($32.99)
   - Yoga Mat Premium ($59.99)
   - Herbal Tea Collection ($27.99)

### Shopping Features
- Product filtering by category
- Add to cart with quantity controls
- Shopping cart management
- Order checkout and processing
- Persistent cart storage

## 🔮 Astrology Features

### Daily Horoscopes
- All 12 zodiac signs supported
- Daily readings with:
  - Detailed descriptions
  - Lucky numbers
  - Lucky colors
  - Mood indicators
- Sign selection and filtering

### Numerology Calculator
- **Life Path Number**: Calculated from birth date
- **Destiny Number**: Calculated from full name
- Detailed interpretations for numbers 1-12, 11, 22, 33
- Master number recognition

### Zodiac Sign Detection
Automatic zodiac sign calculation based on birth date:
- Aries (March 21 - April 19)
- Taurus (April 20 - May 20)
- Gemini (May 21 - June 20)
- Cancer (June 21 - July 22)
- Leo (July 23 - August 22)
- Virgo (August 23 - September 22)
- Libra (September 23 - October 22)
- Scorpio (October 23 - November 21)
- Sagittarius (November 22 - December 21)
- Capricorn (December 22 - January 19)
- Aquarius (January 20 - February 18)
- Pisces (February 19 - March 20)

## 👨‍💼 Admin Dashboard

### Features
- **Feedback Overview**: Statistics and counts
- **Feedback Management**: View all submissions
- **Status Filtering**: Filter by pending, reviewed, resolved
- **Status Updates**: Change feedback status
- **Real-time Updates**: Pull-to-refresh functionality

### Admin Actions
- Mark feedback as reviewed
- Mark feedback as resolved
- View submission timestamps
- Filter and search feedback

## 🔧 Configuration Files

### app.json (Expo Configuration)
```json
{
  "expo": {
    "name": "bolt-expo-nativewind",
    "slug": "bolt-expo-nativewind",
    "version": "1.0.0",
    "orientation": "portrait",
    "newArchEnabled": true,
    "plugins": [
      "expo-router",
      "expo-font",
      "expo-web-browser",
      "expo-camera"
    ]
  }
}
```

### package.json Dependencies
```json
{
  "dependencies": {
    "expo": "^54.0.0",
    "expo-router": "~6.0.0",
    "react": "19.0.0",
    "react-native": "0.80.0",
    "@supabase/supabase-js": "^2.57.2",
    "lucide-react-native": "^0.475.0"
  }
}
```

## 🚀 Deployment

### Web Deployment
```bash
npm run build:web
```
Output: `dist/` directory ready for static hosting

### Mobile Deployment
1. **Development Build**
   ```bash
   expo build:ios
   expo build:android
   ```

2. **Production Build**
   ```bash
   eas build --platform all
   ```

### Supported Platforms
- **iOS**: App Store deployment
- **Android**: Google Play Store deployment
- **Web**: Static hosting (Netlify, Vercel, etc.)

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Horoscope viewing and filtering
- [ ] Numerology calculations
- [ ] Shopping cart functionality
- [ ] Feedback submission
- [ ] Admin dashboard operations
- [ ] Cross-platform compatibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Expo Team** for the amazing development platform
- **Supabase** for the backend infrastructure
- **Lucide** for the beautiful icon library
- **Pexels** for the stock images
- **React Native Community** for the ecosystem

## 📞 Support

For support, email support@astroguide.app or create an issue in the repository.

## 🔄 Version History

- **v1.0.0** - Initial release with core features
  - User authentication
  - Daily horoscopes
  - Numerology calculator
  - Shopping system
  - Admin dashboard
  - Feedback management

---

**Built with ❤️ using React Native, Expo, and Supabase**
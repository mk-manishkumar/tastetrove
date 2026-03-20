# TasteTrove

A comprehensive recipe and pantry management application that helps users discover, save, and organize recipes while managing their ingredient inventory.

## 🌐 Deployment

The application is fully deployed and ready for production:

- **Frontend**: [Vercel](https://vercel.com/)
- **Backend**: [Strapi Cloud](https://www.strapi.io/cloud)

**Live Demo**: [TasteTrove Live](https://tastetrove-mk.vercel.app/)

### Frontend Deployment on Vercel

The frontend is automatically deployed to Vercel whenever changes are pushed to the main branch. To deploy your own instance:

1. Create a Vercel account at [vercel.com](https://vercel.com/)
2. Import your GitHub repository
3. Set the root directory to `./frontend`
4. Configure environment variables:
   - `NEXT_PUBLIC_API_URL` - Your Strapi Cloud backend URL
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `GEMINI_API_KEY`
   - `UNSPLASH_ACCESS_KEY`
5. Deploy with one click

For detailed deployment instructions, see [Vercel Deployment Guide](https://vercel.com/docs/concepts/deployments/overview).

### Backend Deployment on Strapi Cloud

**Current Status**: ✅ **Deployed on Strapi Cloud**

The backend (Node.js 24, Region: Asia Southeast) is hosted on Strapi Cloud with automatic scaling and managed PostgreSQL database.

To deploy your own Strapi Cloud instance:

1. Go to [Strapi Cloud](https://cloud.strapi.io)
2. Sign in with GitHub
3. Click "Create a new project"
4. Select your repository
5. Configure:
   - **Project Name**: tastetrove (or your project name)
   - **Node.js Version**: 24 (recommended)
   - **Region**: Choose your preferred region (Asia Southeast recommended)
6. Strapi Cloud automatically provisions:
   - PostgreSQL database
   - Managed hosting
   - SSL certificate
   - Auto-scaling
7. Once deployed, get your backend URL from the Strapi Cloud dashboard
8. Update your frontend `NEXT_PUBLIC_API_URL` with the Strapi Cloud URL

**Benefits of Strapi Cloud**:
- ✅ Automatic database backups
- ✅ Built-in CDN for file uploads
- ✅ One-click deployments
- ✅ Automatic SSL certificates
- ✅ Production monitoring
- ✅ Environment management

For detailed instructions, see [Strapi Cloud Documentation](https://docs.strapi.io/cloud/getting-started).

## 🌟 Features

- **Recipe Discovery**: Browse and search recipes from multiple sources
- **AI Recipe Generator**: 🤖 Generate personalized recipe suggestions from your pantry ingredients using Google Gemini AI
- **Pantry Management**: Track and manage your kitchen ingredients
- **Recipe Saving**: Save favorite recipes for quick access
- **User Authentication**: Secure user accounts and profiles
- **Recipe Details**: View detailed recipe instructions, ingredients, and nutritional information
- **Category & Cuisine Filtering**: Explore recipes by category or cuisine type
- **Recipe Export**: Generate and export recipes as PDF
- **Responsive Design**: Fully responsive interface for desktop and mobile devices
- **Premium Features**: Pro tier with additional functionality

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) 16 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library with Shadcn UI patterns
- **State Management**: React Hooks & Server Actions
- **Authentication**: Clerk
- **Database Client**: Prisma (types generated)
- **Notifications**: Sonner Toast
- **AI Integration**: Google Generative AI (Gemini API)
- **Image Services**: Unsplash API for recipe images

### Backend
- **CMS Framework**: [Strapi](https://strapi.io/) v4
- **Database**: PostgreSQL (via Strapi)
- **Runtime**: Node.js
- **API**: RESTful API
- **Configuration**: Environment-based configuration

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- PostgreSQL 12+ (for backend)
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mk-manishkumar/tastetrove.git
cd tastetrove
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure your database connection in .env
# DATABASE_URL=postgresql://user:password@localhost:5432/tastetrove

# Run migrations
npm run strapi migrate

# Start the Strapi server
npm run develop
```

The backend API will be available at `http://localhost:1337`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.sample .env.local

# Configure environment variables (API endpoint, Clerk keys, etc.)
# NEXT_PUBLIC_API_URL=http://localhost:1337

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 📁 Project Structure

```
tastetrove/
├── backend/                 # Strapi CMS backend
│   ├── config/             # Configuration files
│   ├── src/
│   │   ├── api/           # API endpoints (pantry-item, recipe, saved-recipe)
│   │   ├── extensions/    # Extended functionality
│   │   └── index.js       # Entry point
│   ├── database/          # Database migrations
│   ├── public/            # Static files and uploads
│   └── package.json
│
└── frontend/               # Next.js frontend application
    ├── app/               # Next.js app directory
    │   ├── (auth)/       # Authentication pages
    │   ├── (main)/       # Main application pages
    │   ├── layout.tsx    # Root layout
    │   └── page.tsx      # Home page
    ├── components/        # Reusable React components
    ├── actions/          # Server actions
    ├── hooks/            # Custom React hooks
    ├── lib/              # Utility functions and helpers
    ├── public/           # Static assets
    └── package.json
```

## 🔧 Configuration

### Getting API Keys

#### Google Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Click "Get API Key"
3. Create a new API key in Google Cloud Console
4. Add it as `GEMINI_API_KEY` in your `.env.local`

#### Unsplash API Key
1. Sign up at [Unsplash Developers](https://unsplash.com/oauth/applications)
2. Create a new application
3. Copy your Access Key
4. Add it as `UNSPLASH_ACCESS_KEY` in your `.env.local`

#### Clerk Authentication Keys
1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application
3. Copy your Publishable Key and Secret Key
4. Add them to your `.env.local`

### Backend Environment Variables

Create `.env` file in the `backend` directory:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your_app_keys
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
TRANSFER_TOKEN_SALT=your_transfer_token_salt
JWT_SECRET=your_jwt_secret
DATABASE_URL=postgresql://user:password@localhost:5432/tastetrove
NODE_ENV=development
```

### Frontend Environment Variables

Create `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:1337
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

## 📝 Available Scripts

### Backend
- `npm run develop` - Start Strapi in development mode with auto-reload
- `npm run build` - Build Strapi for production
- `npm start` - Start Strapi in production mode
- `npm run strapi` - Access Strapi CLI

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## 🔑 Key Features Explained

### AI Recipe Generator
- **Smart Ingredient Recognition**: Input your available ingredients
- **Personalized Suggestions**: AI generates 5 recipes tailored to your pantry
- **Dietary Filters**: Apply dietary preferences (Vegan, Vegetarian, Gluten-Free, etc.)
- **Cuisine & Meal Type**: Specify preferred cuisine and meal type
- **Match Percentage**: See which ingredients you have (percentage match)
- **Easy Saving**: Save generated recipes to your collection with one click
- **Powered by Google Gemini**: Uses advanced AI for creative recipe suggestions
- **Auto Images**: Beautiful food images automatically fetched via Unsplash API

### Recipe Management
- Browse recipes from integrated sources
- View detailed ingredient lists and instructions
- Save recipes to personal collection
- Filter by cuisine type and category

### Pantry System
- Add ingredients to your pantry
- Track ingredient quantities and expiration dates
- Quick reference for shopping or meal planning

### User Authentication
- Secure login/signup system
- User profiles and preferences
- Saved recipes tied to user accounts

### PDF Export
- Export recipes as formatted PDF documents
- Print-friendly recipe cards

## 🐛 Troubleshooting

### Backend Issues
- Ensure PostgreSQL is running
- Check DATABASE_URL is correctly configured
- Clear Strapi cache: `rm -rf .cache`

### Frontend Issues
- Clear Next.js cache: `rm -rf .next`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Verify API URL is correctly configured

## 📚 API Documentation

The Strapi backend provides a RESTful API. Access the API documentation at `http://localhost:1337/documentation` when running in development mode.

### Main API Endpoints
- `GET /api/recipes` - Get all recipes
- `GET /api/pantry-items` - Get pantry items
- `GET /api/saved-recipes` - Get saved recipes
- `POST /api/auth/local` - User authentication

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Manish Kumar**
- GitHub: [@mk-manishkumar](https://github.com/mk-manishkumar)





# BBQ Recipes

A recipe website for BBQ enthusiasts built with Node.js, Express, and SQLite.

## Features

- **Recipe Categories**: Pork, Beef, Lamb, Chicken, and Seafood
- **Responsive Design**: Mobile-first approach with tablet and desktop layouts
- **Search**: Search recipes by title or description
- **Recipe Details**: Full recipe pages with ingredients, instructions, prep/cook times
- **Ad Integration**: Placeholder containers for Google AdSense or other ad networks
- **SQLite Database**: Lightweight, file-based database

## Tech Stack

- **Backend**: Node.js with Express.js
- **Templating**: EJS (Embedded JavaScript)
- **Database**: SQLite via better-sqlite3
- **Styling**: Vanilla CSS (mobile-first responsive design)
- **Frontend JS**: Vanilla JavaScript

## Prerequisites

- Node.js 18+ installed
- npm (comes with Node.js)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/bbq-recipes.git
   cd bbq-recipes
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` if you need to change any settings.

4. **Seed the database** (adds 100 sample recipes):
   ```bash
   npm run seed
   ```

5. **Start the server**:
   ```bash
   npm start
   ```

6. **Open in browser**:
   Visit `http://localhost:3000`

## Development

Run with auto-reload on file changes:
```bash
npm run dev
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start the production server |
| `npm run dev` | Start with nodemon (auto-reload) |
| `npm run seed` | Populate database with 100 sample recipes |
| `npm run reset-db` | Delete and reinitialize the database |

## Project Structure

```
bbq-recipes/
├── app.js                 # Express application entry point
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── .env.example           # Example environment variables
├── config/
│   ├── database.js        # SQLite connection and schema
│   └── errorHandler.js    # Global error handling middleware
├── models/
│   ├── Recipe.js          # Recipe model (CRUD operations)
│   └── Category.js        # Category model
├── routes/
│   ├── index.js           # Homepage and search routes
│   ├── recipes.js         # Recipe listing and detail routes
│   ├── store.js           # Store placeholder routes
│   └── reviews.js         # Reviews placeholder routes
├── views/
│   ├── layouts/
│   │   └── main.ejs       # Main layout template
│   ├── partials/
│   │   ├── header.ejs     # Site header with navigation
│   │   ├── footer.ejs     # Site footer
│   │   ├── recipe-card.ejs # Recipe card component
│   │   ├── ad-sidebar.ejs  # Desktop sidebar ad placeholder
│   │   └── ad-mobile.ejs   # Mobile ad placeholder
│   ├── pages/
│   │   ├── home.ejs       # Homepage
│   │   ├── store.ejs      # Store placeholder
│   │   ├── reviews.ejs    # Reviews placeholder
│   │   ├── search.ejs     # Search results
│   │   ├── 404.ejs        # Not found page
│   │   └── error.ejs      # Error page
│   └── recipes/
│       ├── index.ejs      # All recipes listing
│       ├── category.ejs   # Category recipe listing
│       └── show.ejs       # Single recipe detail
├── public/
│   ├── css/
│   │   └── styles.css     # Main stylesheet
│   ├── js/
│   │   └── main.js        # Frontend JavaScript
│   └── images/            # Static images
├── scripts/
│   ├── seed.js            # Database seeding script
│   └── reset-db.js        # Database reset script
└── database/
    └── recipes.db         # SQLite database file (created on first run)
```

## Adding Google AdSense

The template includes placeholder containers for ads. To add AdSense:

1. Sign up for Google AdSense
2. Get your ad unit code
3. Replace the placeholder content in:
   - `views/partials/ad-sidebar.ejs` (desktop sidebar ads)
   - `views/partials/ad-mobile.ejs` (mobile ads)
4. Add the AdSense script to `views/layouts/main.ejs` head section

## Responsive Breakpoints

- **Mobile**: < 768px (default, single column)
- **Tablet**: 768px - 1023px (two columns for recipes)
- **Desktop**: >= 1024px (three columns, ad sidebars visible)

## Database Schema

### Categories Table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| name | TEXT | Category name |
| slug | TEXT | URL-friendly slug |
| description | TEXT | Category description |
| created_at | DATETIME | Creation timestamp |

### Recipes Table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| title | TEXT | Recipe title |
| slug | TEXT | URL-friendly slug |
| description | TEXT | Brief description |
| ingredients | TEXT | JSON array of ingredients |
| instructions | TEXT | JSON array of instruction steps |
| prep_time | INTEGER | Prep time in minutes |
| cook_time | INTEGER | Cook time in minutes |
| servings | INTEGER | Number of servings |
| category_id | INTEGER | Foreign key to categories |
| image_url | TEXT | URL to recipe image |
| featured | INTEGER | 1 if featured, 0 otherwise |
| created_at | DATETIME | Creation timestamp |
| updated_at | DATETIME | Last update timestamp |

## Customization

### Adding New Categories
Edit `config/database.js` and add to the categories array in `initializeDatabase()`.

### Styling
All styles are in `public/css/styles.css`. CSS variables are defined at the top for easy theming.

### Adding Recipe Images
Update the `image_url` field for recipes. You can use external URLs or add images to `public/images/`.

## License

MIT License

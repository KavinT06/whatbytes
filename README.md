# Whatbytes Frontend Assignment

Modern e-commerce UI built with Next.js (App Router), React, and Tailwind CSS.

## Live Deployment

Vercel URL: ADD_YOUR_VERCEL_URL_HERE

## Implemented Features

- Home page product listing with responsive layout
- Header with logo, centered search, cart badge, and profile icon
- Sidebar filters for category, brand, and price range slider
- URL-synced filters and search query
- Product cards with rating and quick add-to-cart
- Conditional empty state when no products match filters
- Product details page at /product/[id]
- Quantity selector and add-to-cart flow on detail page
- Cart page at /cart with quantity updates, remove action, and summary
- Cart state persistence using localStorage

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- lucide-react icons

## Project Structure

- app/
	- page.jsx
	- cart/page.jsx
	- product/[id]/page.jsx
- components/
	- AppHeader.jsx
	- SidebarFilters.jsx
	- ProductCard.jsx
	- FeaturedProductCard.jsx
	- AppFooter.jsx
- context/
	- CartContext.jsx
- data/
	- products.js
- lib/
	- products.js

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Validation

```bash
npm run lint
npm run build
```

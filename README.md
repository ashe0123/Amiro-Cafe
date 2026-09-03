# 🍽️ Amiro Cafe and Restaurant - QR Digital Menu System

A modern, production-ready, **frontend-only** QR digital menu system built with Next.js, TypeScript, and Tailwind CSS. Perfect for hotels, restaurants, cafés, and similar businesses.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.x-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.x-38bdf8)

## ✨ Features

### Customer Menu (Public)
- 📱 **Mobile-First Design** - Optimized for QR code scanning on phones
- 🔍 **Fast Search** - Search menu items, ingredients, and descriptions
- 📂 **Category Filtering** - Easy navigation with horizontal scrolling categories
- 🌐 **Bilingual Support** - English and Amharic language switching
- 🖼️ **Item Details** - Full descriptions, ingredients, allergens, and pricing
- 📞 **Quick Actions** - Call, WhatsApp, and Google Maps integration
- ⚡ **Offline-Friendly** - Works after initial load with localStorage

### Admin Panel (Management)
- 📊 **Dashboard** - Overview of menu statistics and quick actions
- 🍽️ **Menu Management** - Add, edit, delete, and toggle item availability
- 📁 **Category Management** - Organize menu items into categories
- 🔄 **QR Code Generator** - Generate, preview, download, and print QR codes
- ⚙️ **Business Settings** - Configure business info, contact details, and social media
- 💾 **Data Export/Import** - Backup and restore menu data as JSON
- 🔄 **Demo Data Reset** - Restore original demo data anytime

### Technical Features
- ✅ **No Backend Required** - Pure frontend with localStorage
- 🎨 **Beautiful UI/UX** - Modern, clean, professional design
- 📦 **Easy Deployment** - Deploy to Vercel free tier
- 🔧 **Future-Ready** - Structured for easy backend integration
- 🎯 **SEO Optimized** - Proper meta tags and Open Graph support
- 🖨️ **Print Support** - Print-friendly QR codes and menus

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   cd "d:\Real\Amiro Cafe and Restaurant"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### First-Time Setup
- The app automatically loads demo data for "Amiro Cafe and Restaurant"
- Visit `/menu/amiro-cafe-restaurant` to see the customer menu
- Visit `/admin` to access the management panel

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   npm run build
   vercel
   ```

Or push to GitHub and connect to Vercel:
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Deploy automatically

### Build for Production
```bash
npm run build
npm run start
```

## 📖 Usage Guide

### For Business Owners

#### 1. Configure Your Business
1. Go to `/admin/settings`
2. Update business name, description, contact info
3. Add your social media links
4. Save changes

#### 2. Manage Menu Categories
1. Go to `/admin/categories`
2. Add/edit/delete categories
3. Enable/disable categories as needed

#### 3. Manage Menu Items
1. Go to `/admin/menu`
2. Add new items with prices, descriptions, images
3. Toggle availability (sold out items)
4. Edit or delete items as needed

#### 4. Generate QR Code
1. Go to `/admin/qr-code`
2. Download QR code as PNG
3. Print QR code poster
4. Place QR codes on tables, entrance, menus

#### 5. Backup Your Data
1. Go to `/admin/data`
2. Click "Export All Data"
3. Save the JSON file safely
4. Import anytime to restore

### For Customers

1. **Scan QR Code** with phone camera
2. **View Menu** - Browse categories and items
3. **Search** - Find specific dishes
4. **View Details** - See ingredients, allergens, pricing
5. **Contact** - Call, WhatsApp, or get directions
6. **Switch Language** - Toggle between English/Amharic

## 🗂️ Project Structure

```
├── app/
│   ├── page.tsx                 # Home page (redirects to menu)
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── menu/
│   │   └── [slug]/
│   │       └── page.tsx         # Customer menu page
│   └── admin/
│       ├── page.tsx             # Admin dashboard
│       ├── menu/page.tsx        # Menu management
│       ├── categories/page.tsx  # Category management
│       ├── qr-code/page.tsx     # QR code generator
│       ├── settings/page.tsx    # Business settings
│       └── data/page.tsx        # Data import/export
├── components/
│   ├── ui/                      # Reusable UI components
│   └── menu/                    # Menu-specific components
├── services/
│   ├── businessService.ts       # Business data management
│   ├── menuService.ts           # Menu data management
│   └── storageService.ts        # localStorage wrapper
├── types/
│   ├── business.ts              # Business type definitions
│   ├── menu.ts                  # Menu type definitions
│   └── settings.ts              # Settings type definitions
├── data/
│   └── demoData.ts              # Demo menu data
├── lib/
│   └── utils.ts                 # Utility functions
└── public/
    └── images/                  # Image assets
```

## 🔧 Customization

### For Different Businesses

1. **Update Demo Data**: Edit `data/demoData.ts`
   - Change business name
   - Modify menu items and categories
   - Update prices and descriptions

2. **Change Colors**: Edit `tailwind.config.ts`
   ```typescript
   colors: {
     primary: { /* Your brand color */ },
     secondary: { /* Your accent color */ }
   }
   ```

3. **Update Business Info**: Use admin settings page
   - `/admin/settings`

### Add Custom Images

Place images in `public/images/menu/` and update item image paths:
```typescript
image: '/images/menu/your-dish.jpg'
```

## 🔮 Future Enhancements

This system is designed to easily add:

- **Backend API** - Replace localStorage with REST API
- **Database** - PostgreSQL, MySQL, MongoDB, or Supabase
- **Authentication** - Secure admin login
- **Online Ordering** - Cart, checkout, payment gateway
- **Room Booking** - For hotels
- **Table Reservations** - For restaurants
- **Analytics** - Track popular items, customer behavior
- **Multi-location** - Support multiple branches
- **Staff Accounts** - Multiple users with roles

### Migration Path

Services are already structured for backend integration:

```typescript
// Current: localStorage
MenuService.getMenuItems()

// Future: API
MenuService.getMenuItems() // Same interface, different implementation
// Inside: return fetch('/api/menu-items')
```

## ⚠️ Important Notes

### Security Notice

This is a **frontend-only** system using localStorage:

- ✅ Perfect for demo, single-location use
- ✅ No server costs
- ❌ NOT secure for multi-user production
- ❌ Data stored locally on each device
- ❌ No synchronization between devices

**For production with multiple staff members**, add:
- Backend authentication (JWT, session-based)
- Database (PostgreSQL/MySQL/Supabase)
- API endpoints for data operations

### Data Persistence

- Data is stored in browser localStorage
- Clearing browser data will delete menu data
- **Always keep backups** using Export feature
- Data is device-specific (not synced)

## 📄 License

This project is open source and available for commercial use.

## 💬 Support

For questions or issues:
1. Check the code comments
2. Review this README
3. Inspect the demo data structure
4. Test with the included demo data

## 🌟 Features Breakdown

### Accessibility
- ✅ Mobile-responsive design
- ✅ Touch-friendly buttons
- ✅ Clear typography and spacing
- ✅ High contrast colors
- ✅ Fast loading times

### Performance
- ✅ Optimized images
- ✅ Lazy loading where appropriate
- ✅ Minimal JavaScript bundle
- ✅ Fast initial load
- ✅ Works on slow networks

### SEO
- ✅ Semantic HTML
- ✅ Meta tags
- ✅ Open Graph tags
- ✅ Descriptive page titles
- ✅ Clean URL structure

## 🎯 Use Cases

Perfect for:
- ☕ Cafés and Coffee Shops
- 🍽️ Restaurants
- 🏨 Hotels
- 🍕 Fast Food Outlets
- 🍹 Bars and Lounges
- 🥗 Food Courts
- 🏪 Small Eateries

## 📸 Screenshots

### Customer Menu
- Beautiful header with business info
- Horizontal category filtering
- Search functionality
- Item cards with images and prices
- Detailed item modal
- Quick contact actions

### Admin Panel
- Dashboard with statistics
- Menu item management
- Category organization
- QR code generator with print support
- Business settings
- Data export/import

## 🛠️ Technology Stack

- **Framework**: Next.js 15.x (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.x
- **Icons**: Lucide React
- **QR Generation**: qrcode library
- **Storage**: Browser localStorage
- **Deployment**: Vercel (recommended)

## 📝 Development

### Code Quality
- TypeScript for type safety
- Clean component structure
- Reusable UI components
- Well-documented code
- Service layer architecture

### Best Practices
- Separation of concerns
- DRY (Don't Repeat Yourself)
- Mobile-first approach
- Progressive enhancement
- Graceful error handling

---

**Built with ❤️ for Amiro Cafe and Restaurant**

Ready to use • Easy to customize • Production-ready • No backend required

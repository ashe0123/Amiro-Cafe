# 🚀 Quick Start Guide - Amiro Cafe & Restaurant

## ⚡ Get Started in 3 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
- **Customer Menu**: http://localhost:3000/menu/amiro-cafe-restaurant
- **Admin Panel**: http://localhost:3000/admin

That's it! The application is now running with demo data.

---

## 📱 For Business Owners - First Time Setup

### 1. Update Your Business Information (5 minutes)

1. Open http://localhost:3000/admin
2. Click **"Settings"**
3. Update:
   - Business name (English & Amharic)
   - Address and contact info
   - Social media links
   - Opening hours
4. Click **"Save Changes"**

### 2. Customize Your Menu (10 minutes)

#### Option A: Edit Existing Items
1. Go to **Admin → Menu Items**
2. Click **Edit** on any item
3. Update name, price, description, image
4. Toggle availability with the power button
5. Save changes

#### Option B: Start Fresh
1. Go to **Admin → Data Management**
2. **Export** current data (backup)
3. Delete unwanted items from **Menu Items**
4. Add your own items with **"Add Item"**

### 3. Generate Your QR Code (2 minutes)

1. Go to **Admin → QR Code**
2. Click **"Download PNG"** or **"Print"**
3. Place QR code on tables, menus, entrance
4. Customers can now scan and view your menu!

### 4. Share Your Menu

Your menu URL will be:
```
https://your-domain.com/menu/your-business-slug
```

Example: `https://amiro-menu.vercel.app/menu/amiro-cafe-restaurant`

---

## 🎨 Quick Customization

### Change Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    500: '#your-primary-color', // Main brand color
    600: '#darker-shade',
  },
}
```

### Add Your Logo

1. Place logo image in `public/images/logo.png`
2. Update in **Admin → Settings**

### Add Menu Item Images

1. Place images in `public/images/menu/`
2. Example: `public/images/menu/pizza.jpg`
3. Reference in menu items: `/images/menu/pizza.jpg`

---

## 📦 Deploy to Vercel (5 minutes)

### Method 1: GitHub (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **"New Project"**
4. Import your GitHub repository
5. Click **"Deploy"**
6. Done! Your URL: `your-project.vercel.app`

### Method 2: Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 💾 Backup Your Data (IMPORTANT!)

### Create Backup
1. Go to **Admin → Data Management**
2. Click **"Export All Data"**
3. Save the JSON file somewhere safe (Google Drive, email, etc.)

### Restore Backup
1. Go to **Admin → Data Management**
2. Click **"Choose File to Import"**
3. Select your backup JSON file
4. Confirm import

**💡 Tip**: Export data regularly! localStorage can be cleared.

---

## 🔄 Common Tasks

### Add a New Menu Category
1. Admin → Categories → **"Add Category"**
2. Enter category name (English & Amharic)
3. Choose emoji icon
4. Set display order
5. Save

### Mark Item as Sold Out (Temporarily Unavailable)
1. Admin → Menu Items
2. Find the item
3. Click the **power icon** (⚡)
4. Item is now hidden from customers
5. Click again to make it available

### Change Language on Customer Menu
- Click the **Globe** icon (🌐) in top right
- Toggle between English and Amharic

---

## 🆘 Troubleshooting

### Menu not loading?
- Check browser console (F12)
- Clear browser cache
- Try incognito mode

### Lost your data?
- Import from your last backup (Admin → Data)
- Or reset to demo data

### QR code not working?
- Make sure URL is correct
- Test QR code with phone camera
- Check if site is deployed and accessible

### Build errors?
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Or
npm install --legacy-peer-deps
```

---

## 📞 Need Help?

1. Check the main `README.md` for detailed documentation
2. Review the code comments for implementation details
3. Check demo data in `data/demoData.ts` for examples

---

## ✅ Pre-Launch Checklist

Before going live:

- [ ] Update business name and description
- [ ] Add all menu items with correct prices
- [ ] Upload high-quality food images
- [ ] Set correct opening hours
- [ ] Add phone number, email, address
- [ ] Test QR code scanning
- [ ] Export backup of your data
- [ ] Test on mobile device
- [ ] Check all links work (maps, whatsapp, etc.)
- [ ] Deploy to production
- [ ] Print QR codes
- [ ] Train staff on marking items unavailable

---

## 🎯 Next Steps

Once you're comfortable:

1. **Customize Colors**: Match your brand
2. **Add More Items**: Build your full menu
3. **Update Categories**: Organize by meal type
4. **Print Materials**: QR codes for tables
5. **Monitor Usage**: Watch which items are popular
6. **Regular Backups**: Export data weekly
7. **Plan Backend**: When ready for multi-user access

---

**You're all set! 🎉**

Start with the demo data, customize it step by step, and you'll have a professional digital menu in no time.

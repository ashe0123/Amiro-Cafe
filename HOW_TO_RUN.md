# 🏃‍♂️ How to Run - Amiro Cafe & Restaurant QR Menu System

## Prerequisites
- Node.js 18.x or later installed
- npm (comes with Node.js)

## Step-by-Step Instructions

### 1. Open Terminal/Command Prompt

**Windows**: 
- Press `Win + R`
- Type `cmd` or `powershell`
- Press Enter

**Mac/Linux**:
- Press `Cmd + Space`
- Type `terminal`
- Press Enter

### 2. Navigate to Project Directory

```bash
cd "d:\Real\Amiro Cafe and Restaurant"
```

### 3. Install Dependencies (First Time Only)

```bash
npm install
```

⏳ This will take 2-3 minutes to download all required packages.

### 4. Start Development Server

```bash
npm run dev
```

✅ You should see:
```
- Local:        http://localhost:3000
- Ready in X ms
```

### 5. Open in Browser

Open your web browser and visit:

**Customer Menu (Public)**:
```
http://localhost:3000/menu/amiro-cafe-restaurant
```

**Admin Panel (Management)**:
```
http://localhost:3000/admin
```

## 📱 Testing on Mobile Phone

### Option 1: Same WiFi Network

1. Find your computer's IP address

   **Windows**:
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., 192.168.1.100)

   **Mac/Linux**:
   ```bash
   ifconfig
   ```
   Look for "inet" address

2. On your phone's browser:
   ```
   http://YOUR-IP-ADDRESS:3000/menu/amiro-cafe-restaurant
   ```
   Example: `http://192.168.1.100:3000/menu/amiro-cafe-restaurant`

### Option 2: Deploy and Test

Deploy to Vercel (see DEPLOYMENT.md) and test the live URL.

## 🛑 Stop the Server

Press `Ctrl + C` in the terminal where the server is running.

## 🔄 Restart the Server

```bash
npm run dev
```

## 🏗️ Build for Production

Test production build locally:

```bash
# Build
npm run build

# Start production server
npm run start
```

Then visit `http://localhost:3000`

## ⚙️ Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Check code quality |

## 🐛 Common Issues

### Port 3000 Already in Use

**Error**: `Port 3000 is already in use`

**Solution**: Use a different port
```bash
PORT=3001 npm run dev
```

Then visit `http://localhost:3001`

### Module Not Found Error

**Error**: `Cannot find module 'xyz'`

**Solution**: Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

**Error**: Build fails with errors

**Solution**: Check Node.js version
```bash
node --version
```

Should be 18.x or later. Update Node.js if needed.

## 📂 Project Structure Quick Reference

```
├── app/
│   ├── page.tsx              # Home (redirects to menu)
│   ├── menu/[slug]/          # Customer menu page
│   └── admin/                # Admin panel
│       ├── page.tsx          # Dashboard
│       ├── menu/             # Menu management
│       ├── categories/       # Category management
│       ├── qr-code/          # QR generator
│       ├── settings/         # Business settings
│       └── data/             # Import/Export
├── components/               # Reusable components
├── services/                 # Data management
├── data/                     # Demo data
└── public/                   # Static files
```

## 🔗 Important URLs

After starting the server:

| Page | URL |
|------|-----|
| Customer Menu | http://localhost:3000/menu/amiro-cafe-restaurant |
| Admin Dashboard | http://localhost:3000/admin |
| Menu Management | http://localhost:3000/admin/menu |
| Categories | http://localhost:3000/admin/categories |
| QR Code | http://localhost:3000/admin/qr-code |
| Settings | http://localhost:3000/admin/settings |
| Data Backup | http://localhost:3000/admin/data |

## 🎯 Quick Start Checklist

- [ ] Node.js installed (check with `node --version`)
- [ ] Navigate to project directory
- [ ] Run `npm install` (first time only)
- [ ] Run `npm run dev`
- [ ] Open `http://localhost:3000/admin` in browser
- [ ] See Amiro Cafe demo data loaded
- [ ] Start customizing!

## 💡 Tips

1. **Keep Terminal Open**: Don't close the terminal while using the app
2. **Auto Refresh**: Changes to code automatically refresh the browser
3. **Multiple Browsers**: You can open the app in multiple browser tabs
4. **Mobile Testing**: Use your phone on same WiFi to test mobile experience
5. **Data Persists**: Changes are saved in browser localStorage

## 📖 Next Steps

1. **Customize**: Go to Admin → Settings
2. **Add Items**: Go to Admin → Menu Items
3. **Generate QR**: Go to Admin → QR Code
4. **Backup Data**: Go to Admin → Data Management
5. **Deploy**: Follow DEPLOYMENT.md when ready

## 🆘 Need Help?

1. Check this file again
2. Read QUICKSTART.md for usage guide
3. Read README.md for full documentation
4. Check code comments in files

---

**Ready to go! 🚀**

Just run `npm run dev` and start building your menu!

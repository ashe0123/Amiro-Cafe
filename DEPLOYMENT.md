# 🚀 Deployment Guide

## Vercel Deployment (Recommended - FREE)

Vercel is the easiest and recommended way to deploy this Next.js application.

### Method 1: GitHub Integration (Best for Continuous Deployment)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Amiro Menu System"
   git branch -M main
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click **"New Project"**
   - Import your repository
   - Configure:
     - Framework Preset: **Next.js** (auto-detected)
     - Build Command: `npm run build` (auto-detected)
     - Output Directory: `.next` (auto-detected)
   - Click **"Deploy"**
   - Wait 2-3 minutes ⏳
   - Done! Your site is live at `your-project.vercel.app`

3. **Custom Domain** (Optional)
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

### Method 2: Vercel CLI (Quick Deploy)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Project name
# - Deploy to: production
# - Wait for deployment

# Your URL will be shown: https://your-project.vercel.app
```

---

## Netlify Deployment (Alternative - FREE)

### Via Git Integration

1. **Push to GitHub** (see above)

2. **Deploy on Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click **"Add new site"** → **"Import an existing project"**
   - Connect to GitHub
   - Select your repository
   - Configure:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click **"Deploy site"**

### Via Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

---

## Manual Deployment (Any Static Host)

### Build Static Export

1. **Update next.config.ts** for static export:
```typescript
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
```

2. **Build**
```bash
npm run build
```

3. **Upload** the `out/` folder to:
   - GitHub Pages
   - Cloudflare Pages
   - AWS S3 + CloudFront
   - Any static hosting

---

## Environment Variables

This project doesn't require environment variables for basic operation, but for future backend integration:

### Create `.env.local`
```env
# Future API endpoints
NEXT_PUBLIC_API_URL=https://api.yourdomain.com

# Future database
DATABASE_URL=your-database-connection-string

# Future authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://yourdomain.com
```

### Add to Vercel/Netlify
- Go to Project Settings → Environment Variables
- Add each variable
- Redeploy

---

## Post-Deployment Checklist

### 1. Test Everything
- [ ] Visit your deployed URL
- [ ] Test customer menu: `/menu/amiro-cafe-restaurant`
- [ ] Test admin panel: `/admin`
- [ ] Test on mobile device
- [ ] Test QR code scanning
- [ ] Check all links (phone, email, maps, social media)
- [ ] Test search and filters
- [ ] Test language switching

### 2. Update Business Info
- [ ] Go to `/admin/settings`
- [ ] Update business name
- [ ] Update contact information
- [ ] Update social media links
- [ ] Save changes

### 3. Generate Production QR Code
- [ ] Go to `/admin/qr-code`
- [ ] Download QR code with production URL
- [ ] Print QR codes (multiple copies)
- [ ] Test scanning with different phones

### 4. Backup Strategy
- [ ] Export initial data
- [ ] Store backup in cloud (Google Drive, Dropbox)
- [ ] Set reminder for weekly backups
- [ ] Document backup location

### 5. Train Staff
- [ ] Show how to mark items unavailable
- [ ] Show how to update prices
- [ ] Show how to add new items
- [ ] Share admin URL and access instructions

---

## Custom Domain Setup

### Vercel Custom Domain

1. **Add Domain**
   - Project Settings → Domains
   - Enter your domain: `menu.yourdomain.com`
   - Add

2. **Configure DNS**
   
   **Option A: CNAME (Subdomain)**
   ```
   Type: CNAME
   Name: menu
   Value: cname.vercel-dns.com
   ```
   
   **Option B: A Record (Root Domain)**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

3. **Wait for DNS** (can take up to 48 hours, usually 10-30 minutes)

4. **SSL** is automatically configured by Vercel

### Netlify Custom Domain

1. **Add Domain**
   - Site Settings → Domain Management
   - Add custom domain
   - Enter your domain

2. **Configure DNS** (similar to Vercel)

3. **Enable HTTPS** (automatic with Let's Encrypt)

---

## Performance Optimization

### After Deployment

1. **Enable Caching**
   - Already configured for Vercel/Netlify
   - No action needed

2. **Image Optimization**
   - Compress images before uploading
   - Use WebP format when possible
   - Recommended size: 1200x800px for menu items

3. **Monitor Performance**
   - Use [PageSpeed Insights](https://pagespeed.web.dev/)
   - Check mobile score
   - Follow recommendations

---

## Scaling for Production

### When to Add Backend

Add a backend when:
- Multiple staff members need access
- Need to sync data across devices
- Want online ordering
- Need customer accounts
- Require analytics

### Recommended Stack

**Option 1: Supabase (Easy)**
- Free tier available
- PostgreSQL database
- Built-in authentication
- Real-time subscriptions
- Easy to integrate

**Option 2: Next.js API + PostgreSQL**
- API Routes in Next.js
- Vercel Postgres
- Prisma ORM
- NextAuth for authentication

**Option 3: Separate Backend**
- Node.js + Express
- MongoDB/PostgreSQL
- JWT authentication
- Deploy on Railway/Render

---

## Troubleshooting Deployment

### Build Fails

**Error: Out of memory**
```bash
# Increase Node memory
NODE_OPTIONS="--max_old_space_size=4096" npm run build
```

**Error: Module not found**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Site is Slow

1. **Check image sizes**
   - Compress images
   - Use appropriate formats

2. **Check bundle size**
   ```bash
   npm run build
   # Check bundle sizes in output
   ```

3. **Enable compression**
   - Already enabled on Vercel/Netlify

### QR Code Not Working

1. **Check URL**
   - Must be accessible publicly
   - Test in incognito mode

2. **Regenerate QR Code**
   - Use production URL
   - Download new QR code

3. **Test Scanner**
   - Try different QR code apps
   - Some phone cameras need QR feature enabled

---

## Security Best Practices

### Frontend-Only Limitations

Current system:
- ✅ Perfect for single-location use
- ✅ No server costs
- ❌ Data is local to each device
- ❌ No multi-user access control
- ❌ Admin panel is not password-protected

### For Production Security

When adding backend:
1. **Authentication**
   - Use JWT or session-based auth
   - Implement role-based access (admin, staff, etc.)
   - Use HTTPS only

2. **API Security**
   - Rate limiting
   - Input validation
   - SQL injection prevention
   - XSS protection

3. **Data Protection**
   - Regular backups
   - Database encryption
   - Secure password storage

---

## Monitoring & Analytics

### Free Tools

1. **Vercel Analytics**
   - Built-in with Vercel
   - Page views, performance
   - Enable in project settings

2. **Google Analytics**
   - Add GA4 tracking code
   - Monitor user behavior
   - Track popular menu items

3. **Sentry** (Error Tracking)
   - Free tier available
   - Track JavaScript errors
   - Monitor performance issues

---

## Support & Maintenance

### Regular Tasks

**Daily**
- Check for sold-out items
- Update availability as needed

**Weekly**
- Export data backup
- Review popular items
- Update seasonal items

**Monthly**
- Check for updates
- Review analytics
- Update prices if needed

**Quarterly**
- Review full menu
- Update photos
- Refresh QR codes if needed

---

## Cost Breakdown

### Free Tier (Perfect for Small Business)

- **Hosting**: Vercel/Netlify - FREE
- **Domain**: $10-15/year (optional)
- **SSL**: FREE (automatic)
- **Total**: $0-15/year

### With Backend (When Scaling)

- **Hosting**: Still FREE (Vercel)
- **Database**: Supabase FREE tier (500MB, 2GB bandwidth)
- **Domain**: $10-15/year
- **Total**: $10-15/year

### Premium (High Traffic)

- **Hosting**: Vercel Pro - $20/month
- **Database**: Supabase Pro - $25/month
- **CDN**: Included
- **Total**: $45/month

---

**You're ready to deploy! 🚀**

Start with Vercel free tier, and scale as your business grows.

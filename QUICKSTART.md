# 🚀 ATAP Demo - Azure Deployment Quick Start

## ✅ Your deployment package is ready!

**File:** `atap-demo-deploy.zip` (13 MB)

This ZIP contains everything needed to deploy to Azure Portal.

---

## 🎯 Fastest Way to Deploy (10 minutes)

### 1. Go to Azure Portal
👉 https://portal.azure.com

### 2. Create Resource Group
- Click **Resource groups** (left sidebar)
- Click **+ Create**
- **Name:** `atap-demo-rg`
- **Region:** West Europe
- Click **Review + Create** → **Create**

### 3. Create App Service
- Click **+ Create a resource**
- Search: **App Service**
- Click **Create**

**Fill these fields:**
```
Name:           atap-demo (must be unique)
Publish:        Code
Runtime:        Node 18 LTS
OS:             Linux
Region:         West Europe
App Service Plan: Create new "atap-demo-plan" (B1 tier)
```

- Click **Review + Create** → **Create**
- Wait 2-3 minutes for deployment

### 4. Deploy Your App
When deployment finishes:

1. Click **Go to resource**
2. Left menu → **Deployment Center**
3. Select **Local Git** (dropdown)
4. Click **Save**
5. Scroll down to **Local Git/FTPS credentials**
6. Copy the **Git Clone URL**

**OR Use Zip Deploy (Easier):**

1. Left menu → **Deployment Center**
2. Click **Local Git** then **Save**
3. Click upload button for **ZIP Deploy**
4. Upload the **atap-demo-deploy.zip** file
5. Wait for deployment (2-5 minutes)

### 5. Access Your App
- Go to App Service **Overview** tab
- Find **Default domain** URL
- Click the link (should look like: `https://atap-demo.azurewebsites.net`)
- Your app loads! 🎉

---

## 📋 What's Included in the ZIP

✅ All app files (pre-built, no build needed)
✅ serve.js (Node.js server)
✅ package.json (dependencies)
✅ web.config (Azure IIS routing)
✅ Dockerfile (optional - for containers)
✅ Documentation

---

## 🆘 If It Doesn't Work

**Blank page or errors?**

1. Click **Log stream** in App Service
2. Watch for startup messages
3. Wait 2-3 minutes and refresh
4. If still broken, check **Configuration** and add:
   - `PORT` = `8080`
   - `NODE_ENV` = `production`
5. Click **Save** and **Restart** app

**App service already exists?**

If you get an error that `atap-demo` already exists:
- Use a different name like `atap-demo-2`, `atap-demo-prod`, etc.

---

## 💡 Expected Result

You should see:
- ✓ "Amadeus Travel Advertising Platform" title
- ✓ Left sidebar with navigation menu
- ✓ Demo advertiser data (Four Seasons, Marriott, etc.)
- ✓ Performance metrics table

If you see this, deployment is successful! 🎉

---

## 📖 Need More Help?

- **Detailed guide:** See `AZURE_PORTAL_DEPLOYMENT.md`
- **Command line option:** See `AZURE_DEPLOYMENT.md`
- **Docker option:** Use the included `Dockerfile`

---

## 🗑️ Cleanup (Stop Charges)

To delete everything:

1. Go to **Resource groups**
2. Click **atap-demo-rg**
3. Click **Delete resource group**
4. Confirm deletion

This removes all resources and stops any charges.

---

**Ready? Start with step 1 above!** ☝️

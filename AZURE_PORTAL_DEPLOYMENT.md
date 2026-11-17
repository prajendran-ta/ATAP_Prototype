# ATAP Demo - Azure Portal Deployment Guide

This guide explains how to deploy the ATAP Demo directly from Azure Portal without using the command line.

## ✅ Prerequisites

- Azure subscription access
- Web browser
- This folder with all files

## 📋 Step-by-Step Deployment

### Step 1: Access Azure Portal

1. Go to [Azure Portal](https://portal.azure.com)
2. Sign in with your Amadeus account
3. Select your **sbx-sdx-amadeusadvertising-atap** subscription

### Step 2: Create a Resource Group

1. Click **Create a resource** (top left)
2. Search for **Resource Group**
3. Click **Create**
4. Fill in:
   - **Resource Group Name**: `atap-demo-rg`
   - **Region**: `West Europe`
5. Click **Review + Create** → **Create**

Wait for the resource group to be created.

### Step 3: Create App Service

1. Go to your new **atap-demo-rg** resource group
2. Click **+ Create**
3. Search for **App Service**
4. Click **Create**

**Fill in the form:**

| Field | Value |
|-------|-------|
| **Name** | `atap-demo` (or unique name) |
| **Publish** | Code |
| **Runtime stack** | Node 18 LTS |
| **Operating System** | Linux |
| **Region** | West Europe |
| **App Service Plan** | Create new: `atap-demo-plan` (B1 Basic tier) |
| **Pricing plan** | B1 (Basic) |

5. Click **Review + Create** → **Create**

Wait for the App Service to be deployed (2-3 minutes).

### Step 4: Deploy Your Code via ZIP

1. When deployment completes, click **Go to resource**
2. In the left menu, click **Deployment Center**
3. Select **Local Git**
4. Click **Save**
5. Copy the Git clone URL (you'll use this)

**Alternative: Use ZIP Deploy (Easier)**

1. Still in **Deployment Center**, select **Local Git** then **Save**
2. Click on the **Local Git/FTPS credentials** section to expand it
3. Copy the **Git Clone Url**

Actually, easier method - use **Zip Deploy**:

1. Go to **Deployment** → **Deployment Center**
2. Choose **Manual deployment** 
3. Select **ZIP Deploy**
4. Download and prepare the ZIP file (see Step 5)

### Step 5: Create Deployment ZIP

This folder already contains everything needed. The ZIP file includes:
- ✅ All app files (HTML, CSS, JavaScript bundles)
- ✅ serve.js (Node server)
- ✅ package.json (dependencies declaration)
- ✅ web.config (IIS routing configuration)

**To create the ZIP for deployment:**

**On macOS/Linux:**
```bash
cd /Users/aco_prajendran/Documents/ATAP\ Demo
zip -r atap-demo-deploy.zip . \
  -x "*.git*" "*.md" "*.sh" "*.txt" "node_modules/*" ".azure/*"
```

**Or on Windows:**
1. Right-click the ATAP Demo folder
2. Send to → Compressed folder
3. Rename to `atap-demo-deploy.zip`

### Step 6: Upload and Deploy

1. In Azure Portal, go to your App Service
2. Click **Deployment Center** (left menu)
3. Click **Upload ZIP** or drag-and-drop your ZIP file
4. Azure will extract and start the app

### Step 7: Access Your App

Once deployment completes:

1. Go to your App Service overview page
2. Find the **Default domain** URL (looks like: `https://atap-demo.azurewebsites.net`)
3. Click it or copy-paste into browser
4. Your app should load! 🎉

## 🔧 Application Settings (Optional)

If the app doesn't start:

1. Go to **App Service** → **Configuration**
2. Add these **Application settings**:
   - `PORT`: `8080`
   - `NODE_ENV`: `production`
3. Click **Save** and restart the app

## 📊 Monitoring

To view app logs and status:

1. Go to your App Service
2. Click **Log stream** (left menu)
3. Watch for any errors during startup
4. Check **Application Insights** if enabled for detailed metrics

## ✅ Verification

Your app is working if you can see:
- ✓ Page loads without blank screen
- ✓ Amadeus Travel Advertising Platform title appears
- ✓ Sidebar navigation menu is visible
- ✓ Demo advertiser data loads

## 🆘 Troubleshooting

**App shows "App Service Application Error"**
- Wait 2-3 minutes after deployment
- Check Application settings (PORT=8080)
- Restart the app via Overview → Restart

**Blank white page**
- Check Log stream for JavaScript errors
- Verify web.config is deployed (should handle client routes)
- Restart the app

**Files not found (404)**
- Ensure all files were included in ZIP
- Check that web.config is in root directory
- Redeploy with the ZIP file

## 🗑️ Cleanup

To delete everything and stop charges:

1. Go to your **Resource Group** (atap-demo-rg)
2. Click **Delete resource group**
3. Type the resource group name to confirm
4. Click **Delete**

This removes the App Service Plan and App Service.

## 📱 Direct File Upload Alternative

If ZIP deploy doesn't work:

1. Use **FTPS credentials** from Deployment Center
2. Connect via SFTP/FTPS client (FileZilla, etc.)
3. Upload all files to `/site/wwwroot`
4. Restart the app

---

**Questions?** Check the AZURE_DEPLOYMENT.md file for more options.

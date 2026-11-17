# ATAP Demo - Deployment to New Azure App Service

## ✅ Current Status

**Completed:**
- ✅ New Azure App Service created: `amadeus-advertising-atap`
- ✅ Deployment package ready: `atap-demo-deploy.zip` (13.48 MB)
- ✅ Resource group: `atap-demo-rg` (West Europe)
- ✅ App Service Plan: `ASP-atapdemorg-9740` (B1 - Basic)

**Next Step:**
Deploy the application code to the app service

---

## 🚀 Deployment Options

### Option A: Azure Portal (Recommended)

The app service is currently provisioning. DNS entries may take 5-10 minutes to become active.

1. **Open Azure Portal:**
   - Go to: https://portal.azure.com
   - Search for: `amadeus-advertising-atap`
   - Click on the app service to open it

2. **Navigate to Deployment Center:**
   - In the left menu under "Deployment", click **"Deployment Center"**
   - This will open the deployment configuration page

3. **Deploy the ZIP file:**
   - Look for an option like "Deploy code" or "Config-zip"
   - Upload the file: `atap-demo-deploy.zip`
   - Or provide the file path and let Azure deploy it
   - Click "Deploy" and wait for completion

4. **Verify:**
   - Go back to Overview
   - Click the app URL: `https://amadeus-advertising-atap.azurewebsites.net/`
   - You should see the ATAP Demo application

---

### Option B: Azure CLI (Once Service is Ready)

```bash
# Navigate to the deployment directory
cd "/Users/aco_prajendran/Documents/ATAP Demo"

# Log in to Azure (if needed)
az login --use-device-code

# Deploy the ZIP file
az webapp deployment source config-zip \
  --resource-group atap-demo-rg \
  --name amadeus-advertising-atap \
  --src atap-demo-deploy.zip

# View deployment logs
az webapp log tail --resource-group atap-demo-rg --name amadeus-advertising-atap
```

---

### Option C: Kudu Direct Upload (Once Service is Ready)

```bash
# Once the Kudu service is available, you can upload directly
# The Kudu URL will be: https://amadeus-advertising-atap.scm.azurewebsites.net

# Use the deployment API
curl -X POST -H "Content-Type: application/zip" \
  --data-binary @atap-demo-deploy.zip \
  https://[username]:[password]@amadeus-advertising-atap.scm.azurewebsites.net/api/zipdeploy
```

---

## 📊 Service Details

| Item | Value |
|------|-------|
| **App Service Name** | amadeus-advertising-atap |
| **Resource Group** | atap-demo-rg |
| **Region** | West Europe |
| **App Service Plan** | ASP-atapdemorg-9740 (B1) |
| **Runtime** | Node.js 24 LTS |
| **Target URL** | https://amadeus-advertising-atap.azurewebsites.net/ |
| **Kudu URL** | https://amadeus-advertising-atap.scm.azurewebsites.net |

---

## ⏱️ Timing

The app service was created at 14:30 UTC. Infrastructure provisioning typically takes:
- **1-3 minutes** for the service to be created
- **5-10 minutes** for DNS to propagate globally
- **1-2 minutes** for code deployment once the service is ready

**Current time:** 15:04 UTC
**Estimated ready time:** 15:35-15:40 UTC

---

## ✅ Verification Checklist

After deployment:

- [ ] App Service shows as "Running" in Azure Portal
- [ ] DNS resolves: `nslookup amadeus-advertising-atap.azurewebsites.net`
- [ ] App loads: `https://amadeus-advertising-atap.azurewebsites.net/`
- [ ] Toggle feature works
- [ ] All pages load correctly

---

## 🔗 Old App Service

For reference, the old app service is still running at:
- **URL:** https://atap-demo-dcazbnhvhne7bpdg.westeurope-01.azurewebsites.net/
- **App Service:** `atap-demo`

You can delete it later to avoid extra costs if the new one works correctly.

---

## 📝 Notes

- The deployment package contains the full Node.js application with all dependencies
- No additional configuration is needed
- The app will start automatically after deployment
- Logs can be viewed in Azure Portal under "Log stream"


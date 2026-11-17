# ATAP Demo - Azure Deployment Guide

This guide explains how to deploy the ATAP Demo to Azure.

## Deployment Options

### Option 1: Azure App Service (Recommended - Easiest)

**Prerequisites:**
- Azure CLI installed (`az` command)
- Logged in to Azure: `az login`

**Steps:**

1. Create a resource group:
   ```bash
   az group create --name atap-demo-rg --location westeurope
   ```

2. Create an App Service Plan:
   ```bash
   az appservice plan create --name atap-demo-plan --resource-group atap-demo-rg --sku B1 --is-linux
   ```

3. Create the Web App:
   ```bash
   az webapp create --resource-group atap-demo-rg --plan atap-demo-plan --name atap-demo --runtime "NODE|18-lts"
   ```

4. Deploy the files (using ZIP deploy):
   ```bash
   # Create a ZIP file of the project
   zip -r atap-demo.zip . -x "*.git*"
   
   # Deploy to Azure
   az webapp deployment source config-zip --resource-group atap-demo-rg --name atap-demo --src atap-demo.zip
   ```

5. Access your app at: `https://atap-demo.azurewebsites.net`

### Option 2: Azure Container Instances (Using Docker)

**Prerequisites:**
- Docker installed
- Azure Container Registry or Docker Hub account
- Azure CLI installed

**Steps:**

1. Build the Docker image:
   ```bash
   docker build -t atap-demo:latest .
   ```

2. Tag and push to registry (example with Docker Hub):
   ```bash
   docker tag atap-demo:latest yourusername/atap-demo:latest
   docker push yourusername/atap-demo:latest
   ```

3. Deploy to Azure Container Instances:
   ```bash
   az container create \
     --resource-group atap-demo-rg \
     --name atap-demo \
     --image yourusername/atap-demo:latest \
     --port 8080 \
     --environment-variables PORT=8080 \
     --dns-name-label atap-demo
   ```

4. Access your app at: `http://atap-demo.[region].azurecontainers.io:8080`

### Option 3: Manual Deployment via Azure Portal

1. Go to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource" → Search for "App Service"
3. Create new App Service with:
   - Name: `atap-demo`
   - Runtime: Node 18 LTS
   - Region: West Europe
4. After creation, go to Deployment Center
5. Choose "Local Git" or "GitHub" and push/deploy your files
6. Add App Settings (if needed):
   - PORT: 8080
   - NODE_ENV: production

## Configuration

The app listens on port 8080 by default in Azure (can be changed via PORT environment variable).

## Important Notes

- The index.html has been patched with a process polyfill to work in browser
- No dependencies to install (all JavaScript is pre-built)
- Uses Node.js 18 LTS (or 14+)
- Stateless - localStorage used for client-side state

## Monitoring

After deployment, you can:
- View logs: `az webapp log tail --resource-group atap-demo-rg --name atap-demo`
- Check app health in Azure Portal under your App Service

## Clean Up

To delete all resources:
```bash
az group delete --name atap-demo-rg --yes
```

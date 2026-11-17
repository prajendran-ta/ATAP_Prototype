#!/bin/bash

# ATAP Demo - Azure Deployment Script
# Usage: ./deploy-to-azure.sh

set -e

RESOURCE_GROUP="atap-demo-rg"
APP_NAME="atap-demo"
REGION="westeurope"
APP_PLAN="atap-demo-plan"

echo "🚀 Deploying ATAP Demo to Azure..."
echo ""

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI not found. Please install it first:"
    echo "   https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
fi

# Check if logged in
if ! az account show &> /dev/null; then
    echo "🔐 You need to log in to Azure first"
    az login
fi

echo "✅ Creating resource group: $RESOURCE_GROUP"
az group create --name $RESOURCE_GROUP --location $REGION 2>/dev/null || echo "   (Group already exists)"

echo "✅ Creating App Service Plan: $APP_PLAN"
az appservice plan create \
    --name $APP_PLAN \
    --resource-group $RESOURCE_GROUP \
    --sku B1 \
    --is-linux 2>/dev/null || echo "   (Plan already exists)"

echo "✅ Creating Web App: $APP_NAME"
az webapp create \
    --resource-group $RESOURCE_GROUP \
    --plan $APP_PLAN \
    --name $APP_NAME \
    --runtime "NODE|18-lts" 2>/dev/null || echo "   (App already exists)"

echo "✅ Creating deployment package..."
ZIP_FILE="atap-demo-$(date +%s).zip"
zip -r "$ZIP_FILE" . \
    -x "*.git*" "*.md" "*.sh" "$ZIP_FILE" "node_modules/*" > /dev/null 2>&1

echo "✅ Deploying to Azure (this may take 1-2 minutes)..."
az webapp deployment source config-zip \
    --resource-group $RESOURCE_GROUP \
    --name $APP_NAME \
    --src "$ZIP_FILE"

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📍 Your app is available at: https://$APP_NAME.azurewebsites.net"
echo ""
echo "📋 View logs:"
echo "   az webapp log tail --resource-group $RESOURCE_GROUP --name $APP_NAME"
echo ""
echo "🗑️  Clean up:"
echo "   az group delete --name $RESOURCE_GROUP --yes"
echo ""

# Clean up ZIP file
rm "$ZIP_FILE"

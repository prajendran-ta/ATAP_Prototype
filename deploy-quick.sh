#!/bin/bash

# Quick deployment script for amadeus-advertising-atap
# This script deploys the application code to the Azure App Service

set -e

RESOURCE_GROUP="atap-demo-rg"
APP_NAME="amadeus-advertising-atap"
ZIP_FILE="atap-demo-deploy.zip"

echo "🚀 Deploying ATAP Demo to: $APP_NAME"
echo ""

# Check if zip file exists
if [ ! -f "$ZIP_FILE" ]; then
    echo "❌ Error: $ZIP_FILE not found!"
    exit 1
fi

echo "✅ Deployment package found: $ZIP_FILE"
echo "   Size: $(du -h "$ZIP_FILE" | cut -f1)"
echo ""

# Check if Azure CLI is installed
if ! python3 -m azure.cli --version &> /dev/null; then
    echo "❌ Azure CLI not available"
    echo "   Try: python3 -m pip install azure-cli"
    exit 1
fi

echo "🔐 Checking Azure login..."
if ! python3 -m azure.cli account show &> /dev/null 2>&1; then
    echo "   Logging in to Azure..."
    python3 -m azure.cli login --use-device-code
fi

echo ""
echo "📦 Deploying ZIP file to App Service..."
python3 -m azure.cli webapp deployment source config-zip \
    --resource-group $RESOURCE_GROUP \
    --name $APP_NAME \
    --src "$ZIP_FILE" 2>&1 | grep -v "WARNING\|NotOpenSSL" || true

echo ""
echo "✅ Deployment initiated!"
echo ""
echo "📍 App URL: https://$APP_NAME.azurewebsites.net/"
echo ""
echo "📋 Check deployment status:"
echo "   python3 -m azure.cli webapp deployment show --resource-group $RESOURCE_GROUP --name $APP_NAME"
echo ""
echo "📊 View live logs:"
echo "   python3 -m azure.cli webapp log tail --resource-group $RESOURCE_GROUP --name $APP_NAME"
echo ""

#!/bin/bash

# ATAP Demo - Azure Deployment Script (New App Service)
# Creates a new App Service with the custom domain name: amadeus-advertising-atap

set -e

RESOURCE_GROUP="atap-demo-rg"
APP_NAME="amadeus-advertising-atap"
REGION="westeurope"
APP_PLAN="ASP-atapdemorg-9740"  # Reuse existing plan

echo "🚀 Deploying ATAP Demo to Azure (New App Service)..."
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

echo "✅ Checking resource group: $RESOURCE_GROUP"
az group show --name $RESOURCE_GROUP > /dev/null 2>&1 || {
    echo "   Creating resource group..."
    az group create --name $RESOURCE_GROUP --location $REGION
}

echo "✅ Checking App Service Plan: $APP_PLAN"
az appservice plan show --resource-group $RESOURCE_GROUP --name $APP_PLAN > /dev/null 2>&1 || {
    echo "   Plan not found. Creating App Service Plan: $APP_PLAN"
    az appservice plan create \
        --name $APP_PLAN \
        --resource-group $RESOURCE_GROUP \
        --sku B1 \
        --is-linux
}

echo "✅ Creating Web App: $APP_NAME"
az webapp create \
    --resource-group $RESOURCE_GROUP \
    --plan $APP_PLAN \
    --name $APP_NAME \
    --runtime "NODE|18-lts" || echo "   (App might already exist)"

echo "✅ Deploying using existing deployment package..."
# Use the pre-built deployment package
az webapp deployment source config-zip \
    --resource-group $RESOURCE_GROUP \
    --name $APP_NAME \
    --src "atap-demo-deploy.zip"

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📍 Your app is now available at: https://$APP_NAME.azurewebsites.net"
echo ""
echo "📋 View logs:"
echo "   az webapp log tail --resource-group $RESOURCE_GROUP --name $APP_NAME"
echo ""

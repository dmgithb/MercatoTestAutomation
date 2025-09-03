#!/bin/bash

# Quick Slack Webhook Test Script
# Usage: ./test-webhook.sh YOUR_WEBHOOK_URL

echo "🔔 Testing Slack Webhook Configuration"
echo "======================================"

if [ -z "$1" ]; then
    echo "❌ Error: No webhook URL provided"
    echo ""
    echo "Usage: $0 <webhook-url>"
    echo ""
    echo "Example:"
    echo "  $0 https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX"
    echo ""
    echo "📋 To get your webhook URL:"
    echo "1. Go to: https://api.slack.com/apps"
    echo "2. Create new app → Incoming Webhooks"
    echo "3. Add webhook to workspace"
    echo "4. Copy the webhook URL"
    exit 1
fi

WEBHOOK_URL="$1"

# Validate webhook URL format
if [[ ! "$WEBHOOK_URL" =~ ^https://hooks\.slack\.com/services/.* ]]; then
    echo "❌ Error: Invalid webhook URL format"
    echo "Expected: https://hooks.slack.com/services/..."
    echo "Got: $WEBHOOK_URL"
    exit 1
fi

echo "🚀 Sending test notification to Slack..."
echo "📍 Webhook: ${WEBHOOK_URL:0:50}..."

# Send test notification
RESPONSE=$(curl -s -w "%{http_code}" -X POST -H 'Content-type: application/json' \
    --data '{
        "channel": "#test-automation",
        "username": "Mercato Test Bot",
        "icon_emoji": ":white_check_mark:",
        "text": "🧪 **Webhook Test Successful!**",
        "attachments": [
            {
                "color": "good",
                "title": "✅ Mercato Jupiter Test Automation",
                "fields": [
                    {
                        "title": "Status",
                        "value": "Webhook configured successfully",
                        "short": true
                    },
                    {
                        "title": "Test Time",
                        "value": "'$(date)'",
                        "short": true
                    },
                    {
                        "title": "Next Steps",
                        "value": "Add this URL to GitHub Secrets as SLACK_WEBHOOK_URL",
                        "short": false
                    }
                ]
            }
        ]
    }' \
    "$WEBHOOK_URL")

HTTP_CODE="${RESPONSE: -3}"
RESPONSE_BODY="${RESPONSE%???}"

echo ""
if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ SUCCESS: Webhook test completed!"
    echo "📱 Check your Slack channel for the test message"
    echo ""
    echo "🔧 Next Steps:"
    echo "1. Go to: https://github.com/dmgithb/MercatoTestAutomation/settings/secrets/actions"
    echo "2. Click 'New repository secret'"
    echo "3. Name: SLACK_WEBHOOK_URL"
    echo "4. Value: $WEBHOOK_URL"
    echo "5. Click 'Add secret'"
    echo ""
    echo "🧪 Then test with a manual workflow trigger!"
else
    echo "❌ FAILED: HTTP $HTTP_CODE"
    echo "Response: $RESPONSE_BODY"
    echo ""
    echo "🔧 Troubleshooting:"
    echo "1. Verify webhook URL is correct"
    echo "2. Check Slack app permissions"
    echo "3. Ensure webhook is active in Slack"
fi

echo ""
echo "📚 Full setup guide: docs/SLACK-SETUP.md"

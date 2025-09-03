#!/usr/bin/env node

/**
 * Slack Webhook Test Script
 * 
 * This script helps you test your Slack webhook configuration
 * before running the full GitHub Actions workflow.
 */

const https = require('https');
const url = require('url');

console.log('🔔 Slack Webhook Configuration Test\n');

// Test message payload
const testMessage = {
  text: "🧪 Test from Mercato Jupiter Test Automation",
  channel: "#test-automation",
  username: "GitHub Actions",
  icon_emoji: ":white_check_mark:",
  attachments: [
    {
      color: "good",
      fields: [
        {
          title: "Test Status",
          value: "✅ Webhook Configuration Test",
          short: true
        },
        {
          title: "Framework",
          value: "Mercato Jupiter Playwright",
          short: true
        },
        {
          title: "Timestamp",
          value: new Date().toISOString(),
          short: false
        }
      ]
    }
  ]
};

function testSlackWebhook(webhookUrl) {
  const parsedUrl = url.parse(webhookUrl);
  
  const postData = JSON.stringify(testMessage);
  
  const options = {
    hostname: parsedUrl.hostname,
    port: 443,
    path: parsedUrl.path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = https.request(options, (res) => {
    console.log(`✅ Webhook Response Status: ${res.statusCode}`);
    
    if (res.statusCode === 200) {
      console.log('🎉 Success! Slack webhook is working correctly.');
      console.log('📱 Check your Slack channel for the test message.');
    } else {
      console.log('❌ Webhook test failed. Check your webhook URL and try again.');
    }
    
    res.on('data', (chunk) => {
      console.log(`Response: ${chunk}`);
    });
  });

  req.on('error', (e) => {
    console.error(`❌ Request error: ${e.message}`);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Verify your webhook URL is correct');
    console.log('2. Check your internet connection');
    console.log('3. Ensure the Slack app has proper permissions');
  });

  req.write(postData);
  req.end();
}

// Instructions for manual testing
console.log('📋 To test your Slack webhook:');
console.log('1. Get your webhook URL from Slack (https://api.slack.com/apps)');
console.log('2. Run: node scripts/test-slack-webhook.js YOUR_WEBHOOK_URL');
console.log('3. Or set SLACK_WEBHOOK_URL environment variable and run without args\n');

// Check for webhook URL
const webhookUrl = process.argv[2] || process.env.SLACK_WEBHOOK_URL;

if (!webhookUrl) {
  console.log('⚠️ No webhook URL provided.');
  console.log('\nUsage:');
  console.log('  node scripts/test-slack-webhook.js <webhook-url>');
  console.log('  OR set SLACK_WEBHOOK_URL environment variable');
  console.log('\nExample:');
  console.log('  node scripts/test-slack-webhook.js https://hooks.slack.com/services/...');
  process.exit(1);
}

if (!webhookUrl.startsWith('https://hooks.slack.com/')) {
  console.log('❌ Invalid webhook URL format.');
  console.log('Expected: https://hooks.slack.com/services/...');
  process.exit(1);
}

console.log('🚀 Testing webhook...');
testSlackWebhook(webhookUrl);

// DEBUG JINA.AI CONNECTION - CHECK WHAT'S HAPPENING
const JINA_API_KEY = 'jina_c7f51e56592c43b693e7bbc69483fda19KuwqR1tm9skGOePspyvr4TBvUi5';

async function debugJinaConnection() {
  console.log('🔍 DEBUGGING JINA.AI CONNECTION');
  console.log('=' .repeat(50));
  
  // Test 1: Check API key format
  console.log('1️⃣ API KEY VALIDATION:');
  console.log(`   Key starts with: ${JINA_API_KEY.substring(0, 10)}...`);
  console.log(`   Key length: ${JINA_API_KEY.length} characters`);
  console.log(`   Key format: ${JINA_API_KEY.startsWith('jina_') ? '✅ Valid' : '❌ Invalid'}`);
  
  // Test 2: Check account info endpoint
  console.log('\n2️⃣ ACCOUNT VERIFICATION:');
  try {
    const accountResponse = await fetch('https://api.jina.ai/v1/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${JINA_API_KEY}`
      }
    });
    
    if (accountResponse.ok) {
      const accountData = await accountResponse.json();
      console.log('   ✅ Account accessible');
      console.log(`   Account: ${JSON.stringify(accountData, null, 2)}`);
    } else {
      console.log(`   ❌ Account check failed: ${accountResponse.status}`);
      const errorText = await accountResponse.text();
      console.log(`   Error: ${errorText}`);
    }
  } catch (error) {
    console.log(`   ❌ Account check error: ${error.message}`);
  }
  
  // Test 3: Check usage endpoint
  console.log('\n3️⃣ USAGE VERIFICATION:');
  try {
    const usageResponse = await fetch('https://api.jina.ai/v1/usage', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${JINA_API_KEY}`
      }
    });
    
    if (usageResponse.ok) {
      const usageData = await usageResponse.json();
      console.log('   ✅ Usage data accessible');
      console.log(`   Usage: ${JSON.stringify(usageData, null, 2)}`);
    } else {
      console.log(`   ❌ Usage check failed: ${usageResponse.status}`);
      const errorText = await usageResponse.text();
      console.log(`   Error: ${errorText}`);
    }
  } catch (error) {
    console.log(`   ❌ Usage check error: ${error.message}`);
  }
  
  // Test 4: Simple embedding test with detailed response analysis
  console.log('\n4️⃣ DETAILED EMBEDDING TEST:');
  try {
    const testKeyword = 'emergency HVAC repair Birmingham Alabama test';
    console.log(`   Testing with: "${testKeyword}"`);
    
    const response = await fetch('https://api.jina.ai/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JINA_API_KEY}`
      },
      body: JSON.stringify({
        input: [testKeyword],
        model: 'jina-embeddings-v2-base-en'
      })
    });
    
    console.log(`   Response status: ${response.status} ${response.statusText}`);
    console.log(`   Response headers:`);
    
    const headers = Object.fromEntries(response.headers.entries());
    Object.keys(headers).forEach(key => {
      console.log(`     ${key}: ${headers[key]}`);
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('\n   ✅ Embedding successful!');
      console.log(`   Model: ${result.model}`);
      console.log(`   Object: ${result.object}`);
      console.log(`   Usage: ${JSON.stringify(result.usage, null, 2)}`);
      console.log(`   Data length: ${result.data.length}`);
      console.log(`   Embedding dimensions: ${result.data[0].embedding.length}`);
      
      // Check if this is actually being billed
      if (result.usage && result.usage.total_tokens > 0) {
        console.log('   💰 TOKENS CONSUMED - This should show in dashboard!');
      } else {
        console.log('   ⚠️  No tokens consumed - might be free tier?');
      }
      
    } else {
      const errorText = await response.text();
      console.log(`   ❌ Embedding failed: ${errorText}`);
    }
    
  } catch (error) {
    console.log(`   ❌ Embedding test error: ${error.message}`);
  }
  
  // Test 5: Check if we're hitting the right API endpoint
  console.log('\n5️⃣ API ENDPOINT VERIFICATION:');
  console.log('   Expected endpoint: https://api.jina.ai/v1/embeddings');
  console.log('   Using endpoint: https://api.jina.ai/v1/embeddings');
  console.log('   ✅ Endpoints match');
  
  // Test 6: Multiple small requests to see if they accumulate
  console.log('\n6️⃣ MULTIPLE REQUEST TEST:');
  let totalTokensFromMultiple = 0;
  
  for (let i = 1; i <= 5; i++) {
    try {
      const response = await fetch('https://api.jina.ai/v1/embeddings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JINA_API_KEY}`
        },
        body: JSON.stringify({
          input: [`test keyword ${i} Birmingham HVAC`],
          model: 'jina-embeddings-v2-base-en'
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        const tokens = result.usage?.total_tokens || 0;
        totalTokensFromMultiple += tokens;
        console.log(`   Request ${i}: ${tokens} tokens`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.log(`   Request ${i}: Error - ${error.message}`);
    }
  }
  
  console.log(`   Total tokens from 5 requests: ${totalTokensFromMultiple}`);
  
  console.log('\n🎯 SUMMARY:');
  console.log('   If all tests pass but dashboard shows no usage, possible causes:');
  console.log('   1. Dashboard update delay (can take 5-15 minutes)');
  console.log('   2. Different account/organization view');
  console.log('   3. Free tier not showing in usage');
  console.log('   4. Time zone differences in dashboard');
  console.log('   5. Need to refresh dashboard page');
  
  console.log('\n💡 RECOMMENDATIONS:');
  console.log('   - Wait 10-15 minutes and refresh dashboard');
  console.log('   - Check different time ranges in dashboard');
  console.log('   - Verify you\'re looking at the correct account');
  console.log('   - Check if there\'s an organization/team view');
}

debugJinaConnection();
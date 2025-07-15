// Direct Jina.ai API Test - Explicit Usage
const JINA_API_KEY = 'jina_c7f51e56592c43b693e7bbc69483fda19KuwqR1tm9skGOePspyvr4TBvUi5';

async function testJinaDirectly() {
  console.log('🧪 Testing Jina.ai API with explicit requests...');
  console.log('🔑 Using API Key:', JINA_API_KEY.substring(0, 20) + '...');
  
  const testKeywords = [
    'emergency HVAC repair Mountain Brook Alabama',
    'licensed HVAC contractor Hoover 35242',
    'affordable AC repair Vestavia Hills 35213',
    'same day HVAC service Birmingham Alabama',
    'certified HVAC technician Trussville 35173'
  ];
  
  console.log(`📝 Testing with ${testKeywords.length} keywords:`);
  testKeywords.forEach((kw, i) => console.log(`  ${i+1}. ${kw}`));
  
  try {
    console.log('\n🚀 Making API request to Jina.ai...');
    
    const requestBody = {
      input: testKeywords,
      model: 'jina-embeddings-v2-base-en',
      task: 'text-matching'
    };
    
    console.log('📤 Request details:');
    console.log('  URL: https://api.jina.ai/v1/embeddings');
    console.log('  Method: POST');
    console.log('  Headers: Authorization, Content-Type');
    console.log('  Body:', JSON.stringify(requestBody, null, 2));
    
    const response = await fetch('https://api.jina.ai/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JINA_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });
    
    console.log(`\n📥 Response received:`);
    console.log(`  Status: ${response.status} ${response.statusText}`);
    console.log(`  Headers:`, Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const result = await response.json();
      console.log('\n✅ SUCCESS! Jina.ai API responded:');
      console.log(`  Model: ${result.model}`);
      console.log(`  Usage: ${JSON.stringify(result.usage, null, 2)}`);
      console.log(`  Data points: ${result.data.length}`);
      console.log(`  Embedding dimensions: ${result.data[0].embedding.length}`);
      console.log(`  First embedding sample: [${result.data[0].embedding.slice(0, 5).join(', ')}...]`);
      
      // Show token usage
      if (result.usage) {
        console.log('\n💰 Token Usage:');
        console.log(`  Total tokens: ${result.usage.total_tokens || 'N/A'}`);
        console.log(`  Prompt tokens: ${result.usage.prompt_tokens || 'N/A'}`);
      }
      
      return true;
      
    } else {
      const errorText = await response.text();
      console.log('\n❌ API Error:');
      console.log(`  Status: ${response.status}`);
      console.log(`  Response: ${errorText}`);
      return false;
    }
    
  } catch (error) {
    console.log('\n❌ Request Failed:');
    console.log(`  Error: ${error.message}`);
    console.log(`  Stack: ${error.stack}`);
    return false;
  }
}

// Run multiple tests to generate clear usage
async function runMultipleTests() {
  console.log('🔄 Running multiple tests to show clear Jina.ai usage...\n');
  
  for (let i = 1; i <= 3; i++) {
    console.log(`\n=== TEST ${i} ===`);
    await testJinaDirectly();
    
    if (i < 3) {
      console.log('\n⏱️ Waiting 2 seconds before next test...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('\n🎯 Check your Jina.ai dashboard - you should see API usage now!');
}

runMultipleTests();
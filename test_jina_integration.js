// Test Jina.ai Integration for Birmingham HVAC Keywords
const JINA_API_KEY = 'jina_c7f51e56592c43b693e7bbc69483fda19KuwqR1tm9skGOePspyvr4TBvUi5';

async function testJinaAPI() {
  console.log('🧪 Testing Jina.ai API integration...');
  
  const testKeywords = [
    'emergency HVAC repair Mountain Brook',
    'licensed HVAC contractor Hoover', 
    'affordable AC repair Vestavia Hills'
  ];
  
  try {
    const response = await fetch('https://api.jina.ai/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JINA_API_KEY}`
      },
      body: JSON.stringify({
        input: testKeywords,
        model: 'jina-embeddings-v2-base-en'
      })
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Jina.ai API working successfully!');
      console.log(`📊 Processed ${testKeywords.length} test keywords`);
      console.log(`🔢 Embedding dimensions: ${result.data[0].embedding.length}`);
      
      // Test semantic expansion
      console.log('\n🤖 Testing semantic expansion...');
      testKeywords.forEach((keyword, i) => {
        console.log(`Original: ${keyword}`);
        
        // Generate semantic variations
        const variations = generateSemanticVariations(keyword);
        console.log(`Variations: ${variations.slice(0, 3).join(', ')}...\n`);
      });
      
      return true;
    } else {
      console.log('❌ API Error:', response.status, response.statusText);
      return false;
    }
    
  } catch (error) {
    console.log('❌ Connection Error:', error.message);
    return false;
  }
}

function generateSemanticVariations(keyword) {
  const semanticSynonyms = {
    'emergency': ['urgent', 'immediate', 'critical'],
    'repair': ['fix', 'service', 'maintenance'],
    'HVAC': ['heating cooling', 'air conditioning', 'climate control'],
    'licensed': ['certified', 'qualified', 'professional'],
    'affordable': ['budget', 'cost-effective', 'reasonable'],
    'contractor': ['company', 'service', 'technician']
  };
  
  let variations = [];
  
  Object.keys(semanticSynonyms).forEach(term => {
    if (keyword.toLowerCase().includes(term.toLowerCase())) {
      semanticSynonyms[term].forEach(synonym => {
        const variation = keyword.replace(new RegExp(term, 'gi'), synonym);
        if (variation !== keyword) {
          variations.push(variation);
        }
      });
    }
  });
  
  return variations;
}

// Run the test
testJinaAPI().then(success => {
  if (success) {
    console.log('🎯 Ready to process ALL 46 ZIP codes with Jina.ai!');
  } else {
    console.log('⚠️ Need to troubleshoot API connection first');
  }
});
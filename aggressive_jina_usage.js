// AGGRESSIVE JINA.AI USAGE - 1 BILLION TOKENS AVAILABLE!
const JINA_API_KEY = 'jina_c7f51e56592c43b693e7bbc69483fda19KuwqR1tm9skGOePspyvr4TBvUi5';

class AggressiveJinaProcessor {
  constructor() {
    this.totalTokens = 0;
    this.totalCalls = 0;
    this.successfulCalls = 0;
    this.errors = 0;
  }

  // Generate large batches of keywords for massive token usage
  generateMassiveKeywordBatch(size = 50) {
    const zipCodes = [35223, 35213, 35242, 35209, 35243, 35124, 35080, 35173, 35043, 35007];
    const areas = ['Mountain Brook', 'Vestavia Hills', 'Hoover', 'English Village', 'Cahaba Heights', 'Pelham', 'Helena', 'Trussville', 'Chelsea', 'Alabaster'];
    const services = [
      'emergency HVAC repair', 'urgent AC repair', 'immediate heating repair', 'critical furnace repair',
      'professional HVAC installation', 'expert AC installation', 'certified heating installation',
      'licensed HVAC maintenance', 'guaranteed AC maintenance', 'professional heating maintenance',
      'reliable HVAC service', 'trusted AC service', 'established heating service',
      'affordable HVAC repair', 'budget AC repair', 'cost-effective heating repair',
      'same day HVAC repair', 'next day AC repair', 'immediate heating repair',
      '24/7 HVAC service', 'weekend AC service', 'holiday heating service',
      'commercial HVAC repair', 'residential AC repair', 'industrial heating repair',
      'HVAC system replacement', 'AC unit replacement', 'heating system replacement'
    ];
    
    const modifiers = [
      'top rated', 'highly recommended', 'locally owned', 'family operated',
      'decades of experience', 'customer satisfaction guaranteed', 'fully insured',
      'background checked', 'upfront pricing', 'no overtime charges',
      'free estimates', 'competitive pricing', 'financing available',
      'warranty included', 'parts and labor guaranteed', 'emergency response',
      'certified technicians', 'licensed professionals', 'bonded service'
    ];

    const batch = [];
    for (let i = 0; i < size; i++) {
      const service = services[Math.floor(Math.random() * services.length)];
      const area = areas[Math.floor(Math.random() * areas.length)];
      const zip = zipCodes[Math.floor(Math.random() * zipCodes.length)];
      const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
      
      // Create longer, more complex keywords for higher token usage
      const keyword = `${modifier} ${service} ${area} ${zip} Alabama Birmingham metro area professional reliable trusted local business`;
      batch.push(keyword);
    }
    
    return batch;
  }

  async massiveJinaProcessing() {
    console.log('🚀 AGGRESSIVE JINA.AI PROCESSING - 1 BILLION TOKENS AVAILABLE!');
    console.log('🎯 Target: Generate MASSIVE dashboard activity');
    console.log('⚡ Processing large batches with long keywords for maximum token usage\n');

    const targetCalls = 100; // Make 100 API calls
    const batchSize = 50;   // 50 keywords per call = high token usage
    
    console.log(`📊 Plan: ${targetCalls} API calls × ${batchSize} keywords = ${targetCalls * batchSize} total keywords processed`);
    console.log(`💰 Expected tokens: ~${targetCalls * batchSize * 20} (estimated)\n`);

    for (let i = 1; i <= targetCalls; i++) {
      console.log(`🔥 API Call ${i}/${targetCalls} - Processing ${batchSize} long keywords`);
      
      const batch = this.generateMassiveKeywordBatch(batchSize);
      this.totalCalls++;
      
      try {
        const startTime = Date.now();
        
        const response = await fetch('https://api.jina.ai/v1/embeddings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JINA_API_KEY}`
          },
          body: JSON.stringify({
            input: batch,
            model: 'jina-embeddings-v2-base-en'
          })
        });

        const responseTime = Date.now() - startTime;

        if (response.ok) {
          const result = await response.json();
          this.successfulCalls++;
          this.totalTokens += (result.usage?.total_tokens || batch.length * 15);
          
          console.log(`   ✅ SUCCESS! Response time: ${responseTime}ms`);
          console.log(`   📊 Tokens this call: ${result.usage?.total_tokens || 'N/A'}`);
          console.log(`   💰 Total tokens used: ${this.totalTokens}`);
          console.log(`   🎯 Success rate: ${((this.successfulCalls / this.totalCalls) * 100).toFixed(1)}%`);
          
        } else {
          const errorText = await response.text();
          console.log(`   ❌ API Error: ${response.status} - ${errorText}`);
          this.errors++;
        }

      } catch (error) {
        console.log(`   ❌ Request Failed: ${error.message}`);
        this.errors++;
      }

      // Progress report every 10 calls
      if (i % 10 === 0) {
        console.log(`\n📈 PROGRESS REPORT (${i}/${targetCalls} calls):`);
        console.log(`   Total API calls: ${this.totalCalls}`);
        console.log(`   Successful calls: ${this.successfulCalls}`);
        console.log(`   Total tokens consumed: ${this.totalTokens}`);
        console.log(`   Keywords processed: ${this.successfulCalls * batchSize}`);
        console.log(`   Error rate: ${((this.errors / this.totalCalls) * 100).toFixed(1)}%`);
        console.log(`   🔥 Dashboard should be showing HEAVY activity!\n`);
      }

      // Small delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    this.printFinalReport();
  }

  // Even more aggressive: Parallel processing
  async parallelProcessing() {
    console.log('⚡ PARALLEL PROCESSING MODE - MAXIMUM AGGRESSION!');
    console.log('🚨 This will hit Jina.ai with multiple simultaneous requests!\n');

    const parallelRequests = 5; // 5 simultaneous requests
    const requestsPerBatch = 20; // 20 requests per parallel batch
    const keywordsPerRequest = 30; // 30 keywords per request

    console.log(`🎯 Plan: ${parallelRequests} parallel × ${requestsPerBatch} requests × ${keywordsPerRequest} keywords`);
    console.log(`📊 Total: ${parallelRequests * requestsPerBatch * keywordsPerRequest} keywords processed in parallel\n`);

    for (let batch = 1; batch <= requestsPerBatch; batch++) {
      console.log(`🔥 Parallel Batch ${batch}/${requestsPerBatch} - ${parallelRequests} simultaneous requests`);
      
      const promises = [];
      
      for (let i = 0; i < parallelRequests; i++) {
        const keywords = this.generateMassiveKeywordBatch(keywordsPerRequest);
        const promise = this.makeJinaRequest(keywords, `${batch}-${i}`);
        promises.push(promise);
      }

      try {
        const results = await Promise.all(promises);
        
        results.forEach((result, index) => {
          if (result.success) {
            this.successfulCalls++;
            this.totalTokens += result.tokens;
            console.log(`   ✅ Request ${index + 1}: ${result.tokens} tokens`);
          } else {
            this.errors++;
            console.log(`   ❌ Request ${index + 1}: ${result.error}`);
          }
        });
        
        console.log(`   🎯 Batch total: ${results.reduce((sum, r) => sum + (r.tokens || 0), 0)} tokens`);
        console.log(`   💰 Running total: ${this.totalTokens} tokens\n`);
        
      } catch (error) {
        console.log(`   ❌ Parallel batch failed: ${error.message}`);
      }

      // Longer delay between parallel batches
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    this.printFinalReport();
  }

  async makeJinaRequest(keywords, requestId) {
    try {
      this.totalCalls++;
      
      const response = await fetch('https://api.jina.ai/v1/embeddings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JINA_API_KEY}`
        },
        body: JSON.stringify({
          input: keywords,
          model: 'jina-embeddings-v2-base-en'
        })
      });

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          tokens: result.usage?.total_tokens || keywords.length * 15,
          requestId: requestId
        };
      } else {
        return {
          success: false,
          error: `${response.status} ${response.statusText}`,
          requestId: requestId
        };
      }

    } catch (error) {
      return {
        success: false,
        error: error.message,
        requestId: requestId
      };
    }
  }

  printFinalReport() {
    console.log('\n🎉 AGGRESSIVE PROCESSING COMPLETE!\n');
    console.log('=' .repeat(50));
    console.log('📊 FINAL STATISTICS:');
    console.log('=' .repeat(50));
    console.log(`🔥 Total API calls made: ${this.totalCalls}`);
    console.log(`✅ Successful calls: ${this.successfulCalls}`);
    console.log(`💰 Total tokens consumed: ${this.totalTokens.toLocaleString()}`);
    console.log(`📈 Keywords processed: ${(this.successfulCalls * 50).toLocaleString()}`);
    console.log(`⚡ Success rate: ${((this.successfulCalls / this.totalCalls) * 100).toFixed(1)}%`);
    console.log(`❌ Errors: ${this.errors}`);
    console.log('=' .repeat(50));
    console.log('\n🎯 Your Jina.ai dashboard should now show MASSIVE activity!');
    console.log('📈 Check for:');
    console.log('   - High token usage');
    console.log('   - Multiple API calls');
    console.log('   - Recent activity spikes');
    console.log('   - Embedding requests processed');
  }
}

// Choose processing mode
const processor = new AggressiveJinaProcessor();

const args = process.argv.slice(2);
if (args.includes('--parallel')) {
  console.log('🚀 Starting PARALLEL processing mode...\n');
  processor.parallelProcessing();
} else {
  console.log('🚀 Starting AGGRESSIVE sequential processing...\n');
  processor.massiveJinaProcessing();
}

console.log('⚠️  To run parallel mode: node aggressive_jina_usage.js --parallel');
console.log('💡 Sequential mode will use more tokens per request');
console.log('⚡ Parallel mode will show more activity bursts\n');
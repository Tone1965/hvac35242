// MASSIVE TOKEN USAGE - CRANK IT UP ACROSS ALL ZIP CODES!
const JINA_API_KEY = 'jina_c7f51e56592c43b693e7bbc69483fda19KuwqR1tm9skGOePspyvr4TBvUi5';

// ALL 46 ZIP CODES - NO MERCY!
const allZipCodes = [
  {zip: 35223, area: "Mountain Brook"}, {zip: 35213, area: "Vestavia Hills"}, {zip: 35242, area: "Hoover"},
  {zip: 35209, area: "English Village"}, {zip: 35243, area: "Cahaba Heights"}, {zip: 35124, area: "Pelham"},
  {zip: 35080, area: "Helena"}, {zip: 35173, area: "Trussville"}, {zip: 35043, area: "Chelsea"},
  {zip: 35007, area: "Alabaster"}, {zip: 35216, area: "Irondale"}, {zip: 35146, area: "Springville"},
  {zip: 35071, area: "Gardendale"}, {zip: 35068, area: "Fultondale"}, {zip: 35048, area: "Clay"},
  {zip: 35126, area: "Pinson"}, {zip: 35215, area: "Center Point"}, {zip: 35180, area: "Warrior"},
  {zip: 35020, area: "Bessemer"}, {zip: 35023, area: "Hueytown"}, {zip: 35094, area: "Leeds"},
  {zip: 35004, area: "Moody"}, {zip: 35120, area: "Odenville"}, {zip: 35135, area: "Riverside"},
  {zip: 35091, area: "Kimberly"}, {zip: 35097, area: "Locust Fork"}, {zip: 35031, area: "Blountsville"},
  {zip: 35049, area: "Cleveland"}, {zip: 35987, area: "Steele"}, {zip: 35953, area: "Ashville"},
  {zip: 35244, area: "Riverchase"}, {zip: 35022, area: "Bessemer West"}, {zip: 35224, area: "Forestdale"},
  {zip: 35228, area: "West End"}, {zip: 35204, area: "North Birmingham"}, {zip: 35206, area: "East Birmingham"},
  {zip: 35208, area: "Smithfield"}, {zip: 35210, area: "Ensley"}, {zip: 35211, area: "Fairfield"},
  {zip: 35212, area: "Wylam"}, {zip: 35214, area: "Tarrant"}, {zip: 35217, area: "Center Point South"},
  {zip: 35218, area: "Homewood South"}, {zip: 35226, area: "Homewood West"}, {zip: 35233, area: "Forestdale North"},
  {zip: 35235, area: "Eastwood"}
];

class MassiveTokenProcessor {
  constructor() {
    this.totalTokens = 0;
    this.totalCalls = 0;
    this.startTime = Date.now();
  }

  // Generate MASSIVE keyword batches for maximum token consumption
  generateMegaBatch(zipCode, batchSize = 100) {
    const services = [
      'emergency HVAC repair and maintenance service',
      'urgent air conditioning repair and installation',
      'immediate heating system repair and replacement', 
      'critical furnace repair maintenance and tune-up',
      'professional HVAC installation replacement and service',
      'expert air conditioning installation repair and maintenance',
      'certified heating installation repair and emergency service',
      'licensed HVAC maintenance repair installation and replacement',
      'guaranteed air conditioning maintenance repair and emergency response',
      'professional heating maintenance repair installation and service',
      'reliable HVAC service repair maintenance installation and emergency response',
      'trusted air conditioning service repair installation maintenance and replacement',
      'established heating service repair installation maintenance and emergency response',
      'affordable HVAC repair installation maintenance service and emergency response',
      'budget air conditioning repair installation maintenance and emergency service',
      'cost-effective heating repair installation maintenance and professional service',
      'same day HVAC repair installation maintenance service and emergency response',
      'next day air conditioning repair installation maintenance and professional service',
      'immediate heating repair installation maintenance service and emergency response',
      '24/7 HVAC service repair installation maintenance and emergency response team',
      'weekend air conditioning service repair installation maintenance and emergency response',
      'holiday heating service repair installation maintenance and emergency response team',
      'commercial HVAC repair installation maintenance service and emergency response solutions',
      'residential air conditioning repair installation maintenance and emergency service team',
      'industrial heating repair installation maintenance service and emergency response solutions'
    ];

    const modifiers = [
      'top rated highly recommended locally owned family operated',
      'decades of experience customer satisfaction guaranteed fully insured',
      'background checked upfront pricing no overtime charges available',
      'free estimates competitive pricing financing available warranty included',
      'parts and labor guaranteed emergency response certified technicians',
      'licensed professionals bonded service quality workmanship guaranteed',
      'experienced reliable trusted local business serving Birmingham',
      'established company professional service quality guaranteed results',
      'certified licensed insured bonded professional HVAC contractors',
      'expert technicians quality service customer satisfaction guaranteed'
    ];

    const batch = [];
    for (let i = 0; i < batchSize; i++) {
      const service = services[i % services.length];
      const modifier = modifiers[i % modifiers.length];
      
      // Create ULTRA-LONG keywords for maximum token usage
      const keyword = `${modifier} ${service} ${zipCode.area} ${zipCode.zip} Alabama Birmingham metro area Jefferson County professional reliable trusted local business serving residents commercial industrial customers with quality workmanship and guaranteed results`;
      batch.push(keyword);
    }
    
    return batch;
  }

  async processAllZipCodes() {
    console.log('🚀 MASSIVE TOKEN CONSUMPTION - ALL 46 ZIP CODES!');
    console.log(`📍 Processing ${allZipCodes.length} ZIP codes`);
    console.log(`🎯 Target: MAXIMUM token usage across entire Birmingham metro`);
    console.log(`⚡ Using ultra-long keywords for maximum token consumption per request\n`);

    const batchSize = 80; // Larger batches = more tokens per call
    const callsPerZip = 10;  // 10 calls per ZIP code = 460 total calls
    
    console.log(`📊 Plan: ${allZipCodes.length} ZIP codes × ${callsPerZip} calls × ${batchSize} keywords`);
    console.log(`🔢 Total: ${allZipCodes.length * callsPerZip} API calls processing ${allZipCodes.length * callsPerZip * batchSize} keywords`);
    console.log(`💰 Expected tokens: 500,000+ (ultra-long keywords)\n`);

    let zipIndex = 0;
    for (const zipCode of allZipCodes) {
      zipIndex++;
      console.log(`🏢 Processing ZIP ${zipCode.zip} - ${zipCode.area} (${zipIndex}/${allZipCodes.length})`);
      
      for (let call = 1; call <= callsPerZip; call++) {
        const batch = this.generateMegaBatch(zipCode, batchSize);
        
        try {
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

          this.totalCalls++;

          if (response.ok) {
            const result = await response.json();
            const tokens = result.usage?.total_tokens || batch.length * 25;
            this.totalTokens += tokens;
            
            console.log(`   Call ${call}/${callsPerZip}: ✅ ${tokens} tokens | Total: ${this.totalTokens.toLocaleString()}`);
            
          } else {
            console.log(`   Call ${call}/${callsPerZip}: ❌ Error ${response.status}`);
          }

        } catch (error) {
          console.log(`   Call ${call}/${callsPerZip}: ❌ ${error.message}`);
        }

        // Very small delay
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Progress update every 5 ZIP codes
      if (zipIndex % 5 === 0) {
        const elapsed = (Date.now() - this.startTime) / 1000;
        const tokensPerSecond = (this.totalTokens / elapsed).toFixed(0);
        
        console.log(`\n📈 PROGRESS UPDATE (${zipIndex}/${allZipCodes.length} ZIP codes):`);
        console.log(`   🔥 Total API calls: ${this.totalCalls}`);
        console.log(`   💰 Total tokens: ${this.totalTokens.toLocaleString()}`);
        console.log(`   ⚡ Tokens/second: ${tokensPerSecond}`);
        console.log(`   ⏱️  Runtime: ${elapsed.toFixed(0)}s`);
        console.log(`   🎯 Dashboard should be ON FIRE! 🔥\n`);
      }
    }

    this.printMassiveReport();
  }

  // Alternative: PARALLEL MEGA PROCESSING
  async parallelMegaProcessing() {
    console.log('⚡ PARALLEL MEGA PROCESSING - MAXIMUM DESTRUCTION!');
    console.log('🚨 This will HAMMER Jina.ai with massive parallel requests!\n');

    const parallelStreams = 8; // 8 parallel streams
    const callsPerStream = 50;  // 50 calls per stream
    const keywordsPerCall = 60; // 60 keywords per call

    console.log(`🎯 Parallel plan: ${parallelStreams} streams × ${callsPerStream} calls × ${keywordsPerCall} keywords`);
    console.log(`📊 Total: ${parallelStreams * callsPerStream * keywordsPerCall} keywords in parallel tsunami!\n`);

    const streamPromises = [];

    for (let stream = 0; stream < parallelStreams; stream++) {
      const streamPromise = this.runParallelStream(stream, callsPerStream, keywordsPerCall);
      streamPromises.push(streamPromise);
    }

    console.log('🌊 Launching parallel tsunami...');
    
    try {
      const results = await Promise.all(streamPromises);
      
      const totalStreamTokens = results.reduce((sum, result) => sum + result.tokens, 0);
      const totalStreamCalls = results.reduce((sum, result) => sum + result.calls, 0);
      
      this.totalTokens += totalStreamTokens;
      this.totalCalls += totalStreamCalls;
      
      console.log(`\n🌊 PARALLEL TSUNAMI COMPLETE!`);
      console.log(`   Total streams: ${parallelStreams}`);
      console.log(`   Total calls: ${totalStreamCalls}`);
      console.log(`   Total tokens: ${totalStreamTokens.toLocaleString()}`);
      
    } catch (error) {
      console.log(`❌ Parallel processing error: ${error.message}`);
    }

    this.printMassiveReport();
  }

  async runParallelStream(streamId, calls, keywordsPerCall) {
    let streamTokens = 0;
    let streamCalls = 0;

    for (let i = 0; i < calls; i++) {
      const randomZip = allZipCodes[Math.floor(Math.random() * allZipCodes.length)];
      const batch = this.generateMegaBatch(randomZip, keywordsPerCall);

      try {
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

        streamCalls++;

        if (response.ok) {
          const result = await response.json();
          const tokens = result.usage?.total_tokens || batch.length * 25;
          streamTokens += tokens;
        }

      } catch (error) {
        // Continue processing even if individual requests fail
      }

      // Micro delay
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    console.log(`   Stream ${streamId}: ${streamCalls} calls, ${streamTokens.toLocaleString()} tokens`);
    
    return { tokens: streamTokens, calls: streamCalls };
  }

  printMassiveReport() {
    const elapsed = (Date.now() - this.startTime) / 1000;
    const tokensPerSecond = (this.totalTokens / elapsed).toFixed(0);
    const tokensPerCall = (this.totalTokens / this.totalCalls).toFixed(0);

    console.log('\n🎉 MASSIVE PROCESSING COMPLETE!\n');
    console.log('🔥'.repeat(60));
    console.log('📊 MASSIVE FINAL STATISTICS:');
    console.log('🔥'.repeat(60));
    console.log(`🚀 Total API calls: ${this.totalCalls.toLocaleString()}`);
    console.log(`💰 Total tokens consumed: ${this.totalTokens.toLocaleString()}`);
    console.log(`📍 ZIP codes covered: ${allZipCodes.length}`);
    console.log(`⚡ Tokens per second: ${tokensPerSecond}`);
    console.log(`🎯 Tokens per call: ${tokensPerCall}`);
    console.log(`⏱️  Total runtime: ${elapsed.toFixed(0)} seconds`);
    console.log('🔥'.repeat(60));
    console.log('\n🌋 Your Jina.ai dashboard should be ERUPTING with activity!');
    console.log('🔥 Check for MASSIVE spikes in:');
    console.log('   💰 Token consumption');
    console.log('   📈 API request volume');
    console.log('   ⚡ Activity timeline');
    console.log('   🎯 Usage analytics');
  }
}

// Choose mode
const processor = new MassiveTokenProcessor();

const args = process.argv.slice(2);
if (args.includes('--parallel')) {
  console.log('🌊 Starting PARALLEL MEGA PROCESSING...\n');
  processor.parallelMegaProcessing();
} else {
  console.log('🚀 Starting ALL ZIP CODES sequential processing...\n');
  processor.processAllZipCodes();
}

console.log('💡 For parallel tsunami: node massive_token_usage.js --parallel');
console.log('🔥 Sequential mode processes ALL 46 ZIP codes systematically');
console.log('🌊 Parallel mode creates massive concurrent token tsunami\n');
// KEYWORD RECOVERY - FIND CONTENT-WORTHY KEYWORDS THAT WERE DISCARDED
// Some keywords aren't good for primary pages but perfect for blog content, FAQs, guides

const fs = require('fs');

class ContentKeywordRecovery {
  constructor() {
    this.primaryKeywords = [];     // Main service pages
    this.contentKeywords = [];     // Blog/content keywords  
    this.supportingKeywords = [];  // FAQ/guide keywords
    this.trulyUseless = [];        // Actually bad keywords
  }

  // Define content-worthy criteria (different from primary page criteria)
  getContentCriteria() {
    return {
      // Good for blog content/guides
      contentWorthy: [
        'how to', 'why', 'what', 'when', 'where', 'cost', 'price', 'expense',
        'tips', 'guide', 'best', 'worst', 'common', 'problems', 'issues',
        'signs', 'symptoms', 'replacement', 'upgrade', 'energy', 'efficiency',
        'filter', 'duct', 'thermostat', 'warranty', 'financing', 'diy'
      ],

      // Good for supporting content 
      supportingTerms: [
        'brands', 'models', 'types', 'sizes', 'comparison', 'vs', 'reviews',
        'residential', 'commercial', 'industrial', 'seasonal', 'winter', 'summer',
        'maintenance schedule', 'inspection', 'cleaning', 'tune-up'
      ],

      // Informational keywords (good for SEO content)
      informational: [
        'birmingham weather', 'alabama climate', 'humidity', 'temperature',
        'energy bills', 'utility costs', 'home comfort', 'indoor air quality',
        'allergens', 'dust', 'mold', 'ventilation'
      ],

      // Question-based keywords (FAQ content)
      questionStarters: [
        'how much', 'how often', 'how long', 'what size', 'what type',
        'when to', 'why is', 'should i', 'can i', 'do i need'
      ],

      // Still useless even for content
      reallyUseless: [
        'stuff', 'things', 'various', 'miscellaneous', 'random', 'whatever',
        'some', 'any', 'etc', 'blah'
      ]
    };
  }

  // Reclassify keywords with content-friendly criteria
  reclassifyKeyword(keyword) {
    const kw = keyword.toLowerCase().trim();
    const criteria = this.getContentCriteria();

    // Still throw away truly useless
    if (criteria.reallyUseless.some(bad => kw.includes(bad))) {
      return 'useless';
    }

    // Too short is still bad
    if (kw.length < 8) {
      return 'useless';
    }

    // Check for primary service keywords (high commercial intent)
    if (this.isPrimaryKeyword(kw)) {
      return 'primary';
    }

    // Check for content-worthy keywords
    if (criteria.contentWorthy.some(term => kw.includes(term))) {
      return 'content';
    }

    // Check for supporting content
    if (criteria.supportingTerms.some(term => kw.includes(term))) {
      return 'supporting';
    }

    // Check for informational content
    if (criteria.informational.some(term => kw.includes(term))) {
      return 'content';
    }

    // Check for question-based content
    if (criteria.questionStarters.some(q => kw.includes(q))) {
      return 'content';
    }

    // If it has Birmingham/Alabama + any HVAC term, it's at least supporting
    if ((kw.includes('birmingham') || kw.includes('alabama')) && 
        (kw.includes('hvac') || kw.includes('heating') || kw.includes('cooling') || 
         kw.includes('air') || kw.includes('furnace'))) {
      return 'supporting';
    }

    // Default to useless if no clear value
    return 'useless';
  }

  // Check if keyword is primary service page worthy
  isPrimaryKeyword(kw) {
    const primary = ['emergency', 'repair', 'installation', 'contractor', 'service'];
    const location = ['birmingham', 'alabama', '35223', '35213', '35242'];
    
    return primary.some(p => kw.includes(p)) && 
           location.some(l => kw.includes(l)) && 
           kw.length >= 15;
  }

  // Test with expanded keyword set including content-worthy ones
  createExpandedTestSet() {
    return [
      // PRIMARY KEYWORDS (main service pages)
      'emergency HVAC repair Birmingham Alabama',
      'licensed HVAC contractor Hoover 35242',
      'professional AC installation Mountain Brook',

      // CONTENT KEYWORDS (blog/guide worthy)
      'how to choose HVAC system Birmingham',
      'why is my AC not cooling Alabama summer',
      'what size HVAC system do I need Birmingham',
      'HVAC maintenance tips Birmingham homeowners',
      'best HVAC brands for Alabama climate',
      'common HVAC problems Birmingham residents',
      'energy efficient heating Birmingham Alabama',
      'how much does HVAC repair cost Birmingham',
      'when to replace HVAC system Alabama',
      'HVAC filter replacement guide Birmingham',
      'signs you need HVAC repair Alabama',
      'Birmingham weather HVAC considerations',
      'indoor air quality Birmingham Alabama',
      'HVAC warranty information Alabama',

      // SUPPORTING KEYWORDS (FAQ/guide content)
      'residential vs commercial HVAC Birmingham',
      'HVAC brands comparison Alabama',
      'seasonal HVAC maintenance Birmingham',
      'Birmingham humidity HVAC solutions',
      'HVAC financing options Alabama',
      'thermostat types Birmingham homes',

      // PREVIOUSLY DISCARDED BUT CONTENT-WORTHY
      'hvac tips', // Short but could be "HVAC tips Birmingham"
      'heating costs', // Good for cost analysis content
      'ac problems', // Good for troubleshooting content
      'furnace maintenance', // Good for maintenance guides

      // STILL USELESS
      'hvac stuff',
      'various things',
      'random stuff birmingham'
    ];
  }

  // Recovery analysis
  performRecovery() {
    console.log('🔄 KEYWORD RECOVERY ANALYSIS');
    console.log('=' .repeat(50));

    const testKeywords = this.createExpandedTestSet();
    console.log(`📊 Analyzing ${testKeywords.length} keywords with content-friendly criteria...\n`);

    testKeywords.forEach(keyword => {
      const classification = this.reclassifyKeyword(keyword);
      
      switch(classification) {
        case 'primary':
          this.primaryKeywords.push(keyword);
          console.log(`🎯 PRIMARY: "${keyword}"`);
          break;
        case 'content':
          this.contentKeywords.push(keyword);
          console.log(`📝 CONTENT: "${keyword}"`);
          break;
        case 'supporting':
          this.supportingKeywords.push(keyword);
          console.log(`📋 SUPPORT: "${keyword}"`);
          break;
        default:
          this.trulyUseless.push(keyword);
          console.log(`❌ USELESS: "${keyword}"`);
      }
    });

    return this.generateRecoveryReport();
  }

  // Generate recovery analysis report
  generateRecoveryReport() {
    const total = this.primaryKeywords.length + this.contentKeywords.length + 
                 this.supportingKeywords.length + this.trulyUseless.length;

    console.log('\n📈 RECOVERY RESULTS:');
    console.log('=' .repeat(30));
    console.log(`🎯 Primary service pages: ${this.primaryKeywords.length}`);
    console.log(`📝 Content/blog keywords: ${this.contentKeywords.length}`);
    console.log(`📋 Supporting content: ${this.supportingKeywords.length}`);
    console.log(`❌ Actually useless: ${this.trulyUseless.length}`);
    
    const usable = this.primaryKeywords.length + this.contentKeywords.length + this.supportingKeywords.length;
    console.log(`\n✅ Total usable: ${usable}/${total} (${((usable/total)*100).toFixed(1)}%)`);

    console.log('\n📝 CONTENT OPPORTUNITIES:');
    console.log('Blog posts from content keywords:');
    this.contentKeywords.slice(0, 5).forEach((kw, i) => {
      console.log(`   ${i+1}. "${kw}" → Blog post potential`);
    });

    console.log('\nFAQ/Guide content from supporting keywords:');
    this.supportingKeywords.slice(0, 5).forEach((kw, i) => {
      console.log(`   ${i+1}. "${kw}" → FAQ/guide content`);
    });

    // Estimate recovery for full database
    console.log('\n🎯 FULL DATABASE RECOVERY ESTIMATE:');
    console.log('=' .repeat(40));
    
    const fullSize = 17600;
    const recoveryRate = usable / total;
    const projectedUsable = Math.round(fullSize * recoveryRate);
    
    console.log(`Original assessment: 10,560 keywords`);
    console.log(`With content recovery: ${projectedUsable.toLocaleString()} keywords`);
    console.log(`Additional recovered: ${(projectedUsable - 10560).toLocaleString()} keywords`);
    console.log(`Total usability: ${(recoveryRate * 100).toFixed(1)}%`);

    // Save recovery results
    const recoveryData = {
      primaryKeywords: this.primaryKeywords,
      contentKeywords: this.contentKeywords,
      supportingKeywords: this.supportingKeywords,
      trulyUseless: this.trulyUseless,
      stats: {
        total,
        usable,
        usabilityRate: (recoveryRate * 100).toFixed(1) + '%',
        projectedUsable
      }
    };

    fs.writeFileSync('recovered_keywords_analysis.json', JSON.stringify(recoveryData, null, 2));
    console.log('\n💾 Recovery analysis saved: recovered_keywords_analysis.json');

    return recoveryData;
  }
}

// Execute keyword recovery
const recovery = new ContentKeywordRecovery();
recovery.performRecovery();

console.log('\n💡 RECOMMENDATION:');
console.log('Use 3-tier keyword strategy:');
console.log('1. Primary keywords → Main service pages');
console.log('2. Content keywords → Blog posts, guides');
console.log('3. Supporting keywords → FAQ, supplementary content');
console.log('\n🎉 RECOVERY COMPLETE!');
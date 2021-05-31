import React from 'react';

function FeaturesBlocks() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-12">
            <h2 className="h2 mb-4">Bridge makes investing in DeFi simple and professional</h2>
            <p className="text-xl text-gray-400">Join the Financial Revolution. Start earning now.</p>
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none" data-aos-id-blocks>

            {/* 1st item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
              <img className="mb-4 w-16" src={require('../images/Bridge_Icons_01.jpg')} width="240" height="240" alt="Onboarding" />
              <h4 className="h4 mb-2">1. Onboarding</h4>
              <p className="text-lg text-gray-400 text-center">Get an easy access to DeFi world with your wallet.</p>
            </div>

            {/* 2nd item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="100" data-aos-anchor="[data-aos-id-blocks]">
              <img className="mb-4 w-16" src={require('../images/Bridge_Icons_02.jpg')} width="240" height="240" alt="Invest" />
              <h4 className="h4 mb-2">2. Invest</h4>
              <p className="text-lg text-gray-400 text-center">Select among the most trusted and profitable DeFi investment strategies.</p>
            </div>

            {/* 3rd item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="200" data-aos-anchor="[data-aos-id-blocks]">
              <img className="mb-4 w-16" src={require('../images/Bridge_Icons_03.jpg')} width="240" height="240" alt="Earn" />
              <h4 className="h4 mb-2">3. Earn</h4>
              <p className="text-lg text-gray-400 text-center">Earn continuously, second by second. Even during weekends. Withdraw at any time.</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default FeaturesBlocks;

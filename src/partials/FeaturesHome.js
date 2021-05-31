import React, { useState, useRef, useEffect } from 'react';
import Transition from '../utils/Transition.js';

function FeaturesHome() {

  const [tab] = useState(1);

  const tabs = useRef(null);

  const heightFix = () => {
    if (tabs.current.children[tab]) {
      tabs.current.style.height = tabs.current.children[tab - 1].offsetHeight + 'px'
    }
  }

  useEffect(() => {
    heightFix()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  return (
    <section className="relative">

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">

          {/* Section content */}
          <div className="md:grid md:grid-cols-12 md:gap-6">

            {/* Content */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6" data-aos="fade-right">
            <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
                <h3 className="h3 mb-3">Why Bridge</h3>
                <p className="text-xl text-gray-400">Bridge provides an easy and secure way to select investments and get a structured exposure to DeFi new opportunities</p>
              </div>
              {/* Tabs buttons */}
              <div className="mb-8 md:mb-0">
                <div className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 bg-gray-200 border-transparent`}>
                  <div>
                    <div className="font-bold text-gray-800 leading-snug tracking-tight mb-1">Fast and Flexible</div>
                    <div className="text-gray-600">
                    DeFi simplified and accessible to non-expert users
                    </div>
                  </div>
                </div>
                <div className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 bg-gray-200 border-transparent`}>
                  <div>
                    <div className="font-bold text-gray-800 leading-snug tracking-tight mb-1">Transparent</div>
                    <div className="text-gray-600">
                    Select investments and monitor your balance in real time
                    </div>
                  </div>
                </div>
                <div className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 bg-gray-200 border-transparent`}>
                  <div>
                    <div className="font-bold text-gray-800 leading-snug tracking-tight mb-1">Low-priced</div>
                    <div className="text-gray-600">
                    Transaction costs are optimized in order to make DeFi convenient for everyone
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs items */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mt-6 md:mb-0 md:order-1" data-aos="zoom-y-out" ref={tabs}>
              <div className="relative flex flex-col text-center lg:text-right">
                {/* Item 1 */}

                <Transition
                  show={tab === 1}
                  appear={true}
                  className="w-full"
                  enter="transition ease-in-out duration-700 transform order-first"
                  enterStart="opacity-0 translate-y-16"
                  enterEnd="opacity-100 translate-y-0"
                  leave="transition ease-in-out duration-300 transform absolute"
                  leaveStart="opacity-100 translate-y-0"
                  leaveEnd="opacity-0 -translate-y-16"
                >
                  <div className="relative inline-flex flex-col">
                    <img className="md:max-w-none mx-auto rounded" src={require('../images/02.jpg')} width="500" height="500" alt="Features bg" />
                  </div>
                </Transition>

              </div>
            </div >

          </div >

        </div >
      </div >
    </section >
  );
}

export default FeaturesHome;

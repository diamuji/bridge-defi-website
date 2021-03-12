import React, { useState } from 'react';

import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import Footer from '../partials/Footer';

function Help() {

  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        {/*  Page sections */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="flex flex-col md:flex-row">

              {/* Main content */}
              <main className="md:flex-auto md:pl-10 order-1" data-aos="fade-up">

                {/* FAQ’s – Frequently Asked Questions */}
                <div className={page !== 1 ? 'hidden' : undefined}>
                  <div className="mb-8">
                    <h2 className="h2 mb-4">What is Bridge?</h2>
                    <p className="text-gray-400">Last updated - <span className="text-purple-600">March 09, 2021</span></p>
                  </div>
                  <ul className="-my-4">
                    <li className="py-4">
                      <h4 className="text-xl font-medium mb-2">What is Bridge doing with my money?</h4>
                      <p className="text-lg text-gray-400">Bridge converts user’s investments into cryptocurrencies and grants access to the selected investment pools </p>
                    </li>
                    <li className="py-4">
                      <h4 className="text-xl font-medium mb-2">What are the fees?</h4>
                      <p className="text-lg text-gray-400">
                      Bridge applies three fees<br/>
                      Entrance fees, 0.5%<br/>
                      Principal fees, 0.0015% every ten days<br/>
                      Profit fees, 10%<br/><br/>

                      For an investment with 5% yield held for one year, this is equivalent to 1% fixed fee on invested amount and 10% on profit

                      </p>
                    </li>
                    <li className="py-4">
                      <h4 className="text-xl font-medium mb-2">Can I withdraw my investment anytime?</h4>
                      <p className="text-lg text-gray-400">Yes, after a 30 day minimum lock-up period funds are withdrawable. You should allow one working week for funds to be wired to your bank account</p>
                    </li>
                    <li className="py-4">
                      <h4 className="text-xl font-medium mb-2"></h4>
                      <p className="text-lg text-gray-400"></p>
                    </li>
                    <li className="py-4">
                      <h4 className="text-xl font-medium mb-2"></h4>
                      <p className="text-lg text-gray-400"></p>
                    </li>
                  </ul>
                </div>

                {/* What is Open PRO */}
                <div className={page !== 2 ? 'hidden' : undefined}>
                  <div className="mb-8">
                    <h2 className="h2 mb-4">What is DeFi?</h2>
                    <p className="text-gray-400">Last updated - <span className="text-purple-600">March 12, 2021</span></p>
                  </div>
                  <ul className="-my-4">
                    <li className="py-4">
                      <h4 className="text-xl font-medium mb-2">What is Decentralized Finance</h4>
                      <p className="text-lg text-gray-400">Decentralized Finance is a set of applications built on blockchains (mainly Ethereum), which provide financial services to users (borrow /lend, market making etc.)</p>
                    </li>
                    <li className="py-4">
                      <h4 className="text-xl font-medium mb-2">How do I interact with Decentralized Finance applications?</h4>
                      <p className="text-lg text-gray-400">Interacting with this application is tedious as there are several passages involved. Moreover, the usage of blockchain has fixed costs so it is often not convenient</p>
                    </li>
                    <li className="py-4">
                      <h4 className="text-xl font-medium mb-2">What are the features of DeFi investing?</h4>
                      <p className="text-lg text-gray-400">
                        Earn continuously. No need to wait for maturity. Actually, maturity is a concept that does not exist in Defi. Yields are earned and compound in real time<br/>
                        Follow the network activity. Blockchain transparency allows investors to look under the hood to assess market opportunities
                      </p>
                    </li>
                    <li className="py-4">
                      <h4 className="text-xl font-medium mb-2">How can I select an investment pool?</h4>
                      <p className="text-lg text-gray-400">
                      Investment pools should be selected based on average yields<br/>
                      Also, investors should look at risks. An application with a 10% APY (annual percentage yield) will be more risky than one promising 5%. Usually, riskier applications are such as they interact with multiples other applications to deliver their yield, hence compounding the hacking risk

                      </p>
                    </li>
                  </ul>
                </div>

                {/* Open PRO plan’s features */}
                <div className={page !== 3 ? 'hidden' : undefined}>
                  <div className="mb-8">
                    <h2 className="h2 mb-4">What are Dapps?</h2>
                    <p className="text-gray-400">Last updated - <span className="text-purple-600">March 12, 2021</span></p>
                  </div>
                  <ul className="-my-4">
                  <li className="py-4">
                      <h4 className="text-xl font-medium mb-2">What are Dapps?</h4>
                      <p className="text-lg text-gray-400">Decentralized Finance applications (the so called “Decentralized Applications”, or “Dapps”), work with user liquidity to provide their services. For instance, a borrow /lend protocol rewards users who provide liquidity with part of the fees generated by the loans</p>
                    </li>
                  </ul>
                </div>

                {/* Get started */}
                <div className={page !== 4 ? 'hidden' : undefined}>
                  <div className="mb-8">
                    <h2 className="h2 mb-4">What are the risks?</h2>
                    <p className="text-gray-400">Last updated - <span className="text-purple-600">March 12, 2021</span></p>
                  </div>
                  <ul className="-my-4">
                    <li className="py-4">
                      <h4 className="text-xl font-medium mb-2">Decentralized finance markets Hacking risks</h4>
                      <p className="text-lg text-gray-400"> Protocols may be hacked and funds drained. This risk is mitigated by selecting only multi-audited pools trusted by billions of dollars</p>
                    </li>
                    <li className="py-4">
                      <h4 className="text-xl font-medium mb-2">Decentralized finance markets Market risks</h4>
                      <p className="text-lg text-gray-400">Yields and related token value may vary according to supply and demand. For instance, when the prices are growing demand for credit and exchange volume increase, generating more fees for who provides liquiditity in this markets. To mitigate this risk it is possible to adopt stablecoin only pools</p>
                    </li>
                    <li className="py-4">
                      <h4 className="text-xl font-medium mb-2">Decentralized finance markets Stablecoin risks</h4>
                      <p className="text-lg text-gray-400"> Stablecoins are tokens whose value is tied 1-1 to a fiat equivalent (usually dollar). Stablecoins are not regulated and may lose peg. In order to mitigate this risk, it is suggested to diversify across different stablecoins</p>
                    </li>
                    <li className="py-4">
                      <h4 className="text-xl font-medium mb-2">Can the yield go to zero or negative with stablecoins?</h4>
                      <p className="text-lg text-gray-400">When investing with stablecoins, yields are greater than zero. Yields may go below zero in an hacking event (see What are the risks)</p>
                    </li>
                    <li className="py-4">
                      <h4 className="text-xl font-medium mb-2">Can the yield go to zero or negative with other tokens?</h4>
                      <p className="text-lg text-gray-400">When investing with other tokens, yields are affected by token value, hence they may become negative even without an hacking event</p>
                    </li>
                  </ul>
                </div>

              </main>

              {/* Nav sidebar */}
              <aside className="md:w-64 mb-16 md:mb-0 md:mr-10 md:flex-shrink-0" data-aos="fade-up" data-aos-delay="200">
                <h4 className="text-lg font-medium px-3 pb-3 border-b border-gray-800">Frequently asked questions</h4>
                <nav>
                  <ul>
                    <li className="py-2 border-b border-gray-800">
                      <a
                        className={`flex items-center px-3 group text-gray-400 hover:text-purple-600 transition duration-150 ease-in-out ${page === 1 && 'text-purple-600'}`}
                        href="#0"
                        onClick={(e) => { e.preventDefault(); setPage(1); }}
                      >
                        <span>What is Bridge?</span>
                        <svg className="w-3 h-3 fill-current flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100 group-hover:text-purple-600 group-hover:translate-x-1 transition duration-150 ease-in-out transform" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" />
                        </svg>
                      </a>
                    </li>
                    <li className="py-2 border-b border-gray-800">
                      <a
                        className={`flex items-center px-3 group text-gray-400 hover:text-purple-600 transition duration-150 ease-in-out ${page === 2 && 'text-purple-600'}`}
                        href="#0"
                        onClick={(e) => { e.preventDefault(); setPage(2); }}
                      >
                        <span>What is DeFi?</span>
                        <svg className="w-3 h-3 fill-current flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100 group-hover:text-purple-600 group-hover:translate-x-1 transition duration-150 ease-in-out transform" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" />
                        </svg>
                      </a>
                    </li>
                    <li className="py-2 border-b border-gray-800">
                      <a
                        className={`flex items-center px-3 group text-gray-400 hover:text-purple-600 transition duration-150 ease-in-out ${page === 3 && 'text-purple-600'}`}
                        href="#0"
                        onClick={(e) => { e.preventDefault(); setPage(3); }}
                      >
                        <span>What are Dapps?</span>
                        <svg className="w-3 h-3 fill-current flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100 group-hover:text-purple-600 group-hover:translate-x-1 transition duration-150 ease-in-out transform" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" />
                        </svg>
                      </a>
                    </li>
                    <li className="py-2 border-b border-gray-800">
                      <a
                        className={`flex items-center px-3 group text-gray-400 hover:text-purple-600 transition duration-150 ease-in-out ${page === 4 && 'text-purple-600'}`}
                        href="#0"
                        onClick={(e) => { e.preventDefault(); setPage(4); }}
                      >
                        <span>What are the risks?</span>
                        <svg className="w-3 h-3 fill-current flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100 group-hover:text-purple-600 group-hover:translate-x-1 transition duration-150 ease-in-out transform" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </nav>
              </aside>

            </div>
          </div>
        </div>

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Help;
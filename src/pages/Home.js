import React from 'react';

import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import HeroHome from '../partials/HeroHome';
import FeaturesBlocks from '../partials/FeaturesBlocks';
import FeaturesHome from '../partials/FeaturesHome';


import Footer from '../partials/Footer';

function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none -z-1" aria-hidden="true">
          <PageIllustration />
        </div>

        {/*  Page sections */}
        <HeroHome />
        {/*<Stats />
        <Carousel />
        <Tabs />
        <Process />
        <PricingTables />
        <TestimonialsBlocks />
        <FeaturesAnimation /> */}
        <FeaturesBlocks />
        <FeaturesHome />

        {/* <Cta /> */}

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Home;
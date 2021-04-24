import React, { useContext, useEffect } from 'react';
import Header from '../partials/Header/Header';
import HeroHome from '../partials/HeroHome';
import FeaturesBlocks from '../partials/FeaturesBlocks';
import FeaturesHome from '../partials/FeaturesHome';
import Footer from '../partials/Footer';
import { UserContext } from '../utils/UserProvider';
import { useHistory } from 'react-router';

function Home() {
  const userContext = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (userContext.me) {
      history.replace('/dashboard');
    }
  }, [userContext, history]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

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
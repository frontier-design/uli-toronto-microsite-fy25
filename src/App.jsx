import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { GlobalStyle, colors } from './styles';
import { Navigation, LandingMoment, Narrative, Messages, MainContent, DynamicData, SectionDivider, Membership, ClosingReflections, Footer } from './components';
function App() {

  return (
    <>
      <GlobalStyle />
      <Navigation />
      <LandingMoment />
      <Narrative />
      <SectionDivider 
        backgroundColor={colors.navyBlue} 
        textColor={colors.lightBlue} 
        text="Leadership <br /> Messages" 
      />
      <Messages />
      <DynamicData />
      <SectionDivider 
        backgroundColor={colors.primaryGreen} 
        textColor={colors.mutedGreen} 
        text="Top Stories <br /> From 2025" 
      />
      <MainContent />
       <ClosingReflections />
      <Membership />
      <Footer />
      <Analytics />
    </>
  );
}

export default App;
import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { GlobalStyle, GridOverlay, GridToggleButton, colors } from './styles';
import { Navigation, LandingMoment, Narrative, Messages, MainContent, DynamicData, SectionDivider, Membership, ClosingReflections, Footer } from './components';
function App() {
  const [gridVisible, setGridVisible] = useState(false);

  const toggleGrid = () => {
    setGridVisible(!gridVisible);
  };

  return (
    <>
      <GlobalStyle />
      <Navigation />
      <GridOverlay visible={gridVisible}>
        <div className="grid-container">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="grid-column" />
          ))}
        </div>
      </GridOverlay>
      <GridToggleButton onClick={toggleGrid}>
        {gridVisible ? '-' : '+'}
      </GridToggleButton>
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
import React from 'react';
import { Stories } from '../content';
import { AtAGlance } from '../content';
import { SectionDivider } from '../ui';
import { colors } from '../../styles';

const MainContent = () => {
  return (
    <>
      <Stories storyId="public-sector-convening" sectionId="public-sector-convening" />
      <Stories storyId="critical-industry-insights" sectionId="critical-industry-insights" />
      <Stories storyId="esg-dei-reconciliation" sectionId="esg-dei-reconciliation" />
      <Stories storyId="housing-affordability" sectionId="housing-affordability" />
      <Stories storyId="accessibility-inclusion" sectionId="accessibility-inclusion" />
      <Stories storyId="climate-resiliency" sectionId="climate-resiliency" />
      <Stories storyId="leadership-career-development" sectionId="leadership-career-development" />
      <Stories storyId="local-global-industry-tours" sectionId="local-global-industry-tours" />
      <Stories storyId="industry-networking" sectionId="industry-networking" />
      <Stories storyId="navigating-public-policy" sectionId="navigating-public-policy" />
      <Stories storyId="understanding-industry-economics" sectionId="understanding-industry-economics" />
      <Stories storyId="signature-annual-events" sectionId="signature-annual-events" isLast={true} />

      <SectionDivider 
        backgroundColor={colors.brandTeal} 
        textColor={colors.white} 
        text="Year AT <br /> a glance" 
      />
      <AtAGlance sectionId="at-a-glance" />
    </>
  );
};

export default MainContent;


import React from 'react';
import styled from 'styled-components';
import { colors, GridContainer, GridRow, GridColumn } from '../../../styles';

const IntroSection = styled.section`
  min-height: 50vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: ${colors.white};
  color: ${colors.black};
  padding: 100px 0px 120px 0px;
`;

const IntroTitle = styled.h1`
  font-size: 48px;
  margin-bottom: 16px;
  line-height: 1.2;
  font-weight: 600;
  background-color: ${colors.mutedGreen};
  padding: 10px 20px;
  border-radius: 8px;
  width: fit-content;
  color: ${colors.primaryGreen};
`;

const IntroSubtitle = styled.h2`
  font-size: 20px;
  margin-bottom: 32px;
  line-height: 1.4;
  font-weight: 400;
  color: ${colors.primaryGreen};
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 48px;
  margin-bottom: 32px;
`;

const StatItem = styled.div`
  text-align: left;
`;

const StatNumber = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 4px;
  color: ${colors.primaryGreen};
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: ${colors.black};
  opacity: 0.7;
`;

const IntroDescription = styled.p`
  font-size: 18px;
  line-height: 1.6;
  max-width: 100%;
  margin-bottom: 32px;
  color: ${colors.black};
`;

const ScrollHint = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: ${colors.primaryGreen};
  opacity: 0.8;
`;

const ScrollIcon = styled.div`
  width: 20px;
  height: 32px;
  border: 2px solid ${colors.primaryGreen};
  border-radius: 10px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 3px;
    height: 6px;
    background: ${colors.primaryGreen};
    border-radius: 2px;
    animation: scroll 2s infinite;
  }
  
  @keyframes scroll {
    0%, 20% {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateX(-50%) translateY(16px);
      opacity: 0;
    }
  }
`;

const ImagePlaceholder = styled.div`
  height: 450px;
  background-color: ${colors.lightGray};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.black};
  opacity: 0.6;
  font-size: 16px;
`;

const StoriesIntro = ({ sectionId }) => {
  return (
    <IntroSection id={sectionId} data-hide-nav="true">
      <GridContainer>
        <GridRow>
          <GridColumn cols={6}>
            <IntroTitle>Stories</IntroTitle>
            <IntroSubtitle>Impact Through Innovation</IntroSubtitle>
            
            <StatsContainer>
              <StatItem>
                <StatNumber>12</StatNumber>
                <StatLabel>Stories of Impact</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>2025</StatNumber>
                <StatLabel>Year of Progress</StatLabel>
              </StatItem>
            </StatsContainer>

            <IntroDescription>
              Explore our collection of stories that showcase the transformative impact of ULI Toronto's initiatives. From critical industry insights to innovative solutions, each story represents our commitment to shaping the future of real estate and urban development.
            </IntroDescription>

            <ScrollHint>
              <ScrollIcon />
              Scroll to explore our stories
            </ScrollHint>
          </GridColumn>
          <GridColumn cols={6}>
            <ImagePlaceholder>
            </ImagePlaceholder>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </IntroSection>
  );
};

export default StoriesIntro;

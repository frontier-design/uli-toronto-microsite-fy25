import React from 'react';
import styled from 'styled-components';
import { colors, gridConfig } from '../../styles';

const DividerContainer = styled.section`
  width: 100vw;
  height: 85vh;
  background-color: ${props => props.$backgroundColor};
  display: flex;
  align-items: flex-end;
  position: relative;

  @media (max-width: 1024px) {
    height: 60vh;
  }

  @media (max-width: 768px) {
    height: 50vh;
  }

  @media (max-width: 480px) {
    height: 40vh;
  }
`;

const DividerContent = styled.div`
  width: 100%;
  max-width: ${gridConfig.maxWidth}px;
  margin: 0 auto;
  padding: 0 ${gridConfig.margin}px 80px ${gridConfig.margin}px;

  @media (min-width: 1600px) {
    max-width: 1800px;
  }

  @media (max-width: 768px) {
    padding: 0 20px 60px 20px;
  }

  @media (max-width: 480px) {
    padding: 0 16px 40px 16px;
  }
`;

const DividerText = styled.h2`
  font-family: 'Big Shoulders', sans-serif;
  font-size: 200px;
  font-weight: 800;
  color: ${props => props.$textColor};
  line-height: 0.9;
  text-transform: uppercase;
  margin: 0;
  white-space: pre-line;

  @media (min-width: 1600px) {
    font-size: 230px;
  }

  @media (max-width: 1024px) {
    font-size: 100px;
  }

  @media (max-width: 768px) {
    font-size: 72px;
  }

  @media (max-width: 480px) {
    font-size: 56px;
  }
`;

const SectionDivider = ({ backgroundColor, textColor = colors.white, text }) => {
  // Process text to handle <br /> tags without displaying them
  const processText = (text) => {
    if (!text) return '';
    
    // Split by <br /> tags and join with actual line breaks
    return text.split(/<br\s*\/?>/gi).join('\n');
  };

  return (
    <DividerContainer $backgroundColor={backgroundColor} data-hide-nav="true">
      <DividerContent>
        <DividerText $textColor={textColor}>
          {processText(text)}
        </DividerText>
      </DividerContent>
    </DividerContainer>
  );
};

export default SectionDivider;

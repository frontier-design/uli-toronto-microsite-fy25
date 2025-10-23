import React from 'react';
import styled from 'styled-components';
import { colors, GridContainer, GridRow, GridColumn } from '../../../styles';

const QuoteContainer = styled.div`
  width: 100vw;
  padding: 60px 0;
  background-color: white;
  margin: 0;

  @media (max-width: 1024px) {
    padding: 40px 0;
  }

  @media (max-width: 768px) {
    padding: 30px 0;
  }

  @media (max-width: 480px) {
    padding: 24px 0;
  }
`;

const QuoteContent = styled.div`
  text-align: left;
  width: 100%;
  padding: 0 20px;
`;

const QuoteText = styled.blockquote`
  hanging-punctuation: first;
  text-indent: -0.25em;
  font-size: 72px;
  color: ${colors.black};
  font-style: normal;
  margin: 0 0 30px 0;
  font-weight: 500;
  letter-spacing: -0.01em;
  font-family: 'Big Shoulders', sans-serif;

  @media (max-width: 1024px) {
    font-size: 56px;
  }

  @media (max-width: 768px) {
    font-size: 44px;
    margin-bottom: 24px;
  }

  @media (max-width: 480px) {
    font-size: 36px;
    margin-bottom: 20px;
  }
`;

const QuoteAttribution = styled.div`
  font-size: 16px;
  color: ${colors.primaryGreen};
  margin-top: 10px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const PullQuote = ({ quote, attribution }) => {
  return (
    <QuoteContainer data-hide-nav="true">
      <GridContainer>
        <GridRow>
          <GridColumn cols={12}>
            <QuoteContent>
              <QuoteText dangerouslySetInnerHTML={{ __html: `"${quote}"` }} />
              {attribution && <QuoteAttribution>{attribution}</QuoteAttribution>}
            </QuoteContent>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </QuoteContainer>
  );
};

export default PullQuote;

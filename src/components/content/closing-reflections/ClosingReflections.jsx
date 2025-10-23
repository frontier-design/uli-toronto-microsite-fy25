import React from 'react';
import styled from 'styled-components';
import {GridContainer, GridRow, GridColumn } from '../../../styles';

const ClosingReflectionsSection = styled.section`
  width: 100%;
  padding: 120px 0;
  background-color: #595277;

  @media (max-width: 1024px) {
    height: auto;
    min-height: 80vh;
    padding: 100px 0;
  }

  @media (max-width: 768px) {
    padding: 80px 0;
  }

  @media (max-width: 480px) {
    padding: 60px 0;
  }
`;

const ClosingReflectionsTitle = styled.h1`
  font-family: 'Big Shoulders', sans-serif;
  font-size: 150px;
  font-weight: 800;
  color: white;
  line-height: 0.9;
  text-transform: uppercase;
  margin: 0 0 60px 0;

  @media (max-width: 1024px) {
    font-size: 90px;
    margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    font-size: 64px;
    margin-bottom: 32px;
  }

  @media (max-width: 480px) {
    font-size: 52px;
    margin-bottom: 24px;
  }
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 400px;
  background-image: url('/images/photos/closing-ref.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 12px;
  margin: 0 0 40px 0;
  
  @media (max-width: 768px) {
    height: 300px;
    margin-bottom: 30px;
  }
  
  @media (max-width: 480px) {
    height: 250px;
    margin-bottom: 24px;
  }
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: white;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    margin-bottom: 18px;
  }
`;

const ClosingReflections = () => {
  return (
    <ClosingReflectionsSection id="closing-reflections" data-closing-reflections="true">
      <GridContainer>
        <GridRow>
          <GridColumn cols={3} mobileCols={0}></GridColumn>
          <GridColumn cols={1} mobileCols={0}></GridColumn>
          <GridColumn cols={8} mobileCols={12}>
            <ClosingReflectionsTitle>
              Closing Reflections
            </ClosingReflectionsTitle>
            <BackgroundImage />
            <Description>
              In a year marked by uncertainty, FY25 affirmed ULI Toronto's resilience and relevance. Our success reflected not only our ability to adapt to shifting economic and political landscapes, but also our steadfast commitment to providing timely insight, connection, and leadership to our members and sponsors.
            </Description>
            <Description>
              As we look ahead, FY26 will demand bold leadership and an even broader reach-building on our momentum to shape the conversations, partnerships, and actions that will define the future of our industry and our cities. Together, we are helping lead the way toward a more sustainable, inclusive, and resilient urban region.
            </Description>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </ClosingReflectionsSection>
  );
};

export default ClosingReflections;

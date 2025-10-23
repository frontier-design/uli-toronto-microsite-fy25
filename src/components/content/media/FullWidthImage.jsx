import React from 'react';
import styled from 'styled-components';
import { GridContainer, GridRow, GridColumn } from '../../../styles';

const ImageContainer = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
  position: relative;
  overflow: hidden;
`;

const FullWidthImage = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'imageUrl',
})`
  width: 100%;
  height: 700px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 12px;
`;

const FullWidthImageComponent = ({ imageUrl }) => {
  return (
    <ImageContainer data-hide-nav="true">
      <GridContainer>
        <GridRow>
          <GridColumn cols={12}>
            <FullWidthImage imageUrl={imageUrl} />
          </GridColumn>
        </GridRow>
      </GridContainer>
    </ImageContainer>
  );
};

export default FullWidthImageComponent;

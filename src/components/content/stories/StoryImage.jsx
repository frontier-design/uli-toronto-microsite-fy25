import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles';

const ImageContainer = styled.div`
  margin: 0 0 40px 0;
  width: 100%;
`;

const ImageWrapper = styled.div`
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  ${props => props.$maxHeight && `max-height: ${props.$maxHeight};`}
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 400px;
  background-color: ${colors.lightGray};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 16px;
`;

const ImageCaption = styled.p`
  font-size: 14px;
  color: ${colors.black};
  opacity: 0.7;
  margin: 8px 0 0 0;
  font-style: italic;
  text-align: center;
`;

const StoryImage = ({ src, alt, caption, maxHeight }) => {
  return (
    <ImageContainer>
      <ImageWrapper>
        {src ? (
          <Image src={src} alt={alt} $maxHeight={maxHeight} />
        ) : (
          <ImagePlaceholder>{alt || 'Image placeholder'}</ImagePlaceholder>
        )}
      </ImageWrapper>
      {caption && <ImageCaption>{caption}</ImageCaption>}
    </ImageContainer>
  );
};

export default StoryImage;

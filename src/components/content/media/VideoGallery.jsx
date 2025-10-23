import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors, GridContainer, GridRow, GridColumn } from '../../../styles';

const VideoGalleryContainer = styled.div`
  width: 100vw;
  padding: 60px 0 40px 0;
  background-color: white;
  margin: 0;
  position: relative;
  z-index: 100;

  @media (max-width: 1024px) {
    padding: 40px 0 30px 0;
  }

  @media (max-width: 768px) {
    padding: 30px 0 24px 0;
  }

  @media (max-width: 480px) {
    padding: 24px 0 20px 0;
  }
`;

const GalleryContent = styled.div`
  width: 100%;
  display: block;
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  min-height: 100px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 16px;
    min-height: auto;
  }

  @media (max-width: 768px) {
    gap: 12px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;

  @media (max-width: 1024px) {
    margin-top: 40px;
    height: auto;
  }

  @media (max-width: 768px) {
    margin-top: 32px;
  }

  @media (max-width: 480px) {
    margin-top: 24px;
  }
`;

const GalleryTitle = styled.h2`
  font-size: 30px;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: ${colors.primaryGreen};

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 12px;
  }
`;

const GalleryDescription = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.black};
  margin: 0 0 30px 0;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 24px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 20px;
  }
`;

const ExploreButton = styled.a`
  background-color: ${colors.mutedGreen};
  color: ${colors.primaryGreen};
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: 400;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: translateY(0);
  display: inline-block;
  align-self: flex-start;

  &:hover {
    background-color: ${colors.primaryGreen};
    color: white;
  }

  @media (max-width: 768px) {
    font-size: 15px;
    padding: 9px 14px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px 12px;
  }
`;

const ThumbnailLink = styled.a`
  flex-grow: ${props => props.$isActive ? '3' : '1'};
  flex-shrink: 1;
  flex-basis: 0;
  height: 700px;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: block;
  background-color: ${colors.lightGray};
  border-radius: 8px;
  min-width: 0;
  z-index: ${props => props.$isActive ? '10' : '1'};

  @media (max-width: 1024px) {
    height: 400px;
    flex-grow: 1 !important;
    flex-basis: auto !important;
    width: 100%;
    transition: none;
    z-index: 1 !important;
  }

  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 480px) {
    height: 250px;
  }
`;

const PlaceholderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: none; /* Prevent image from scaling during container resize */
`;

const ThumbnailOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  color: white;
  padding: 30px 20px;
  opacity: ${props => props.$isActive ? '1' : '0'};
  transform: scale(${props => props.$isActive ? '1' : '0.8'});
  transform-origin: bottom left;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 1024px) {
    opacity: 1 !important;
    transform: scale(1) !important;
    padding: 20px 16px;
    transition: none;
  }

  @media (max-width: 768px) {
    padding: 16px 12px;
  }

  @media (max-width: 480px) {
    padding: 12px 10px;
  }
`;

const ThumbnailTitle = styled.h3`
  font-size: 30px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: white;

  @media (max-width: 1024px) {
    font-size: 20px;
    margin-bottom: 12px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 10px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    margin-bottom: 8px;
  }
`;

const WatchButton = styled.span`
  display: inline-block;
  background-color: ${colors.mutedGreen};
  color: ${colors.primaryGreen};
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${colors.primaryGreen};
    color: white;
  }
`;

const VideoGallery = ({ videos, title, description }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, [isPaused, videos.length]);

  const handleMouseEnter = (index) => {
    setIsPaused(true);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setHoveredIndex(null);
  };

  return (
    <VideoGalleryContainer data-hide-nav="true">
      <GridContainer>
        <GridRow>
          <GridColumn cols={7} mobileCols={12}>
            <GalleryContent>
              <ThumbnailsContainer>
                {videos.map((video, index) => {
                  const isActive = hoveredIndex !== null ? hoveredIndex === index : activeIndex === index;
                  
                  return (
                    <ThumbnailLink
                      key={video.id}
                      href={`https://www.youtube.com/watch?v=${video.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      $isActive={isActive}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <PlaceholderImage 
                        src={video.thumbnailUrl}
                        alt={video.title}
                      />
                      <ThumbnailOverlay $isActive={isActive}>
                        <ThumbnailTitle>{video.title}</ThumbnailTitle>
                        <WatchButton>Watch</WatchButton>
                      </ThumbnailOverlay>
                    </ThumbnailLink>
                  );
                })}
              </ThumbnailsContainer>
            </GalleryContent>
          </GridColumn>
          <GridColumn cols={1} mobileCols={0} />
          <GridColumn cols={4} mobileCols={12}>
            <TextContent>
              {title && <GalleryTitle>{title}</GalleryTitle>}
              {description && (
                <GalleryDescription 
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}
              <ExploreButton 
                href="https://toronto.uli.org/events/national-housing-week-past/national-housing-week-2024/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Explore More
              </ExploreButton>
            </TextContent>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </VideoGalleryContainer>
  );
};

export default VideoGallery;

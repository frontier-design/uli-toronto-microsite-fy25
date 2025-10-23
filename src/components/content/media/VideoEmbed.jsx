import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles';

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 40px 0;
  border: 1px solid ${colors.lightGray};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.01) translateY(-10px);
  }

  @media (max-width: 1024px) {
    margin: 30px 0;
  }

  @media (max-width: 768px) {
    margin: 24px 0;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    margin: 20px 0;
    border-radius: 6px;
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  
  iframe {
    width: 100%;
    height: 500px;
    border: none;
    display: block;

    @media (min-width: 1600px) {
      height: 635px;
    }

    @media (max-width: 1024px) {
      height: 400px;
    }

    @media (max-width: 768px) {
      height: 300px;
    }

    @media (max-width: 480px) {
      height: 250px;
    }
  }
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  transition: all 0.3s ease;
  z-index: 10;
  pointer-events: auto;

  @media (max-width: 1024px) {
    padding: 24px;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

const OverlayText = styled.h3`
  color: white;
  font-size: 45px;
  font-weight: 600;
  margin: 0 0 16px 0;

  @media (max-width: 1024px) {
    font-size: 32px;
    margin-bottom: 12px;
  }

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 10px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    margin-bottom: 8px;
  }
`;

const WatchButton = styled.span`
  width: fit-content;
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

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 7px 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 12px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  margin-bottom: 60px;

  @media (max-width: 1024px) {
    margin-top: 16px;
    margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    margin-top: 12px;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    margin-top: 10px;
    margin-bottom: 24px;
  }
`;

const ExternalButton = styled.a`
  background-color: ${colors.mutedGreen};
  color: ${colors.primaryGreen};
  border: none;
  border-radius: 8px;
  padding: 15px;
  font-size: 16px;
  font-weight: 400;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: translateY(0);
  
  &:hover {
    background-color: ${colors.primaryGreen};
    color: white;
    transform: translateY(-2px);
  }

  @media (max-width: 1024px) {
    font-size: 15px;
    padding: 14px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 12px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 10px;
  }
`;

const VideoEmbed = ({ embedHtml, buttonText, buttonLink, videoRef, videoTitle = "A Tale of <br /> Two Homes" }) => {
  // Extract video ID from embed HTML to create YouTube URL
  const extractVideoId = (html) => {
    const match = html.match(/embed\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };
  
  const videoId = extractVideoId(embedHtml);
  const youtubeUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : null;
  
  const handleClick = () => {
    if (youtubeUrl) {
      window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
    }
  };
  
  return (
    <div ref={videoRef}>
      <VideoWrapper onClick={handleClick}>
        <VideoContainer 
          dangerouslySetInnerHTML={{ __html: embedHtml }}
        />
        <VideoOverlay>
          <OverlayText dangerouslySetInnerHTML={{ __html: videoTitle }} />
          <WatchButton>Watch The Full Video </WatchButton>
        </VideoOverlay>
      </VideoWrapper>
      {buttonText && buttonLink && (
        <ButtonContainer>
          <ExternalButton href={buttonLink} target="_blank" rel="noopener noreferrer">
            {buttonText}
          </ExternalButton>
        </ButtonContainer>
      )}
    </div>
  );
};

export default VideoEmbed;

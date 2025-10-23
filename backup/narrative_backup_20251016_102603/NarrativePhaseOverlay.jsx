import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OverlayWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(rgb(255, 255, 255, 0) 20%, rgba(255, 255, 255, 1) 50%);
  z-index: 30000;
  padding-top: 100px;
  padding-bottom: 100px;
  transform: translateY(100vh);
  will-change: transform;
`;

const ImageGridContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const ImageItem = styled.div`
  position: absolute;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const ParallaxText = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 0 40px;
  text-align: center;
  z-index: 100;
  margin-top: -100px;

  
  p {
    font-size: 48px;
    line-height: 1.3;
    font-weight: 500;
    color: ${colors.black};
    margin: 0;
  }

  @media (max-width: 1024px) {
    p {
      font-size: 32px;
    }
  }

  @media (max-width: 768px) {
    padding: 0 30px;
    
    p {
      font-size: 28px;
    }
  }

  @media (max-width: 480px) {
    padding: 0 20px;
    
    p {
      font-size: 24px;
    }
  }
`;

// Default images configuration
const defaultImages = [
  {
    src: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80',
    alt: 'Toronto CN Tower skyline',
    width: '240px',
    height: '320px',
    top: '10%',
    left: '8%',
    speed: 1.5,
    rotation: -2,
  },
  {
    src: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=800&q=80',
    alt: 'People working together at table',
    width: '280px',
    height: '340px',
    top: '50%',
    left: '12%',
    speed: 1.2,
    rotation: 3,
  },
  {
    src: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=800&q=80',
    alt: 'Toronto downtown buildings',
    width: '300px',
    height: '240px',
    top: '25%',
    right: '10%',
    speed: 0.8,
    rotation: -3,
  },
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    alt: 'Team working together',
    width: '260px',
    height: '320px',
    top: '8%',
    right: '38%',
    speed: 0.9,
    rotation: 2,
  },
  {
    src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80',
    alt: 'Toronto waterfront',
    width: '320px',
    height: '260px',
    top: '62%',
    right: '18%',
    speed: 1.3,
    rotation: -1,
  },
  {
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
    alt: 'Urban community collaboration',
    width: '240px',
    height: '300px',
    top: '35%',
    left: '42%',
    speed: 0.7,
    rotation: 1,
  },
];

const NarrativePhaseOverlay = ({ images = [] }) => {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    // Parallax animations temporarily disabled
    // They trigger during the narrative pin scroll which is not desired
    // Will need to enable them only after the overlay is fully visible
    
    return () => {};
  }, [images]);

  const displayImages = images.length > 0 ? images : defaultImages;

  return (
    <OverlayWrapper className="narrative-overlay" data-narrative="true">
      <ImageGridContainer ref={containerRef}>
        {displayImages.map((image, index) => (
          <ImageItem
            key={index}
            className="parallax-image"
            ref={(el) => (imageRefs.current[index] = el)}
            style={{
              width: image.width,
              height: image.height,
              top: image.top,
              left: image.left,
              right: image.right,
              bottom: image.bottom,
              zIndex: image.zIndex || index,
            }}
          >
            <img src={image.src} alt={image.alt || `Narrative image ${index + 1}`} />
          </ImageItem>
        ))}
      </ImageGridContainer>
      <ParallaxText>
        <p>ULI Toronto is the one place where developers, designers, planners, capital, and public leaders meet as equals to shape better urban places.</p>
      </ParallaxText>
    </OverlayWrapper>
  );
};

export default NarrativePhaseOverlay;

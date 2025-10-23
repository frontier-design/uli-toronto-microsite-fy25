import React from 'react';
import styled from 'styled-components';
import { colors, GridContainer, GridRow, GridColumn } from '../../../styles';
import { useGSAP, gsap } from '../../../hooks/useGSAP';

const ConveneContainer = styled.section`
  min-height: 300vh;
  width: 100%;
  background-color: ${colors.white};
  position: relative;
`;

const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  width: 100%;
`;

const LeftContent = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const Title = styled.h2`
  font-size: 48px;
  line-height: 1.2;
  font-weight: 500;
  color: ${colors.black};
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3em;

  @media (max-width: 1024px) {
    font-size: 48px;
  }

  @media (max-width: 768px) {
    font-size: 36px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const Word = styled.span`
  display: inline-block;
  overflow: hidden;
  
  span {
    display: inline-block;
  }
`;

const RightContent = styled.div`
  position: relative;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  transform-origin: center center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

// Placeholder images - will be replaced with actual images
const images = [
  {
    src: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=1200&q=80',
    alt: 'Team collaboration 2',
    width: '85%',
    height: '70%',
  },
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
    alt: 'Team collaboration 3',
    width: '68%',
    height: '78%',
  },
  {
    src: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=1200&q=80',
    alt: 'Team collaboration 4',
    width: '80%',
    height: '88%',
  },
];

const ConveneSection = () => {
  const containerRef = useGSAP(() => {
    const imageWrappers = containerRef.current?.querySelectorAll('.convene-image');
    const titleWords = containerRef.current?.querySelectorAll('.convene-word span');
    
    if (!imageWrappers || imageWrappers.length === 0) return;

    // Set initial state for title words
    if (titleWords) {
      gsap.set(titleWords, { y: 60, opacity: 0 });
    }

    // Define unique rotation and scale values for each image
    const finalRotations = [-3, 5, -6, 4, -5, 6.5];
    const finalScales = [0.9, 1.05, 0.88];

    // Set initial states for each image
    imageWrappers.forEach((wrapper, index) => {
      gsap.set(wrapper, {
        opacity: 0,
        scale: 1.2,
        rotation: (index % 2 === 0 ? 8 : -8)
      });
    });

    // Create scroll-triggered timeline
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    // Animate title words first
    if (titleWords) {
      scrollTl.to(titleWords, {
        y: 0,
        opacity: 1,
        duration: 0.15,
        stagger: 0.035,
        ease: "power2.out"
      }, 0);
    }

    // Calculate duration for each image with overlap
    const imageDuration = 1 / images.length;
    const overlap = 0.15; // 15% overlap between transitions

    images.forEach((_, index) => {
      const startTime = 0.2 + (index * (imageDuration - overlap));
      const fadeInDuration = imageDuration * 0.3;

      // Fade in with unique scale and rotation for stacking effect
      scrollTl.to(imageWrappers[index], {
        opacity: 1,
        scale: finalScales[index] || 1,
        rotation: finalRotations[index] || 0,
        duration: fadeInDuration,
        ease: 'none'
      }, startTime);
    });
  });

  return (
    <ConveneContainer ref={containerRef} id="convene" data-narrative="true">
      <StickyWrapper>
        <GridContainer>
          <GridRow>
            <GridColumn cols={6}>
              <LeftContent>
                <Title className="convene-title">
                  {`We convene the teams that build cities.`.split(' ').map((word, index) => (
                    <Word key={index} className="convene-word">
                      <span>{word}</span>
                    </Word>
                  ))}
                </Title>
              </LeftContent>
            </GridColumn>
            <GridColumn cols={6}>
              <RightContent>
                {images.map((image, index) => (
                  <ImageWrapper 
                    key={index} 
                    className="convene-image"
                    style={{
                      width: image.width,
                      height: image.height,
                    }}
                  >
                    <img src={image.src} alt={image.alt} />
                  </ImageWrapper>
                ))}
              </RightContent>
            </GridColumn>
          </GridRow>
        </GridContainer>
      </StickyWrapper>
    </ConveneContainer>
  );
};

export default ConveneSection;


import React from 'react';
import styled from 'styled-components';
import {
  colors,
  GridContainer,
  GridRow,
  GridColumn
} from '../../../styles';
import { useGSAP, gsap } from '../../../hooks/useGSAP';
import torontoVid from '../../../assets/videos/torontoVid.mov';
import NarrativePhaseOverlay from './NarrativePhaseOverlay';

const NarrativeContainer = styled.section`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: ${colors.primaryGreen};
  position: relative;
  z-index: 100;
`;

const NarrativeContent = styled.div`
  width: 100%;
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 10;
  padding: 40px;
`;

const VideoContainer = styled.div`
  width: 100%;
  height: 60vh;
  position: relative;
  overflow: hidden;
  --mask-width: 100%;
  border-radius: 12px;
  transform-origin: center center;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: var(--mask-width);
    height: 100%;
    background-color: ${colors.primaryGreen};
    z-index: 2;
    transform-origin: left center;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextContainer = styled.div`
  width: 78%;
  margin: 0 auto;
  text-align: center;
  margin-top: 50px;
`;

const TextBlock = styled.div`
  font-size: 48px;
  width: 50%;
  margin: 0 auto;
  font-weight: 500;
  /* text-transform: uppercase; */
  color: ${colors.white};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.3em;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;


  @media (max-width: 768px) {
    font-size: 48px;
  }

  @media (max-width: 480px) {
    font-size: 36px;
  }
`;

const Word = styled.span`
  display: inline-block;
  overflow: hidden;
  

  span {
    display: inline-block;
  }

  &.big-shoulders {
    font-family: 'Big Shoulders', sans-serif;
    font-weight: 400;
    text-transform: uppercase;
    font-size: 150px;

  }
`;

const TextWrapper = styled.div`
  position: relative;
  min-height: 120px;
`;

const VideoGradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
  z-index: 5;
  opacity: ${props => props.$opacity};
`;

const VideoOverlayText = styled.div`
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 48px;
  width: 80%;
  font-weight: 500;
  color: white;
  text-align: center;
  z-index: 10;
  line-height: 1.1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.3em;

  @media (max-width: 1024px) {
    width: 85%;
  }

  @media (max-width: 768px) {
    font-size: 28px;
    width: 90%;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    width: 95%;
  }
`;

const HighlightText = styled.span`
  color: white;
  transition: all 0.3s ease;
  display: inline-flex;
  gap: 0.3em;
  
  &.highlighted .highlight-word span {
    background-color: ${colors.mutedGreen};
    color: ${colors.primaryGreen};
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
`;

const Narrative = () => {

  const containerRef = useGSAP(() => {
    const videoElement = containerRef.current?.querySelector('.video-container');
    const text1 = containerRef.current?.querySelector('.text-1');
    const text2 = containerRef.current?.querySelector('.text-2');
    const text3 = containerRef.current?.querySelector('.text-3');
    const words1 = containerRef.current?.querySelectorAll('.word-1 span');
    const words2 = containerRef.current?.querySelectorAll('.word-2 span');
    const words3 = containerRef.current?.querySelectorAll('.word-3 span');
    const gradientOverlay = containerRef.current?.querySelector('.gradient-overlay');
    const highlightText = containerRef.current?.querySelector('.highlight-text');
    const stickyContainer = containerRef.current?.querySelector('[data-narrative="true"]');
    const gridContainer = containerRef.current?.querySelector('.grid-container');
    const gridColumn = containerRef.current?.querySelector('.grid-column');
    const narrativeOverlay = containerRef.current?.querySelector('.narrative-overlay');
    const overlayImages = containerRef.current?.querySelectorAll('.narrative-overlay .parallax-image');

    if (!videoElement || !text1 || !text2 || !text3 || !gradientOverlay || !highlightText || !stickyContainer || !gridContainer || !gridColumn || !narrativeOverlay) return;

    // Initial states
    gsap.set(words1, { y: 60, opacity: 0 });
    gsap.set(words2, { y: 60, opacity: 0 });
    gsap.set(words3, { y: 60, opacity: 0 });
    gsap.set(narrativeOverlay, { y: '100vh' }); // Start below viewport
    
    // Set initial rotation for overlay images
    if (overlayImages) {
      overlayImages.forEach((img, index) => {
        const rotations = [-2, 3, -3, 2, -1, 1];
        gsap.set(img, { rotation: rotations[index] || 0 });
      });
    }

    // Slower, scroll-linked sequence (no forced jumps)
    const sequenceTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=350%",   // Extended for overlay animation
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    // Phase 1: reveal + first text (slow)
    sequenceTl.to(videoElement, {
      '--mask-width': '0%',
      duration: 0.35,
      ease: "none"
    }, 0)
    .to(words1, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.035,
      ease: "power2.out"
    }, 0.10)

    // Pause 1 (long)
    .to({}, { duration: 1.00, ease: "none" }, 0.34)
    
    // Phase 2: first out, second in (slow in/out)
    .to(words1, {
      y: -60,
      opacity: 0,
      duration: 0.18,
      stagger: 0.02,
      ease: "power2.in"
    }, 1.34)
    .to(words2, {
      y: 0,
      opacity: 1,
      duration: 0.26,
      stagger: 0.035,
      ease: "power2.out"
    }, 1.40)

    // Pause 2
    .to({}, { duration: 0.90, ease: "none" }, 1.66)
    
    // Phase 3: second out + expand video (slow)
    .to(words2, {
      y: -60,
      opacity: 0,
      duration: 0.5,
      stagger: 0.02,
      ease: "power2.in"
    }, 2.56)
    .to(videoElement, {
      width: '100vw',
      height: '100vh',
      borderRadius: '0px',
      duration: 0.5,
      ease: "none"
    }, 2.56)
    .to(stickyContainer, {
      padding: '0px',
      width: '100vw',
      duration: 0.20,
      ease: "none"
    }, 2.56)
    .to(gridContainer, {
      paddingLeft: '0px',
      paddingRight: '0px',
      marginLeft: '0px',
      marginRight: '0px',
      gap: '0px',
      maxWidth: 'none',
      duration: 0.20,
      ease: "none"
    }, 2.56)
    .to(gridColumn, {
      paddingLeft: '0px',
      paddingRight: '0px',
      marginLeft: '0px',
      marginRight: '0px',
      width: '100%',
      duration: 0.20,
      ease: "none"
    }, 2.56)

    // Pause 3
    .to({}, { duration: 0.70, ease: "none" }, 2.76)
    
    // Phase 4: gradient + third text (slow)
    .to(gradientOverlay, {
      opacity: 0.5,
      duration: 0.18,
      ease: "none"
    }, 3.46)
    .to(words3, {
      y: 0,
      opacity: 1,
      duration: 0.26,
      stagger: 0.025,
      ease: "power2.out"
    }, 3.50)

    // Pause 4
    .to({}, { duration: 0.80, ease: "none" }, 3.76)
    
    // Phase 5: highlight (unchanged logic, slower context)
    .call(() => {
      highlightText.classList.add('highlighted');
    }, null, 4.56)

    // Big Pause after highlight - let it be fully seen and read
    .to({}, { duration: 3.00, ease: "none" }, 4.56)
    
    // Phase 6: Narrative overlay slides up to cover the video
    .to(narrativeOverlay, {
      y: '0vh',
      duration: 2.00,   // Smooth slide up over the video
      ease: "none"
    }, 7.56);
    
    // Animate overlay images during the overlay slide
    if (overlayImages && overlayImages.length > 0) {
      const speeds = [1.5, 1.2, 0.8, 0.9, 1.3, 0.7];
      const rotationDeltas = [8, -8, 10, -10, 6, -6];
      
      overlayImages.forEach((img, index) => {
        const speed = speeds[index] || 1;
        const rotationDelta = rotationDeltas[index] || 0;
        const currentRotation = [-2, 3, -3, 2, -1, 1][index] || 0;
        
        sequenceTl.to(img, {
          y: -180 * speed,
          rotation: currentRotation + rotationDelta,
          duration: 2.00,
          ease: "none"
        }, 7.56);
      });
    }
  });

  return (
    <NarrativeContainer id="narrative" ref={containerRef}>
      <NarrativeContent>
        <StickyContainer data-narrative="true">
          <GridContainer className="grid-container">
            <GridRow>
              <GridColumn className="grid-column" cols={12}>
                <VideoContainer className="video-container">
                  <Video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    controls={false}
                  >
                    <source src={torontoVid} type="video/mp4" />
                    Your browser does not support the video tag.
                  </Video>
                  <VideoGradientOverlay className="gradient-overlay" style={{ opacity: 0 }} />
                  <VideoOverlayText className="text-3">
                    {`That inevitable progress is no accident. It's the result of building, thinking, and`.split(' ').map((word, index) => (
                      <Word key={index} className="word-3">
                        <span>{word}</span>
                      </Word>
                    ))}
                    <HighlightText className="highlight-text">
                      <Word className="word-3 highlight-word">
                        <span>working together.</span>
                      </Word>
                    </HighlightText>
                  </VideoOverlayText>
                </VideoContainer>
                
                <TextContainer>
                  <TextWrapper>
                    <TextBlock className="text-1">
                      {`There have always been and will always be challenging cycles.`.split(' ').map((word, index) => {
                        const isChallengingCycles = word === 'challenging' || word === 'cycles.';
                        return (
                          <Word key={index} className={`word-1 ${isChallengingCycles ? 'big-shoulders' : ''}`}>
                            <span>{word}</span>
                          </Word>
                        );
                      })}
                    </TextBlock>
                    <TextBlock className="text-2">
                      {`But just as change is inevitable, so is renewal.`.split(' ').map((word, index) => (
                        <Word key={index} className="word-2">
                          <span>{word}</span>
                        </Word>
                      ))}
                    </TextBlock>
                  </TextWrapper>
                </TextContainer>
              </GridColumn>
            </GridRow>
          </GridContainer>
        </StickyContainer>
      </NarrativeContent>
      <NarrativePhaseOverlay />
    </NarrativeContainer>
  );
};

export default Narrative;
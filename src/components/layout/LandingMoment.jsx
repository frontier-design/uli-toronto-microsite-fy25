import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import {
  colors,
  GridContainer,
  GridRow,
  GridColumn
} from '../../styles';
import { useGSAP, fadeInUp, fadeInLeft, scaleIn, gsap } from '../../hooks/useGSAP';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import videoSrc from '../../assets/videos/ULIToronto_WebVideo.mp4';
import backgroundVideoSrc from '../../assets/videos/ULIToronto_WebVideoCompressed.mp4';

gsap.registerPlugin(ScrollTrigger);

const LandingContainer = styled.div`
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  @media (max-width: 1024px) {
    min-height: 100vh;
    min-height: 100svh;
  }

  @media (min-width: 1025px) {
    cursor: none;
  }
`;

const VideoPosterBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -3;
  background-image: url('/images/video-poster.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
  background: transparent;
  
  @media (max-width: 768px) {
    /* Ensure video displays on mobile */
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    min-height: 100%;
    min-width: 100%;
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.5) 40%, transparent 100%);
  z-index: -1;
`;

const CustomCursor = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  background-color: ${colors.mutedGreen};
  color: ${colors.primaryGreen};
  padding: 14px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
  opacity: 0;
  transition: opacity 0.2s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
  will-change: transform, opacity;

  &.visible {
    opacity: 1;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const PlayIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  min-height: 100vh;
  min-height: 100svh;
  padding: 40px 0;
  position: relative;
  z-index: 1;

  @media (max-width: 1024px) {
    align-items: flex-end;
    padding-top: 120px;
    padding-bottom: 60px;
    min-height: 100vh;
    min-height: 100svh;
  }

  @media (max-width: 768px) {
    padding: 20px 0;
    padding-top: 100px;
    padding-bottom: 40px;
  }

  @media (max-width: 480px) {
    padding: 16px 0;
    padding-top: 90px;
    padding-bottom: 30px;
  }
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  align-self: flex-end;

  h1 {
    margin-bottom: 20px;
    font-size: 70px;
    line-height: 1.1;
    letter-spacing: -0.03em;
    font-family: 'Big Shoulders', sans-serif;
    font-weight: 800;
    color: white;

    @media (min-width: 1600px) {
      font-size: 90px;
    }

    @media (max-width: 1024px) {
      font-size: 56px;
    }

    @media (max-width: 768px) {
      font-size: 48px;
    }

    @media (max-width: 480px) {
      font-size: 36px;
    }
  }

  @media (max-width: 1024px) {
    justify-content: flex-end;
    align-self: flex-end;
    margin-bottom: 0;
    padding-top: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 0;
    padding-top: 0;
  }

  @media (max-width: 480px) {
    margin-bottom: 0;
    padding-top: 0;
  }
`;

const CategoryText = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: white;
  margin-bottom: 10px;

  @media (min-width: 1600px) {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 10px;
  }
`;


const CTAButton = styled.a`
  background-color: ${colors.mutedGreen};
  color: ${colors.primaryGreen};
  border: none;
  border-radius: 8px;
  padding: 15px;
  font-size: 16px;
  font-weight: 400;
  align-self: flex-start;
  margin-bottom: 60px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background-color: ${colors.primaryGreen};
    color: white;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (min-width: 1600px) {
    font-size: 18px;
    padding: 17px;
  }

  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 15px;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    padding: 12px 24px;
    font-size: 14px;
    margin-bottom: 24px;
  }
`;

const LandAcknowledgement = styled.a`
  color: white;
  text-decoration: none;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: ${colors.mutedGreen};
    transform: translateX(4px);
  }

  @media (min-width: 1600px) {
    font-size: 18px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

// Video Modal Components
const VideoModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20000;
  padding: 20px;
  opacity: ${props => props.$isOpen ? 1 : 0};
  pointer-events: ${props => props.$isOpen ? 'all' : 'none'};
  transition: opacity 0.3s ease;
`;

const VideoModalWrapper = styled.div`
  position: relative;
  width: 90%;
  max-width: 1200px;
  transform: ${props => props.$isOpen ? 'scale(1)' : 'scale(0.9)'};
  transition: transform 0.3s ease;

  @media (min-width: 1600px) {
    max-width: 1400px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const VideoModalHeader = styled.div`
  position: absolute;
  top: -50px;
  right: 0px;
  z-index: 10;

  @media (max-width: 768px) {
    top: -45px;
  }
`;

const VideoModalContent = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 12px;
  overflow: hidden;
  background-color: #000;

  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

// Land Acknowledgement Modal Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20000;
  padding: 20px;
  padding-top: 70px;
  opacity: ${props => props.$isOpen ? 1 : 0};
  pointer-events: ${props => props.$isOpen ? 'all' : 'none'};
  transition: opacity 0.3s ease;

  @media (max-width: 768px) {
    padding-top: 20px;
  }
`;

const ModalWrapper = styled.div`
  position: relative;
  max-width: 1200px;
  width: 100%;
  transform: ${props => props.$isOpen ? 'scale(1)' : 'scale(0.9)'};
  transition: transform 0.3s ease;

  @media (min-width: 1600px) {
    max-width: 1500px;
  }

  @media (max-width: 1024px) {
    max-width: 900px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ModalContent = styled.div`
  border-radius: 0;
  width: 100%;
  max-height: 90vh;
  background-color: ${colors.white};
  overflow-y: auto;
  border-radius: 12px;

  @media (max-width: 768px) {
    max-height: 85vh;
  }
`;

const ModalHeader = styled.div`
  position: absolute;
  top: -50px;
  right: 0px;
  z-index: 10;

  @media (max-width: 768px) {
    top: auto;
    bottom: calc(100% + 10px);
    right: 0px;
  }
`;

const ModalTitle = styled.h2`
  font-family: 'Big Shoulders', sans-serif;
  font-size: 72px;
  font-weight: 800;
  margin: 0 0 40px 0;
  color: ${colors.primaryGreen};
  line-height: 1.1;
  letter-spacing: -0.02em;

  @media (min-width: 1600px) {
    font-size: 85px;
  }

  @media (max-width: 768px) {
    font-size: 48px;
    margin-bottom: 32px;
  }

  @media (max-width: 480px) {
    font-size: 36px;
    margin-bottom: 24px;
  }
`;

const CloseButton = styled.button`
  background-color: ${colors.primaryGreen};
  border: none;
  font-size: 15px;
  font-weight: 500;
  color: ${colors.white};
  cursor: pointer;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.3s ease;
  flex-shrink: 0;
  font-family: 'Roboto', sans-serif;

  &:hover {
    background-color: ${colors.mutedGreen};
    color: ${colors.primaryGreen};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ModalBody = styled.div`
  padding: 60px 70px;
  display: flex;
  gap: 60px;

  @media (min-width: 1600px) {
    padding: 80px 90px;
    gap: 80px;
  }

  @media (max-width: 768px) {
    padding: 40px 30px;
    flex-direction: column;
    gap: 40px;
  }

  @media (max-width: 480px) {
    padding: 32px 24px;
    gap: 32px;
  }
`;

const ModalLeftColumn = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
`;

const ModalRightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const ImageStack = styled.div`
  position: relative;
  width: 100%;
  height: 550px;

  @media (min-width: 1600px) {
    height: 650px;
  }

  @media (max-width: 768px) {
    height: 450px;
  }
`;

const StackedImage = styled.div`
  position: absolute;
  background-color: ${colors.lightGray};
  background-image: url(${props => props.$bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transform: ${props => props.$transform};
  z-index: ${props => props.$zIndex};

  @media (min-width: 1600px) {
    &.image-1 {
      height: 240px !important;
      top: 0 !important;
    }
    &.image-2 {
      height: 240px !important;
      top: 205px !important;
    }
    &.image-3 {
      height: 220px !important;
      bottom: 0 !important;
    }
  }
`;

const ModalText = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  line-height: 1.6;
  color: ${colors.black};
  margin: 0;
  max-width: 100%;
  font-weight: 400;

  @media (min-width: 1600px) {
    font-size: 20px;
    line-height: 1.7;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

const HighlightedLink = styled.a`
  background-color: ${colors.mutedGreen};
  color: ${colors.primaryGreen};
  padding: 2px 4px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;

  &:hover {
    background-color: ${colors.primaryGreen};
    color: white;
  }
`;

const LandingMoment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  
  const videoModalRef = useRef(null);
  const videoBackgroundRef = useRef(null);
  const cursorRef = useRef(null);
  const lastX = useRef(0);

  const handleOpenModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  // Video Modal handlers
  const handleOpenVideoModal = () => {
    setIsVideoModalOpen(true);
    setIsCursorVisible(false);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
    document.body.style.overflow = 'unset';
    // Pause the video when closing
    if (videoModalRef.current) {
      videoModalRef.current.pause();
    }
  };

  const handleVideoOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseVideoModal();
    }
  };

  // Auto-play video when modal opens
  useEffect(() => {
    if (isVideoModalOpen && videoModalRef.current) {
      // Small delay to ensure modal is fully rendered
      const timer = setTimeout(() => {
        if (videoModalRef.current) {
          videoModalRef.current.play().catch(err => {
            console.log('Video autoplay failed:', err);
          });
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isVideoModalOpen]);

  // Optimize background video for mobile performance
  useEffect(() => {
    const video = videoBackgroundRef.current;
    if (!video) return;

    // Force load the video
    video.load();
    
    // Ensure video plays
    const ensureVideoPlays = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log('Video autoplay blocked, waiting for interaction:', err);
          // Try again after user interaction
          const tryPlay = () => {
            video.play().catch(() => {});
            document.removeEventListener('touchstart', tryPlay);
            document.removeEventListener('touchend', tryPlay);
            document.removeEventListener('click', tryPlay);
            document.removeEventListener('scroll', tryPlay);
          };
          document.addEventListener('touchstart', tryPlay, { once: true, passive: true });
          document.addEventListener('touchend', tryPlay, { once: true, passive: true });
          document.addEventListener('click', tryPlay, { once: true });
          document.addEventListener('scroll', tryPlay, { once: true, passive: true });
        });
      }
    };

    // Multiple event listeners to ensure video plays
    const handleCanPlay = () => {
      ensureVideoPlays();
    };
    
    const handleLoadedMetadata = () => {
      ensureVideoPlays();
    };

    video.addEventListener('canplay', handleCanPlay, { once: true });
    video.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true });
    video.addEventListener('loadeddata', ensureVideoPlays, { once: true });
    
    // Try immediately if already ready
    if (video.readyState >= 1) {
      ensureVideoPlays();
    }
    
    // Fallback timeout
    const timeout = setTimeout(() => {
      ensureVideoPlays();
    }, 2000);

    // Handle visibility changes to pause when not visible (saves battery on mobile)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearTimeout(timeout);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', ensureVideoPlays);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Custom cursor handlers
  const handleMouseMove = (e) => {
    if (!cursorRef.current) return;
    
    // Check if hovering over interactive elements
    const isInteractive = e.target.closest('a, button');
    if (isInteractive) {
      setIsCursorVisible(false);
      return;
    }
    
    // Only show cursor if we're in the landing section
    if (!isCursorVisible) {
      setIsCursorVisible(true);
    }
    
    const x = e.clientX;
    const y = e.clientY;
    
    // Calculate horizontal velocity for rotation
    const deltaX = x - lastX.current;
    lastX.current = x;
    
    // Smoothly tilt the cursor based on movement speed
    // Max tilt of 12 degrees
    const rotation = Math.max(-12, Math.min(12, deltaX * 0.8));

    gsap.to(cursorRef.current, {
      x: x,
      y: y,
      xPercent: -50,
      yPercent: -50,
      rotation: rotation,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto"
    });
  };

  const handleMouseEnter = (e) => {
    // Set initial position before showing cursor
    if (cursorRef.current) {
      gsap.set(cursorRef.current, { 
        x: e.clientX, 
        y: e.clientY,
        xPercent: -50,
        yPercent: -50,
        scale: 0.8 
      });
    }
    setIsCursorVisible(true);
    gsap.to(cursorRef.current, { 
      scale: 1, 
      duration: 0.3, 
      ease: "back.out(1.7)" 
    });
  };

  const handleMouseLeave = () => {
    setIsCursorVisible(false);
    gsap.to(cursorRef.current, { 
      scale: 0.8, 
      duration: 0.3, 
      ease: "power2.in" 
    });
  };

  const handleInteractiveEnter = () => {
    setIsCursorVisible(false);
  };

  const handleInteractiveLeave = () => {
    // Only show cursor again if we're still in the landing section
    setIsCursorVisible(true);
  };

  const handleLandingClick = (e) => {
    // Don't open video modal if clicking on interactive elements
    const isInteractive = e.target.closest('a, button');
    if (!isInteractive) {
      handleOpenVideoModal();
    }
  };

  const containerRef = useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    
    // Animate category text
    tl.fromTo('.category-text', fadeInUp, {
      ...fadeInUp,
      opacity: 1,
      y: 0,
      duration: 0.6
    })
    // Then animate the main title
    .fromTo('.main-title', fadeInLeft, {
      ...fadeInLeft,
      opacity: 1,
      x: 0,
      duration: 0.6
    }, "-=0.3")
    // Animate CTA button and land acknowledgement simultaneously
    .fromTo('.cta-button', scaleIn, {
      ...scaleIn,
      opacity: 1,
      scale: 1,
      duration: 0.5
    }, "-=0.2")
    .fromTo('.land-acknowledgement', fadeInUp, {
      ...fadeInUp,
      opacity: 1,
      y: 0,
      duration: 0.2
    }, "-=0.2");
  });

  return (
    <>
      <CustomCursor 
        ref={cursorRef}
        className={isCursorVisible ? 'visible' : ''} 
      >
        See the Full Video
      </CustomCursor>

      <LandingContainer 
        id="landing" 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleLandingClick}
      >
        {/* Poster image as fallback background - always visible behind video */}
        <VideoPosterBackground />
        <VideoBackground
          ref={videoBackgroundRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/video-poster.jpg"
          preload="auto"
          onError={(e) => {
            console.error('Background video failed to load:', e);
          }}
          onLoadedData={() => {
            console.log('Background video loaded successfully');
          }}
        >
          {/* Compressed MP4 - works on all browsers including iOS/Safari */}
          <source src={backgroundVideoSrc} type="video/mp4" />
        </VideoBackground>
        <GradientOverlay />
        <MainContent>
          <GridContainer>
            <GridRow>
              {/* Left Content - 8 columns on desktop for better readability, 12 on mobile/tablet */}
              <GridColumn cols={8}>
                <LeftContent>
                  <CategoryText className="category-text">ULI Toronto FY25 Annual Impact Report</CategoryText>
                  <h1 className="main-title">
                    Meeting the Moment: <br />
                    Leadership for a New<br />
                    Urban Future
                  </h1>
                  <CTAButton 
                    href="https://toronto.uli.org/about/membership/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="cta-button"
                    onMouseEnter={handleInteractiveEnter}
                    onMouseLeave={handleInteractiveLeave}
                  >
                    Become a Member
                  </CTAButton>
                  <LandAcknowledgement 
                    href="#" 
                    onClick={handleOpenModal} 
                    className="land-acknowledgement"
                    onMouseEnter={handleInteractiveEnter}
                    onMouseLeave={handleInteractiveLeave}
                  >
                    Land Acknowledgement ↗
                  </LandAcknowledgement>
                </LeftContent>
              </GridColumn>
            </GridRow>
          </GridContainer>
        </MainContent>

        {/* Land Acknowledgement Modal */}
        <ModalOverlay $isOpen={isModalOpen} onClick={handleOverlayClick}>
          <ModalWrapper $isOpen={isModalOpen}>
            <ModalHeader>
              <CloseButton onClick={handleCloseModal} aria-label="Close modal">
                Close
              </CloseButton>
            </ModalHeader>
            <ModalContent>
              <ModalBody>
                <ModalLeftColumn>
                  <ModalTitle>Land Acknowledgement</ModalTitle>
                  <ModalText>
                    ULI Toronto acknowledges that the land on which we work is the traditional territory of many nations, including the Mississaugas of the Credit, the Anishnabeg, the Chippewa, the Haudenosaunee, and the Wendat peoples. This territory is covered by Treaty 13 with the Mississaugas of the Credit and is now home to many diverse First Nations, Inuit, and Métis peoples.
                    <br /><br />
                    As city builders with privileged access to land, we have an obligation to walk the path of reconciliation. In FY25, ULI Toronto deepened this commitment through <HighlightedLink href="https://toronto.uli.org/getinvolved/truth-and-reconciliation/" target="_blank" rel="noopener noreferrer">Canada's first Truth & Reconciliation guide for the real estate industry</HighlightedLink>: Answering the Call to Action 92, developed in partnership with the Shared Path Consultation Initiative and Indigenous leaders.
                  </ModalText>
                </ModalLeftColumn>
                <ModalRightColumn>
                  <ImageStack>
                    <StackedImage 
                      $bgImage="https://ulidigitalmarketing.blob.core.windows.net/ulidcnc/sites/14/2024/09/ULI_Shared-Path-Workshop-1-Group-photo_June-2022-480x297.png"
                      $transform="rotate(-3deg)"
                      $zIndex={1}
                      className="image-1"
                      style={{
                        width: '85%',
                        height: '200px',
                        top: '0',
                        left: '5%'
                      }}
                    />
                    <StackedImage 
                      $bgImage="https://ulidigitalmarketing.blob.core.windows.net/ulidcnc/sites/14/2024/09/Indigenous-Relations-Workshop-1-Shared-Path-Chair-Carolyn-King-and-ULI-Toronto-Executive-Director-Richard-Joy-480x320.jpg"
                      $transform="rotate(2deg)"
                      $zIndex={2}
                      className="image-2"
                      style={{
                        width: '75%',
                        height: '200px',
                        top: '175px',
                        right: '8%'
                      }}
                    />
                    <StackedImage 
                      $bgImage="https://ulidigitalmarketing.blob.core.windows.net/ulidcnc/sites/14/2024/09/Mural_U-of-T_Que-Rock_Nipissing-First-Nation-480x360.jpg"
                      $transform="rotate(-2deg)"
                      $zIndex={3}
                      className="image-3"
                      style={{
                        width: '70%',
                        height: '180px',
                        bottom: '0',
                        left: '10%'
                      }}
                    />
                  </ImageStack>
                </ModalRightColumn>
              </ModalBody>
            </ModalContent>
          </ModalWrapper>
        </ModalOverlay>
      </LandingContainer>

      {/* Video Modal */}
      <VideoModalOverlay $isOpen={isVideoModalOpen} onClick={handleVideoOverlayClick}>
        <VideoModalWrapper $isOpen={isVideoModalOpen}>
          <VideoModalHeader>
            <CloseButton onClick={handleCloseVideoModal} aria-label="Close video">
              Close
            </CloseButton>
          </VideoModalHeader>
          <VideoModalContent>
            <video
              ref={videoModalRef}
              controls
              autoPlay
              playsInline
              muted={false}
              loop={false}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </VideoModalContent>
        </VideoModalWrapper>
      </VideoModalOverlay>
    </>
  );
};

export default LandingMoment;

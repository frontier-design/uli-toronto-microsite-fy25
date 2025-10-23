import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import {
  colors,
  GridContainer,
  GridRow,
  GridColumn
} from '../../styles';
import { useGSAP, fadeInUp, fadeInLeft, fadeInRight, scaleIn, gsap } from '../../hooks/useGSAP';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LandingContainer = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    min-height: 100vh;
    min-height: -webkit-fill-available;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 40px 0;

  @media (max-width: 1024px) {
    align-items: flex-start;
    padding-top: 120px;
    padding-bottom: 60px;
    min-height: 100vh;
    min-height: -webkit-fill-available;
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
    justify-content: flex-start;
    align-self: stretch;
    margin-bottom: 40px;
    padding-top: 150px;
  }

  @media (max-width: 768px) {
    margin-bottom: 50px;
    padding-top: 30px;
  }

  @media (max-width: 480px) {
    margin-bottom: 40px;
    padding-top: 20px;
  }
`;

const RightContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  @media (max-width: 1024px) {
    height: 50vh;
    min-height: 400px;
    padding: 40px 0;
  }

  @media (max-width: 768px) {
    min-height: 300px;
    height: 40vh;
    padding: 30px 0;
  }

  @media (max-width: 480px) {
    min-height: 250px;
    height: 35vh;
    padding: 20px 0;
  }
`;

const CategoryText = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${colors.black};
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
  color: ${colors.black};
  text-decoration: none;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: ${colors.primaryGreen};
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

const StackingContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 80px);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    min-height: 400px;
    height: 100%;
  }

  @media (max-width: 768px) {
    min-height: 300px;
    height: 100%;
  }

  @media (max-width: 480px) {
    min-height: 250px;
    height: 100%;
  }
`;

const StackingCard = styled.div`
  position: absolute;
  opacity: 0;
  transform-origin: center center;
  border-radius: 12px;
  background-image: url(${props => props.$bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: ${props => props.$width}px;
  height: ${props => props.$height}px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  @media (min-width: 1600px) {
    width: ${props => props.$width * 1.3}px;
    height: ${props => props.$height * 1.3}px;
  }

  @media (max-width: 1024px) {
    width: ${props => props.$width * 0.65}px;
    height: ${props => props.$height * 0.65}px;
  }
  
  @media (max-width: 768px) {
    width: ${props => props.$width * 0.5}px;
    height: ${props => props.$height * 0.5}px;
  }

  @media (max-width: 480px) {
    width: ${props => props.$width * 0.4}px;
    height: ${props => props.$height * 0.4}px;
  }
`;

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

// Card configurations with varying sizes and rotations
const cardConfigs = [
  { scale: 0.9, rotation: -3, image: '/images/landing-stacking-cards/stack-1.jpeg', width: 550, height: 400 },
  { scale: 0.95, rotation: 2, image: '/images/landing-stacking-cards/stack-2.jpeg', width: 480, height: 580 },
  { scale: 1, rotation: -1, image: '/images/landing-stacking-cards/stack-3.jpeg', width: 600, height: 420 },
  { scale: 0.92, rotation: 4, image: '/images/landing-stacking-cards/stack-4.jpeg', width: 520, height: 520 },
  { scale: 0.88, rotation: -2, image: '/images/landing-stacking-cards/stack-5.jpeg', width: 560, height: 460 },
];

const LandingMoment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const stackingRef = useRef(null);

  const handleOpenModal = (e) => {
    e.preventDefault();
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

  const containerRef = useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    
    // Animate category text and stacking container simultaneously
    tl.fromTo('.category-text', fadeInUp, {
      ...fadeInUp,
      opacity: 1,
      y: 0,
      duration: 0.6
    })
    .fromTo('.stacking-container', fadeInRight, {
      ...fadeInRight,
      opacity: 1,
      x: 0,
      duration: 0.6
    }, "-=0.6")
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

  // Stacking animation effect
  useEffect(() => {
    if (!stackingRef.current) return;

    const cards = Array.from(stackingRef.current.querySelectorAll('.stacking-card'));
    if (cards.length === 0) return;

    const maxVisibleCards = 10;
    let cardIndex = 0;
    const visibleCards = [];

    // Set all cards to invisible initially
    cards.forEach(card => {
      gsap.set(card, { 
        opacity: 0, 
        y: -150,
        scale: 0.8,
        zIndex: 0
      });
    });

    const dropNextCard = () => {
      const card = cards[cardIndex % cards.length];
      const config = cardConfigs[cardIndex % cardConfigs.length];

      // If we have max cards, remove the bottom one
      if (visibleCards.length >= maxVisibleCards) {
        const bottomCard = visibleCards.shift();
        gsap.to(bottomCard, {
          opacity: 0,
          y: 100,
          duration: 0.5,
          ease: 'power2.in',
        });
      }

      // Add new card to visible stack
      visibleCards.push(card);

      // Update z-index for all visible cards
      visibleCards.forEach((visCard, idx) => {
        gsap.set(visCard, { zIndex: idx });
      });

      // Animate the new card dropping in
      gsap.fromTo(card,
        {
          opacity: 0,
          y: -150,
          scale: config.scale * 0.8,
          rotation: config.rotation,
          zIndex: visibleCards.length - 1,
        },
        {
          opacity: 1,
          y: 0,
          scale: config.scale,
          rotation: config.rotation,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => {
            cardIndex++;
            setTimeout(dropNextCard, 1200);
          }
        }
      );
    };

    // Start the animation loop
    const initialDelay = setTimeout(dropNextCard, 500);

    return () => {
      clearTimeout(initialDelay);
      cards.forEach(card => gsap.killTweensOf(card));
    };
  }, []);

  return (
    <LandingContainer id="landing" ref={containerRef}>
      <MainContent>
        <GridContainer>
          <GridRow>
            {/* Left Content - 6 columns on desktop, 12 on mobile/tablet */}
            <GridColumn cols={6}>
              <LeftContent>
                <CategoryText className="category-text">ULI Toronto FY25 Annual Impact Report</CategoryText>
                <h1 className="main-title">
                  Meeting the Moment: <br />
                  Leadership for a New<br />
                  Urban Future
                </h1>
                <CTAButton href="https://toronto.uli.org/about/membership/" target="_blank" rel="noopener noreferrer" className="cta-button">
                  Become a Member
                </CTAButton>
                <LandAcknowledgement href="#" onClick={handleOpenModal} className="land-acknowledgement">
                  Land Acknowledgement ↗
                </LandAcknowledgement>
              </LeftContent>
            </GridColumn>

            {/* Right Content - 6 columns on desktop, 12 on mobile/tablet */}
            <GridColumn cols={6}>
              <RightContent>
                <StackingContainer ref={stackingRef} className="stacking-container">
                  {cardConfigs.map((config, index) => (
                    <StackingCard 
                      key={index} 
                      className="stacking-card"
                      $bgImage={config.image}
                      $width={config.width}
                      $height={config.height}
                    />
                  ))}
                </StackingContainer>
              </RightContent>
            </GridColumn>
          </GridRow>
        </GridContainer>
      </MainContent>

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
  );
};

export default LandingMoment;

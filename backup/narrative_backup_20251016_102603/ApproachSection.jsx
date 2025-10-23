import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles';
import { useGSAP, gsap } from '../../../hooks/useGSAP';
import uliLogo from '../../../assets/uli-logo.png';
import torontoVid from '../../../assets/videos/torontoVid.mov';

const ApproachContainer = styled.section`
  min-height: 500vh;
  width: 100%;
  background-color: ${colors.white};
  position: relative;
  background-color: ${colors.primaryGreen};
  color: white;
`;

const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 40px;
`;

const Title = styled.h2`
  font-size: 64px;
  line-height: 1.2;
  font-weight: 500;
  margin: 0 0 60px 0;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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

const HighlightWord = styled.span`
  display: inline-block;
  overflow: hidden;
  
  span {
    display: inline-block;
  }
  
  &.highlighted span {
    background-color: ${colors.mutedGreen};
    color: ${colors.primaryGreen};
    padding: 4px 12px;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
`;

const LogoWrapper = styled.div`
  width: 200px;
  margin-bottom: 80px;
  opacity: 0;

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  @media (max-width: 768px) {
    width: 150px;
  }
`;

const ValuesContainer = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
  width: calc(100% - 80px);
  max-width: 1200px;
  text-align: center;

  @media (max-width: 1024px) {
    gap: 60px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const ValueItem = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0px;
  opacity: 0;
  flex-direction: row-reverse;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const ValueLogo = styled.div`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  margin-left: -15px;
  z-index: -1;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const ValueText = styled.span`
  font-family: 'Big Shoulders', sans-serif;
  font-size: 65px;
  font-weight: 400;
  color: ${colors.black};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: white;
  text-align: center;

  @media (max-width: 1024px) {
    font-size: 28px;
  }

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const ColumnsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 80%;
  top: 10%;
  gap: 20px;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  opacity: 0;
  height: 100%;
  background-color: ${colors.primaryGreen};
  background-color: #306342;
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const ColumnImage = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 30px;
  background-color: ${colors.lightGray};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    margin-bottom: 20px;
  }
`;

const ColumnTitleWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0px;
  flex-direction: row-reverse;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const ColumnLogoWrapper = styled.div`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  margin-left: -10px;
  z-index: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const ColumnTitle = styled.h3`
  font-family: 'Big Shoulders', sans-serif;
  font-size: 48px;
  font-weight: 400;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: center;
  margin: 0;
  z-index: 2;

  @media (max-width: 1024px) {
    font-size: 36px;
  }

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const ColumnDescription = styled.p`
  font-size: 18px;
  line-height: 1.4;
  text-align: center;
  max-width: 400px;
  padding: 0 20px;
  margin: 0 auto;
  color: white;

  @media (max-width: 1024px) {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const TwoColumnContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 80%;
  top: 10%;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  padding: 0 50px;
  opacity: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 20px;
    gap: 40px;
  }

  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

const LeftTextColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FinalText = styled.p`
  font-size: 48px;
  line-height: 1.2;
  font-weight: 500;
  color: white;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3em;

  @media (max-width: 1024px) {
    font-size: 36px;
  }

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const FinalWord = styled.span`
  display: inline-block;
  overflow: hidden;
  
  span {
    display: inline-block;
  }
`;

const RightVideoColumn = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const FinalVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  pointer-events: none;
`;

const MemberButton = styled.button`
  position: absolute;
  bottom: 30px;
  left: 30px;
  background-color: ${colors.mutedGreen};
  color: ${colors.primaryGreen};
  border: none;
  border-radius: 8px;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  pointer-events: auto;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 15px;
    bottom: 20px;
    left: 20px;
  }

  @media (max-width: 480px) {
    padding: 12px 24px;
    font-size: 14px;
    bottom: 16px;
    left: 16px;
  }
`;

const VideoWrapper = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 480px) {
    height: 300px;
  }

  &:hover {
    ${FinalVideo} {
      transform: scale(1.05);
    }
    
    ${MemberButton} {
      background-color: ${colors.primaryGreen};
      color: white;
    }
  }
`;

const ClosingTextWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
`;

const ClosingText = styled.p`
  font-size: 64px;
  line-height: 1.2;
  font-weight: 500;
  color: white;
  margin: 0;
  text-align: center;
  max-width: 900px;
  padding: 0 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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

const ClosingWord = styled.span`
  display: inline-block;
  overflow: hidden;
  
  span {
    display: inline-block;
  }
`;

const InevitableWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
`;

const InevitableLogoWrapper = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
  }
`;

const InevitableText = styled.span`
  font-family: 'Big Shoulders', sans-serif;
  font-size: 80px;
  font-weight: 400;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: center;
  margin: 0;
  z-index: 2;
  position: relative;
  margin-right: 30px;

  @media (max-width: 1024px) {
    font-size: 60px;
  }

  @media (max-width: 768px) {
    font-size: 40px;
    margin-right: 20px;
  }
`;

const FinalLogoWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
`;

const FinalLogo = styled.div`
  width: 300px;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }

  @media (max-width: 768px) {
    width: 200px;
  }

  @media (max-width: 480px) {
    width: 150px;
  }
`;

const ApproachSection = () => {
  const containerRef = useGSAP(() => {
    const title = containerRef.current?.querySelector('.approach-title');
    const titleWords = containerRef.current?.querySelectorAll('.approach-word span');
    const highlightWord = containerRef.current?.querySelector('.highlight-approach span');
    const highlightWrapper = containerRef.current?.querySelector('.highlight-approach');
    const logo = containerRef.current?.querySelector('.approach-logo');
    const valueItems = containerRef.current?.querySelectorAll('.value-item');
    const valueColumns = containerRef.current?.querySelectorAll('.value-column');
    const columnLogos = containerRef.current?.querySelectorAll('.column-logo-static');
    const twoColumnContainer = containerRef.current?.querySelector('.two-column-final');
    const finalWords = containerRef.current?.querySelectorAll('.final-word span');
    const closingTextWrapper = containerRef.current?.querySelector('.closing-text-wrapper');
    const closingWords = containerRef.current?.querySelectorAll('.closing-word span');
    const inevitableWrapper = containerRef.current?.querySelector('.inevitable-wrapper');
    const inevitableText = containerRef.current?.querySelector('.inevitable-text');
    const inevitableLogoWrapper = containerRef.current?.querySelector('.inevitable-logo-wrapper');
    const finalLogoWrapper = containerRef.current?.querySelector('.final-logo-wrapper');

    if (!titleWords || !logo) return;

    // Set initial state for title words
    gsap.set(titleWords, { y: 60, opacity: 0 });
    
    // Set initial state for highlighted word
    if (highlightWord) {
      gsap.set(highlightWord, { y: 60, opacity: 0 });
    }
    
    // Set initial state for value items
    if (valueItems) {
      gsap.set(valueItems, { y: 60, opacity: 0 });
    }

    // Set initial state for value columns
    if (valueColumns) {
      gsap.set(valueColumns, { opacity: 0, y: 60 });
    }

    // Keep column logos at full opacity always
    if (columnLogos) {
      gsap.set(columnLogos, { opacity: 1 });
    }

    // Set initial state for two-column final section
    if (twoColumnContainer) {
      gsap.set(twoColumnContainer, { opacity: 0 });
    }

    // Set initial state for final text words
    if (finalWords) {
      gsap.set(finalWords, { y: 60, opacity: 0 });
    }

    // Set initial state for closing text
    if (closingTextWrapper) {
      gsap.set(closingTextWrapper, { opacity: 0 });
    }

    if (closingWords) {
      gsap.set(closingWords, { y: 60, opacity: 0 });
    }

    // Set initial state for inevitable wrapper
    if (inevitableWrapper) {
      gsap.set(inevitableWrapper, { opacity: 0 });
    }

    if (inevitableText) {
      gsap.set(inevitableText, { opacity: 0 });
    }

    // Set initial position of inevitable logo (next to text, not centered)
    if (inevitableLogoWrapper) {
      gsap.set(inevitableLogoWrapper, { x: 115 });
    }

    // Set initial state for final logo
    if (finalLogoWrapper) {
      gsap.set(finalLogoWrapper, { opacity: 0 });
    }

    // Create scroll-triggered timeline
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    // Animate title words with stagger
    scrollTl.to(titleWords, {
      y: 0,
      opacity: 1,
      duration: 0.15,
      stagger: 0.02,
      ease: 'power2.out'
    }, 0);

    // Animate highlighted word to slide up
    if (highlightWord) {
      scrollTl.to(highlightWord, {
        y: 0,
        opacity: 1,
        duration: 0.15,
        ease: 'power2.out'
      }, 0.1);
    }

    // Add highlight class to trigger background/color change
    if (highlightWrapper) {
      scrollTl.call(() => {
        highlightWrapper.classList.add('highlighted');
      }, null, 0.25);
    }

    // Fade in logo
    scrollTl.to(logo, {
      opacity: 1,
      duration: 0.2,
      ease: 'none'
    }, 0.15);

    // Hold the logo visible
    scrollTl.to({}, { duration: 0.15 }, 0.35);

    // Fade out center logo with scale and fade in value items simultaneously
    scrollTl.to(logo, {
      opacity: 0,
      scale: 0,
      duration: 0.15,
      ease: 'none'
    }, 0.5);

    // Reveal value items with slide up animation and stagger
    if (valueItems && valueItems.length > 0) {
      scrollTl.to(valueItems, {
        y: 0,
        opacity: 1,
        duration: 0.15,
        stagger: 0.05,
        ease: 'power2.out'
      }, 0.5);
    }

    // Hold all three values visible
    scrollTl.to({}, { duration: 0.15 }, 0.8);

    // Fade out title and all value items
    if (title) {
      scrollTl.to(title, {
        opacity: 0,
        y: -60,
        duration: 0.15,
        ease: 'power2.in'
      }, 0.95);
    }

    if (valueItems && valueItems.length > 0) {
      scrollTl.to(valueItems, {
        opacity: 0,
        y: -60,
        duration: 0.15,
        ease: 'power2.in'
      }, 0.95);
    }

    // Animate 3 columns appearing one by one from left to right
    if (valueColumns && valueColumns.length > 0) {
      scrollTl.to(valueColumns, {
        opacity: 1,
        y: 0,
        duration: 0.2,
        stagger: 0.25,
        ease: 'power2.out'
      }, 1.1);
    }

    // Keep column logos at full opacity throughout entire timeline
    if (columnLogos && columnLogos.length > 0) {
      scrollTl.to(columnLogos, {
        opacity: 1,
        duration: 0.001,
      }, 0);
    }

    // Hold the three columns visible
    scrollTl.to({}, { duration: 0.15 }, 2.0);

    // Fade out the three columns
    if (valueColumns && valueColumns.length > 0) {
      scrollTl.to(valueColumns, {
        opacity: 0,
        y: -60,
        duration: 0.15,
        ease: 'power2.in'
      }, 2.15);
    }

    // Fade in the two-column final section
    if (twoColumnContainer) {
      scrollTl.to(twoColumnContainer, {
        opacity: 1,
        duration: 0.15,
        ease: 'none'
      }, 2.3);
    }

    // Animate final text words with stagger
    if (finalWords && finalWords.length > 0) {
      scrollTl.to(finalWords, {
        y: 0,
        opacity: 1,
        duration: 0.15,
        stagger: 0.02,
        ease: 'power2.out'
      }, 2.35);
    }

    // Hold the two-column section visible
    scrollTl.to({}, { duration: 0.2 }, 2.6);

    // Fade out the two-column section
    if (twoColumnContainer) {
      scrollTl.to(twoColumnContainer, {
        opacity: 0,
        duration: 0.15,
        ease: 'power2.in'
      }, 2.8);
    }

    // Fade in the closing text wrapper
    if (closingTextWrapper) {
      scrollTl.to(closingTextWrapper, {
        opacity: 1,
        duration: 0.15,
        ease: 'none'
      }, 2.95);
    }

    // Animate closing text words with stagger
    if (closingWords && closingWords.length > 0) {
      scrollTl.to(closingWords, {
        y: 0,
        opacity: 1,
        duration: 0.15,
        stagger: 0.02,
        ease: 'power2.out'
      }, 3.0);
    }

    // Hold the closing text visible
    scrollTl.to({}, { duration: 0.2 }, 3.3);

    // Fade out the closing text
    if (closingWords && closingWords.length > 0) {
      scrollTl.to(closingWords, {
        opacity: 0,
        y: -60,
        duration: 0.15,
        ease: 'power2.in'
      }, 3.5);
    }

    if (closingTextWrapper) {
      scrollTl.to(closingTextWrapper, {
        opacity: 0,
        duration: 0.15,
        ease: 'none'
      }, 3.5);
    }

    // Fade in INEVITAB + logo
    if (inevitableWrapper) {
      scrollTl.to(inevitableWrapper, {
        opacity: 1,
        duration: 0.15,
        ease: 'none'
      }, 3.65);
    }

    if (inevitableText) {
      scrollTl.to(inevitableText, {
        opacity: 1,
        duration: 0.15,
        ease: 'power2.out'
      }, 3.7);
    }

    // Hold INEVITAB + logo visible
    scrollTl.to({}, { duration: 0.2 }, 3.9);

    // Fade out INEVITAB text only (logo stays)
    if (inevitableText) {
      scrollTl.to(inevitableText, {
        opacity: 0,
        duration: 0.15,
        ease: 'power2.in'
      }, 4.1);
    }

    // Move logo to center and scale up
    if (inevitableLogoWrapper) {
      const isMobile = window.innerWidth <= 480;
      const isTablet = window.innerWidth <= 768 && window.innerWidth > 480;
      const targetSize = isMobile ? 150 : isTablet ? 200 : 300;
      
      scrollTl.to(inevitableLogoWrapper, {
        x: 0,
        width: targetSize,
        height: targetSize,
        duration: 0.3,
        ease: 'power2.out'
      }, 4.25);
    }
  });

  return (
    <ApproachContainer ref={containerRef} id="approach" data-narrative="true">
      <StickyWrapper>
        <Title className="approach-title">
          {`Our difference is in our`.split(' ').map((word, index) => (
            <Word key={index} className="approach-word">
              <span>{word}</span>
            </Word>
          ))}
          <HighlightWord className="highlight-approach">
            <span>approach</span>
          </HighlightWord>
        </Title>
        <LogoWrapper className="approach-logo">
          <img src={uliLogo} alt="ULI Logo" />
        </LogoWrapper>
        <ValuesContainer>
          <ValueItem className="value-item">
            <ValueLogo>
              <img src={uliLogo} alt="ULI Logo" />
            </ValueLogo>
            <ValueText>COLLABORATIV</ValueText>
          </ValueItem>
          <ValueItem className="value-item">
            <ValueLogo>
              <img src={uliLogo} alt="ULI Logo" />
            </ValueLogo>
            <ValueText>RESPONSIB</ValueText>
          </ValueItem>
          <ValueItem className="value-item">
            <ValueLogo>
              <img src={uliLogo} alt="ULI Logo" />
            </ValueLogo>
            <ValueText>HOPEF</ValueText>
          </ValueItem>
        </ValuesContainer>
        
        {/* Three column layout */}
        <ColumnsContainer>
          <Column className="value-column">
            <ColumnImage>
              {/* Placeholder for different image */}
            </ColumnImage>
            <ColumnTitleWrapper>
              <ColumnLogoWrapper className="column-logo-static">
                <img src={uliLogo} alt="ULI Logo" />
              </ColumnLogoWrapper>
              <ColumnTitle>COLLABORATIV</ColumnTitle>
            </ColumnTitleWrapper>
            <ColumnDescription>
              More than networking, we create a collaborative environment that fosters connection and change.
            </ColumnDescription>
          </Column>

          <Column className="value-column">
            <ColumnImage>
              {/* Placeholder for different image */}
            </ColumnImage>
            <ColumnTitleWrapper>
              <ColumnLogoWrapper className="column-logo-static">
                <img src={uliLogo} alt="ULI Logo" />
              </ColumnLogoWrapper>
              <ColumnTitle>RESPONSIB</ColumnTitle>
            </ColumnTitleWrapper>
            <ColumnDescription>
              It's not just responsible use of land, it's level headed experts from across domains thinking big about what's possible.
            </ColumnDescription>
          </Column>

          <Column className="value-column">
            <ColumnImage>
              {/* Placeholder for different image */}
            </ColumnImage>
            <ColumnTitleWrapper>
              <ColumnLogoWrapper className="column-logo-static">
                <img src={uliLogo} alt="ULI Logo" />
              </ColumnLogoWrapper>
              <ColumnTitle>HOPEF</ColumnTitle>
            </ColumnTitleWrapper>
            <ColumnDescription>
              These are not impossible dreams, it's practical and grounded optimism paired with deliberate action.
            </ColumnDescription>
          </Column>
        </ColumnsContainer>

        {/* Two-column final section */}
        <TwoColumnContainer className="two-column-final">
          <LeftTextColumn>
            <FinalText>
              {`Together, we have influence. In times of economic uncertainty, ULI membership means something more.`.split(' ').map((word, index) => (
                <FinalWord key={index} className="final-word">
                  <span>{word}</span>
                </FinalWord>
              ))}
            </FinalText>
          </LeftTextColumn>

          <RightVideoColumn>
            <VideoWrapper>
              <FinalVideo
                autoPlay
                muted
                loop
                playsInline
                controls={false}
              >
                <source src={torontoVid} type="video/mp4" />
                Your browser does not support the video tag.
              </FinalVideo>
              <MemberButton>Become a Member</MemberButton>
            </VideoWrapper>
          </RightVideoColumn>
        </TwoColumnContainer>

        {/* Closing text */}
        <ClosingTextWrapper className="closing-text-wrapper">
          <ClosingText>
            {`When we come together, renewal is inevitable`.split(' ').map((word, index) => (
              <ClosingWord key={index} className="closing-word">
                <span>{word}</span>
              </ClosingWord>
            ))}
          </ClosingText>
        </ClosingTextWrapper>

        {/* INEVITAB + Logo */}
        <InevitableWrapper className="inevitable-wrapper">
          <InevitableText className="inevitable-text">INEVITAB</InevitableText>
          <InevitableLogoWrapper className="inevitable-logo-wrapper">
            <img src={uliLogo} alt="ULI Logo" />
          </InevitableLogoWrapper>
        </InevitableWrapper>
      </StickyWrapper>
    </ApproachContainer>
  );
};

export default ApproachSection;


import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { colors } from '../../../styles';
import uliLogo from '../../../assets/uli-logo.png';

// Use URL paths for videos to avoid bundling large files
const torontoVid = '/videos/toronto-vid-1.webm';
const torontoVid2 = '/videos/toronto-vid-2.webm';

gsap.registerPlugin(ScrollTrigger);

const NarrativeContainer = styled.section`
  position: relative;
  height: 100vh;
  height: 100dvh;
  width: 100%;
  overflow: hidden;
  background-color: ${colors.black};
  color: ${colors.white};

  @media (max-width: 1024px) {
    display: none;
  }
`;

const VideoContainer = styled.div`
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: calc(100% - 130px);
  height: 70vh;
  z-index: 1;
  overflow: hidden;
  --mask-width: 100%;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: var(--mask-width);
    height: 100%;
    background-color: ${colors.black};
    z-index: 3;
  }
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: 0;
`;

const VideoGradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent, ${colors.black});
  z-index: 1;
  pointer-events: none;
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  pointer-events: none;
  opacity: 0;
`;

const Phase1Container = styled.div`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, 0%);
  z-index: 2;
  text-align: center;
  width: 100%;

`;

const SmallText = styled.div`
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 35px;
  font-weight: 400;
  color: ${colors.white};
  margin-bottom: 20px;

  @media (min-width: 1600px) {
    font-size: 42px;
  }

  @media (max-width: 1024px) {
    font-size: 28px;
  }

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 12px;
  }
`;

const LargeText = styled.div`
  font-family: 'Big Shoulders', sans-serif;
  font-size: 200px;
  font-weight: 800;
  line-height: 0.9;
  color: ${colors.white};
  text-transform: uppercase;

  @media (min-width: 1600px) {
    font-size: 230px;
  }

  @media (max-width: 1024px) {
    font-size: 120px;
  }

  @media (max-width: 768px) {
    font-size: 80px;
  }

  @media (max-width: 480px) {
    font-size: 60px;
  }
`;

const SmallText2 = styled(SmallText)`
  opacity: 0;
  position: absolute;
  bottom: 200px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  margin-bottom: 5px;

  @media (max-width: 1024px) {
    bottom: 180px;
  }

  @media (max-width: 768px) {
    bottom: 140px;
  }

  @media (max-width: 480px) {
    bottom: 110px;
  }
`;

const LargeText2 = styled(LargeText)`
  opacity: 0;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
`;

const Phase3TextTop = styled.div`
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Roboto', sans-serif;
  font-size: 50px;
  font-weight: 400;
  color: ${colors.white};
  z-index: 2;
  max-width: calc(1440px - 160px);
  width: calc(100% - 160px);
  text-align: left;
  opacity: 0;

  @media (min-width: 1600px) {
    font-size: 58px;
    max-width: calc(1800px - 160px);
  }

  @media (max-width: 1024px) {
    font-size: 32px;
    top: 60px;
    width: calc(100% - 100px);
  }

  @media (max-width: 768px) {
    font-size: 24px;
    top: 40px;
    width: calc(100% - 80px);
  }

  @media (max-width: 480px) {
    font-size: 18px;
    top: 30px;
    width: calc(100% - 60px);
  }
`;

const Phase3TextBottom = styled.div`
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  text-align: left;
  opacity: 0;
  max-width: calc(1440px - 160px);
  width: calc(100% - 160px);

  @media (min-width: 1600px) {
    max-width: calc(1800px - 160px);
  }

  @media (max-width: 1024px) {
    bottom: 60px;
    width: calc(100% - 100px);
  }

  @media (max-width: 768px) {
    bottom: 40px;
    width: calc(100% - 80px);
  }

  @media (max-width: 480px) {
    bottom: 30px;
    width: calc(100% - 60px);
  }
`;

const Phase3Row = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
`;

const Phase3Word = styled.span`
  font-family: 'Big Shoulders', sans-serif;
  font-size: 100px;
  font-weight: 800;
  color: ${colors.white};
  text-transform: uppercase;


  @media (max-width: 1424px) {
    font-size: 70px;
  }

  @media (max-width: 1222px) {
    font-size: 50px;
  }
`;

const Phase3Large = styled.div`
  font-family: 'Big Shoulders', sans-serif;
  font-size: 180px;
  font-weight: 800;
  line-height: 0.85;
  color: ${colors.white};
  text-transform: uppercase;

  @media (min-width: 1600px) {
    font-size: 210px;
  }

  @media (max-width: 1424px) {
    font-size: 150px;
  }

  @media (max-width: 1222px) {
    font-size: 120px;
  }
`;

const ImageGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: ${colors.white};
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 100px 50px;
  opacity: 0;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 10px;
    background: ${colors.white};
    z-index: -1;
  }

  @media (min-width: 1600px) {
    padding: 120px 50px;
  }

  @media (max-width: 1024px) {
    padding: 60px 40px;
    min-height: auto;
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const ImageCluster = styled.div`
  position: relative;
  width: 100%;
  max-width: 1340px;
  height: 60%;
  min-height: 500px;
  margin-bottom: 60px;
  overflow: visible;
  flex-shrink: 0;

  @media (min-width: 1600px) {
    max-width: 1700px;
    min-height: 600px;
  }

  @media (max-width: 1024px) {
    min-height: 450px;
    margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-height: 400px;
    margin-bottom: 30px;
    height: auto;
  }

  @media (max-width: 480px) {
    min-height: 350px;
    margin-bottom: 24px;
  }
`;

const ImagePlaceholder = styled.div`
  position: absolute;
  background: ${colors.lightGray};
  background-image: url(${props => props.$bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  border-radius: 8px;

  &.narrative-image-1 {
    @media (min-width: 1600px) {
      width: 390px !important;
      height: 260px !important;
    }
    @media (max-width: 1024px) {
      width: 240px !important;
      height: 240px !important;
    }
    @media (max-width: 768px) {
      width: 180px !important;
      height: 180px !important;
    }
  }

  &.narrative-image-2 {
    @media (min-width: 1600px) {
      width: 325px !important;
      height: 325px !important;
    }
    @media (max-width: 1024px) {
      width: 200px !important;
      height: 240px !important;
    }
    @media (max-width: 768px) {
      width: 150px !important;
      height: 180px !important;
    }
  }

  &.narrative-image-3 {
    @media (min-width: 1600px) {
      width: 455px !important;
      height: 286px !important;
    }
    @media (max-width: 1024px) {
      width: 280px !important;
      height: 160px !important;
    }
    @media (max-width: 768px) {
      width: 210px !important;
      height: 120px !important;
    }
  }

  &.narrative-image-4 {
    @media (min-width: 1600px) {
      width: 364px !important;
      height: 364px !important;
    }
    @media (max-width: 1024px) {
      width: 224px !important;
      height: 240px !important;
    }
    @media (max-width: 768px) {
      width: 168px !important;
      height: 180px !important;
    }
  }

  &.narrative-image-5 {
    @media (min-width: 1600px) {
      width: 260px !important;
      height: 234px !important;
    }
    @media (max-width: 1024px) {
      width: 160px !important;
      height: 144px !important;
    }
    @media (max-width: 768px) {
      width: 120px !important;
      height: 108px !important;
    }
  }

  &.narrative-image-6 {
    @media (min-width: 1600px) {
      width: 416px !important;
      height: 260px !important;
    }
    @media (max-width: 1024px) {
      width: 256px !important;
      height: 160px !important;
    }
    @media (max-width: 768px) {
      width: 192px !important;
      height: 120px !important;
    }
  }
`;

const Phase4Text = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 38px;
  font-weight: 400;
  color: ${colors.black};
  text-align: center;
  max-width: 900px;
  line-height: 1.35;
  margin-top: 0;
  flex-shrink: 0;
  position: relative;
  z-index: 1;

  @media (min-width: 1600px) {
    font-size: 44px;
    max-width: 1100px;
  }

  @media (max-width: 1024px) {
    font-size: 30px;
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    font-size: 24px;
    margin-top: 16px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-top: 12px;
  }
`;

const Highlight = styled.span`
  background: ${colors.mutedGreen};
  color: ${colors.primaryGreen};
  padding: 2px 8px;
  border-radius: 4px;
`;

// Phase 5 Components
const Phase5Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${colors.white};
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(100vh);

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const Phase5InnerContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 50px;
  position: relative;

  @media (min-width: 1600px) {
    max-width: 1800px;
  }

  @media (max-width: 1024px) {
    padding: 0 40px;
    flex-direction: column;
    justify-content: center;
  }

  @media (max-width: 768px) {
    padding: 0 30px;
  }

  @media (max-width: 480px) {
    padding: 0 20px;
  }
`;

const Phase5TextLeft = styled.div`
  width: 40%;
  z-index: 2;

  @media (max-width: 1024px) {
    width: 100%;
    margin-bottom: 40px;
    text-align: center;
  }

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    margin-bottom: 24px;
  }
`;

const Phase5SmallText = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 38px;
  font-weight: 400;
  color: ${colors.black};
  margin-bottom: 20px;

  @media (min-width: 1600px) {
    font-size: 44px;
  }

  @media (max-width: 1024px) {
    font-size: 28px;
  }

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Phase5LargeText = styled.div`
  font-family: 'Big Shoulders', sans-serif;
  font-size: 180px;
  font-weight: 800;
  line-height: 0.85;
  color: ${colors.black};
  text-transform: uppercase;

  @media (min-width: 1600px) {
    font-size: 210px;
  }

  @media (max-width: 1024px) {
    font-size: 100px;
  }

  @media (max-width: 768px) {
    font-size: 72px;
  }

  @media (max-width: 480px) {
    font-size: 56px;
  }
`;

const Phase5ImagesRight = styled.div`
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  width: 60%;
  height: 80%;

  @media (max-width: 1024px) {
    position: relative;
    right: 0;
    width: 100%;
    height: 400px;
    transform: none;
  }

  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 480px) {
    height: 250px;
  }
`;

const Phase5VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  opacity: 0;
`;

const Phase5Video = styled.video`
  width: 45vw;
  height: 600px;
  border-radius: 12px;
  object-fit: cover;

  @media (min-width: 1600px) {
    width: 950px;
    height: 800px;
  }

  @media (max-width: 1024px) {
    width: 100%;
    height: 100%;
    max-width: 500px;
    max-height: 400px;
  }
  
  @media (max-width: 768px) {
    max-width: 400px;
    max-height: 300px;
  }

  @media (max-width: 480px) {
    max-width: 300px;
    max-height: 250px;
  }
`;

const StackingImage = styled.div`
  position: absolute;
  background: ${colors.lightGray};
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  opacity: 0;
`;

// Phase 6 Components
const Phase6Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${colors.primaryGreen};
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateY(100vh);
  
  /* Debug: Add a subtle border to see the container */
  /* border: 2px solid red; */
  
  /* Debug: Make LogoContainer visible for testing */
  /* & > div[ref="logoContainerRef"] {
    opacity: 1 !important;
    border: 2px solid blue !important;
  } */
`;

const Phase6BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  z-index: 1;
`;

const Phase6Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  opacity: 0;
`;

const Phase6TopText = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 50px;
  font-weight: 400;
  color: ${colors.white};
  text-align: center;
  position: absolute;
  top: 200px;
  opacity: 0;
  z-index: 3;

  @media (min-width: 1600px) {
    font-size: 58px;
    top: 280px;
  }

  @media (max-width: 1024px) {
    font-size: 36px;
    top: 100px;
  }

  @media (max-width: 768px) {
    font-size: 28px;
    top: 60px;
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    top: 40px;
  }
`;

const LogoContainer = styled.div`
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px;
  opacity: 0;
  z-index: 3;
  width: auto;
  height: auto;
  
  img {
    height: 200px;
    width: auto;
    flex-shrink: 0;

    @media (max-width: 1024px) {
      height: 100px;
    }

    @media (max-width: 768px) {
      height: 70px;
    }

    @media (max-width: 480px) {
      height: 50px;
    }
  }

  @media (max-width: 1024px) {
    gap: 8px;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    gap: 6px;
  }

  @media (max-width: 480px) {
    gap: 4px;
  }
`;

const Phase6WordsWrapper = styled.div`
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-wrap: nowrap;
  gap: 5px;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 8px;
  }
  
  @media (max-width: 768px) {
    gap: 5px;
  }
`;

const Phase6Word = styled.div`
  font-family: 'Big Shoulders', sans-serif;
  font-size: 160px;
  font-weight: 400;
  line-height: 0.85;
  color: ${colors.white};
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  z-index: 2;
  width: 0;
  left: 0;

  @media (min-width: 1600px) {
    font-size: 185px;
  }

  @media (max-width: 1024px) {
    font-size: 90px;
  }

  @media (max-width: 768px) {
    font-size: 60px;
  }

  @media (max-width: 480px) {
    font-size: 44px;
  }
`;

const Phase6Description = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 30px;
  font-weight: 400;
  line-height: 1.3;
  color: ${colors.white};
  text-align: center;
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 40px;
  opacity: 0;
  z-index: 3;
  max-width: 800px;
  width: 100%;

  @media (min-width: 1600px) {
    font-size: 34px;
    max-width: 950px;
    bottom: 180px;
  }

  @media (max-width: 1024px) {
    font-size: 24px;
    bottom: 80px;
    padding: 0 30px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    bottom: 60px;
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
    bottom: 40px;
  }
`;

// Phase 7 Components
const Phase7Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${colors.primaryGreen};
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(100vh);

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const Phase7InnerContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  gap: 60px;

  @media (min-width: 1600px) {
    max-width: 1800px;
  }

  @media (max-width: 1024px) {
    padding: 0 40px;
    gap: 40px;
    flex-direction: column;
    justify-content: center;
  }

  @media (max-width: 768px) {
    padding: 40px 30px;
    gap: 30px;
  }

  @media (max-width: 480px) {
    padding: 30px 20px;
    gap: 24px;
  }
`;

const Phase7VideoContainer = styled.div`
  flex: 0 0 30%;
  max-width: 30%;
  height: 63%;
  opacity: 0;
  position: relative;
  overflow: hidden;

  video, img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 1024px) {
    flex: 0 0 auto;
    max-width: 100%;
    width: 100%;
    height: 45vh;
    max-height: 400px;
  }

  @media (max-width: 768px) {
    height: 40vh;
    max-height: 300px;
  }

  @media (max-width: 480px) {
    height: 35vh;
    max-height: 250px;
  }
`;

const Phase7VideoMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${colors.primaryGreen};
  z-index: 2;
  transform: translateX(var(--mask-width, 100%));
`;

const Phase7Content = styled.div`
  flex: 0 0 65%;
  max-width: 65%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  opacity: 0;

  @media (max-width: 1024px) {
    flex: 0 0 auto;
    max-width: 100%;
    width: 100%;
    align-items: center;
    text-align: center;
    gap: 24px;
  }

  @media (max-width: 768px) {
    gap: 20px;
  }

  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const Phase7Text = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 28px;
  font-weight: 400;
  line-height: 1.5;
  color: ${colors.white};

  @media (min-width: 1600px) {
    font-size: 32px;
  }

  @media (max-width: 1024px) {
    font-size: 24px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Phase7LargeText = styled.div`
  font-family: 'Big Shoulders', sans-serif;
  font-size: 180px;
  font-weight: 800;
  line-height: 0.9;
  color: ${colors.white};
  text-transform: uppercase;

  @media (min-width: 1600px) {
    font-size: 210px;
  }

  @media (max-width: 1024px) {
    font-size: 80px;
  }

  @media (max-width: 768px) {
    font-size: 60px;
  }
`;

const Phase7Button = styled.a`
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: ${colors.primaryGreen};
  background: ${colors.white};
  border: none;
  padding: 18px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;

  &:hover {
    transform: translateY(-2px);    
    background-color: ${colors.mutedGreen};
    color: ${colors.primaryGreen};
  }

  @media (max-width: 1024px) {
    font-size: 16px;
    padding: 16px 32px;
  }

  @media (max-width: 768px) {
    font-size: 15px;
    padding: 14px 28px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 12px 24px;
  }
`;

// Phase 8 Components
const Phase8Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${colors.primaryGreen};
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateY(100vh);
`;

const Phase8InnerContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 50px;

  @media (min-width: 1600px) {
    max-width: 1800px;
  }

  @media (max-width: 1024px) {
    padding: 0 40px;
  }

  @media (max-width: 768px) {
    padding: 0 30px;
  }

  @media (max-width: 480px) {
    padding: 0 20px;
  }
`;

const Phase8TopText = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 38px;
  font-weight: 400;
  line-height: 1.3;
  color: ${colors.white};
  text-align: center;
  opacity: 0;
  margin-bottom: 20px;

  @media (min-width: 1600px) {
    font-size: 44px;
  }

  @media (max-width: 1024px) {
    font-size: 28px;
  }

  @media (max-width: 768px) {
    font-size: 24px;
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Phase8LargeText = styled.div`
  font-family: 'Big Shoulders', sans-serif;
  font-size: 180px;
  font-weight: 800;
  line-height: 0.9;
  color: ${colors.white};
  text-transform: uppercase;
  text-align: center;
  opacity: 0;

  @media (min-width: 1600px) {
    font-size: 210px;
  }

  @media (max-width: 1024px) {
    font-size: 100px;
  }

  @media (max-width: 768px) {
    font-size: 72px;
  }

  @media (max-width: 480px) {
    font-size: 56px;
  }
`;

const Phase8WordLogoContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0;

  @media (max-width: 768px) {
  }
`;

const Phase8WordsWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Phase8Word = styled.div`
  font-family: 'Big Shoulders', sans-serif;
  font-size: 160px;
  font-weight: 400;
  line-height: 0.85;
  color: ${colors.white};
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  width: 0;
  left: 0;

  @media (min-width: 1600px) {
    font-size: 185px;
  }
  
  @media (max-width: 1024px) {
    font-size: 90px;
  }

  @media (max-width: 768px) {
    font-size: 60px;
  }

  @media (max-width: 480px) {
    font-size: 44px;
  }
`;

const Phase8Logo = styled.img`
  height: 200px;
  width: auto;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    height: 100px;
  }

  @media (max-width: 768px) {
    height: 70px;
  }

  @media (max-width: 480px) {
    height: 50px;
  }
`;

const Narrative = () => {
  const containerRef = useRef(null);
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  const videoOverlayRef = useRef(null);
  const videoGradientRef = useRef(null);
  const phase1ContainerRef = useRef(null);
  const smallText1Ref = useRef(null);
  const largeText1Ref = useRef(null);
  const smallText2Ref = useRef(null);
  const largeText2Ref = useRef(null);
  const phase3TopRef = useRef(null);
  const phase3BottomRef = useRef(null);
  const imageGridRef = useRef(null);
  const imagePlaceholdersRef = useRef(null);
  
  // Phase 5 refs
  const phase5ContainerRef = useRef(null);
  const phase5TextRef = useRef(null);
  const stackingImagesRef = useRef(null);
  
  // Phase 6 refs
  const phase6ContainerRef = useRef(null);
  const phase6TopTextRef = useRef(null);
  const logoContainerRef = useRef(null);
  const word1Ref = useRef(null);
  const word2Ref = useRef(null);
  const word3Ref = useRef(null);
  const desc1Ref = useRef(null);
  const desc2Ref = useRef(null);
  const desc3Ref = useRef(null);
  const bg1Ref = useRef(null);
  const bg2Ref = useRef(null);
  const bg3Ref = useRef(null);
  const overlayRef = useRef(null);
  
  // Phase 7 refs
  const phase7ContainerRef = useRef(null);
  const phase7VideoRef = useRef(null);
  const phase7VideoMaskRef = useRef(null);
  const phase7ContentRef = useRef(null);
  
  // Phase 8 refs
  const phase8ContainerRef = useRef(null);
  const phase8TopTextRef = useRef(null);
  const phase8LargeTextRef = useRef(null);
  const phase8WordLogoContainerRef = useRef(null);
  const phase8WordRef = useRef(null);
  const phase8LogoRef = useRef(null);
  
  
  if (!imagePlaceholdersRef.current) {
    imagePlaceholdersRef.current = [];
  }
  
  if (!stackingImagesRef.current) {
    stackingImagesRef.current = [];
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(videoContainerRef.current, { "--mask-width": "100%" });
      gsap.set(phase7VideoMaskRef.current, { "--mask-width": "0%" });
      gsap.set(phase1ContainerRef.current, { opacity: 0, y: 50 });
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=7000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Phase 1: Video mask reveal left-to-right + text fade in from bottom
      tl.to(
        videoContainerRef.current,
        { "--mask-width": "0%", duration: 1, ease: "power2.inOut" }
      )
      .fromTo(
        phase1ContainerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "<0.2"
      );

      // Phase 2: Text crossfade
      tl.to(smallText1Ref.current, { opacity: 0, duration: 0.5 }, "+=0.5")
        .to(largeText1Ref.current, { opacity: 0, duration: 0.5 }, "<")
        .fromTo(
          smallText2Ref.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "<0.3"
        )
        .fromTo(
          largeText2Ref.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "<"
        );

      // Phase 3: Video expands + new text animates in
      tl.to(
        videoContainerRef.current,
        { 
          width: "100vw", 
          height: "100vh", 
          top: "0%",
          left: "50%",
          duration: 1,
          ease: "power2.inOut" 
        },
        "+=0.5"
      )
      .to(phase1ContainerRef.current, { opacity: 0, duration: 0.3 }, "<")
      .to(videoGradientRef.current, { opacity: 0, duration: 0.5 }, "<")
      .to(videoOverlayRef.current, { opacity: 1, duration: 0.5 }, "<")
      .fromTo(
        phase3TopRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
        "<0.5"
      )
      .fromTo(
        phase3BottomRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "<0.3"
      );

      // Phase 4: Image grid overlays
      tl.fromTo(
        imageGridRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "+=0.5"
      )
      .fromTo(
        imagePlaceholdersRef.current,
        { scale: 0.8 },
        { 
          scale: 1, 
          rotation: () => gsap.utils.random(-15, 15),
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)"
        },
        "<0.2"
      );

      // Phase 5: Transition to stacking images with text
      tl.to(imageGridRef.current, { y: "-100vh", duration: 1, ease: "power2.inOut" }, "+=0.5")
        .to(videoContainerRef.current, { y: "-100vh", duration: 1, ease: "power2.inOut" }, "<")
        .to(phase1ContainerRef.current, { y: "-100vh", duration: 1, ease: "power2.inOut" }, "<")
        .to(phase3TopRef.current, { y: "-100vh", duration: 1, ease: "power2.inOut" }, "<")
        .to(phase3BottomRef.current, { y: "-100vh", duration: 1, ease: "power2.inOut" }, "<")
        .to(
          phase5ContainerRef.current,
          { y: 0, duration: 1, ease: "power2.inOut" },
          "<"
        )
        .fromTo(
          phase5TextRef.current,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
          "<0.4"
        )
        .fromTo(
          stackingImagesRef.current[0],
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out"
          },
          "<0.5"
        );

      // Phase 6: Green background with logo intro
      tl.to(phase5ContainerRef.current, { y: "-100vh", duration: 1, ease: "power2.inOut" }, "+=0.5")
        .to(
          phase6ContainerRef.current,
          { y: 0, duration: 1, ease: "power2.inOut" },
          "<"
        )
        .fromTo(
          phase6TopTextRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "<0.4"
        )
        .fromTo(
          logoContainerRef.current,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.4)" },
          "<0.3"
        );

      // Phase 6 continuation: Top text fades, background 1 fades in with overlay
      tl.to(phase6TopTextRef.current, { opacity: 0, duration: 0.5 }, "+=0.5")
        .to(
          bg1Ref.current,
          { opacity: 1, duration: 0.8, ease: "power2.inOut" },
          "<"
        )
        .to(
          overlayRef.current,
          { opacity: 1, duration: 0.8, ease: "power2.inOut" },
          "<"
        )
        .to(
          word1Ref.current,
          { width: "auto", duration: 0.8, ease: "power2.out" },
          "<0.2"
        )
        .to(
          desc1Ref.current,
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          "<0.4"
        );

      // Word 1 contracts, Word 2 expands with description and background crossfade to image 2
      tl.to(word1Ref.current, { width: 0, duration: 0.4 }, "+=0.5")
        .to(desc1Ref.current, { opacity: 0, duration: 0.3 }, "<")
        .to(
          bg1Ref.current,
          { opacity: 0, duration: 0.6, ease: "power2.inOut" },
          "<"
        )
        .to(
          bg2Ref.current,
          { opacity: 1, duration: 0.6, ease: "power2.inOut" },
          "<"
        )
        .to(
          word2Ref.current,
          { width: "auto", duration: 0.8, ease: "power2.out" },
          "<0.2"
        )
        .to(
          desc2Ref.current,
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          "<0.4"
        );

      // Word 2 contracts, Word 3 expands with description and background crossfade to image 3
      tl.to(word2Ref.current, { width: 0, duration: 0.4 }, "+=0.5")
        .to(desc2Ref.current, { opacity: 0, duration: 0.3 }, "<")
        .to(
          bg2Ref.current,
          { opacity: 0, duration: 0.6, ease: "power2.inOut" },
          "<"
        )
        .to(
          bg3Ref.current,
          { opacity: 1, duration: 0.6, ease: "power2.inOut" },
          "<"
        )
        .to(
          word3Ref.current,
          { width: "auto", duration: 0.8, ease: "power2.out" },
          "<0.2"
        )
        .to(
          desc3Ref.current,
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          "<0.4"
        );

      // Phase 7: Scroll to membership section
      tl.to(phase6ContainerRef.current, { y: "-100vh", duration: 1, ease: "power2.inOut" }, "+=0.5")
        .to(
          phase7ContainerRef.current,
          { y: 0, duration: 1, ease: "power2.inOut" },
          "<"
        )
        .to(
          phase7VideoRef.current,
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "<0.3"
        )
        .to(
          phase7VideoMaskRef.current,
          { "--mask-width": "100%", duration: 0.8, ease: "power2.inOut" },
          "<0.2"
        )
        .to(
          phase7ContentRef.current,
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "<0.2"
        );

      // Phase 8: Scroll to final section with centered text
      tl.to(phase7ContainerRef.current, { y: "-100vh", duration: 1, ease: "power2.inOut" }, "+=0.5")
        .to(
          phase8ContainerRef.current,
          { y: 0, duration: 1, ease: "power2.inOut" },
          "<"
        )
        .to(
          phase8TopTextRef.current,
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          "<0.3"
        )
        .to(
          phase8LargeTextRef.current,
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          "<0.2"
        );

      // Phase 8.2: Transition to INEVITAB + Logo
      tl.to(phase8TopTextRef.current, { opacity: 0, duration: 0.5 }, "+=0.5")
        .to(phase8LargeTextRef.current, { opacity: 0, duration: 0.5 }, "<")
        .to(
          phase8WordLogoContainerRef.current,
          { opacity: 1, duration: 0.6, ease: "power2.out" }
        )
        .to(
          phase8WordRef.current,
          { width: "auto", duration: 0.8, ease: "power2.out" },
          "<0.2"
        );

      // Phase 8.3: Final logo scale up - scale the entire container
      tl.to(phase8WordRef.current, { width: 0, duration: 0.5 }, "+=0.5")
        .to(
          phase8WordLogoContainerRef.current,
          { 
            scale: 1.85,
            duration: 1,
            ease: "power2.out"
          },
          "<"
        );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <NarrativeContainer ref={containerRef} id="narrative" data-hide-nav="immediate">
      <VideoContainer ref={videoContainerRef}>
        <StyledVideo ref={videoRef} autoPlay loop muted playsInline>
          <source src={torontoVid} type="video/mp4" />
        </StyledVideo>
        <VideoGradientOverlay ref={videoGradientRef} />
        <VideoOverlay ref={videoOverlayRef} />
      </VideoContainer>

      <Phase1Container ref={phase1ContainerRef}>
        <SmallText ref={smallText1Ref}>
          There have always been and will always be
        </SmallText>
        <LargeText ref={largeText1Ref}>Challenging Cycles</LargeText>
        
        <SmallText2 ref={smallText2Ref}>
          But just as change is inevitable
        </SmallText2>
        <LargeText2 ref={largeText2Ref}>
          So Is Renewal
        </LargeText2>
      </Phase1Container>

      <Phase3TextTop ref={phase3TopRef}>
        That inevitable progress is no accident.  <br />
        It's the result of
      </Phase3TextTop>

      <Phase3TextBottom ref={phase3BottomRef}>
        <Phase3Row>
          <Phase3Word>Building,</Phase3Word>
          <Phase3Word>Thinking and </Phase3Word>
        </Phase3Row>
        <Phase3Large>Working Together</Phase3Large>
      </Phase3TextBottom>

      <ImageGrid ref={imageGridRef}>
        <ImageCluster>
          <ImagePlaceholder
            ref={el => imagePlaceholdersRef.current[0] = el}
            className="narrative-image-1"
            style={{ width: '300px', height: '300px', top: '5%', left: '5%' }}
            $bgImage="/images/uli-stack-photos/stack_1.jpeg"
          />
          <ImagePlaceholder
            ref={el => imagePlaceholdersRef.current[1] = el}
            className="narrative-image-2"
            style={{ width: '250px', height: '300px', top: '15%', right: '35%' }}
            $bgImage="/images/uli-stack-photos/stack_2.jpeg"
          />
          <ImagePlaceholder
            ref={el => imagePlaceholdersRef.current[2] = el}
            className="narrative-image-3"
            style={{ width: '350px', height: '200px', top: '45%', left: '18%' }}
            $bgImage="/images/uli-stack-photos/stack_3.jpeg"
          />
          <ImagePlaceholder
            ref={el => imagePlaceholdersRef.current[3] = el}
            className="narrative-image-4"
            style={{ width: '280px', height: '300px', top: '0%', right: '8%' }}
            $bgImage="/images/uli-stack-photos/stack_4.jpeg"
          />
          <ImagePlaceholder
            ref={el => imagePlaceholdersRef.current[4] = el}
            className="narrative-image-5"
            style={{ width: '200px', height: '200px', bottom: '70%', left: '40%' }}
            $bgImage="/images/uli-stack-photos/stack_5.jpeg"
          />
          <ImagePlaceholder
            ref={el => imagePlaceholdersRef.current[5] = el}
            className="narrative-image-6"
            style={{ width: '320px', height: '200px', bottom: '0%', right: '15%' }}
            $bgImage="/images/uli-stack-photos/stack_6.jpeg"
          />
        </ImageCluster>
        
        <Phase4Text>
          ULI Toronto is the one place where developers, designers, planners, capital, and public leaders meet as equals to <Highlight>shape better urban places.</Highlight>
        </Phase4Text>
      </ImageGrid>

      <Phase5Container ref={phase5ContainerRef}>
        <Phase5InnerContainer>
          <Phase5TextLeft ref={phase5TextRef}>
            <Phase5SmallText>We convene the teams that</Phase5SmallText>
            <Phase5LargeText>Build Cities</Phase5LargeText>
          </Phase5TextLeft>
          <Phase5ImagesRight>
            <Phase5VideoContainer ref={el => stackingImagesRef.current[0] = el}>
              <Phase5Video
                autoPlay
                muted
                loop
                playsInline
                controls={false}
              >
                <source src={torontoVid2} type="video/mp4" />
                Your browser does not support the video tag.
              </Phase5Video>
            </Phase5VideoContainer>
          </Phase5ImagesRight>
        </Phase5InnerContainer>
      </Phase5Container>

      <Phase6Container ref={phase6ContainerRef}>
        <Phase6BackgroundImage 
          ref={bg1Ref}
          style={{ backgroundImage: "url('/images/photos/collborativuli.jpeg')" }}
        />
        <Phase6BackgroundImage 
          ref={bg2Ref}
          style={{ backgroundImage: "url('/images/photos/responsibuli.jpeg')" }}
        />
        <Phase6BackgroundImage 
          ref={bg3Ref}
          style={{ backgroundImage: "url('/images/narrative-stack/stack-1/nar-stack-3.jpeg')" }}
        />
        <Phase6Overlay ref={overlayRef} />
        
        <Phase6TopText ref={phase6TopTextRef}>
          Our difference is our <Highlight>approach</Highlight>
        </Phase6TopText>
        <LogoContainer ref={logoContainerRef}>
          <Phase6WordsWrapper>
            <Phase6Word ref={word1Ref}>COLLABORATIV</Phase6Word>
            <Phase6Word ref={word2Ref}>RESPONSIB</Phase6Word>
            <Phase6Word ref={word3Ref}>HOPEF</Phase6Word>
          <img src={uliLogo} alt="ULI Toronto Logo" />
          </Phase6WordsWrapper>
        </LogoContainer>
        <Phase6Description ref={desc1Ref}>
          More than networking, we create a collaborative environment that fosters connection and change.
        </Phase6Description>
        <Phase6Description ref={desc2Ref}>
          It's not just responsible use of land, it's level headed experts from across domains thinking big about what's possible.
        </Phase6Description>
        <Phase6Description ref={desc3Ref}>
          These are not impossible dreams, it's practical and grounded optimism paired with deliberate action.
        </Phase6Description>
      </Phase6Container>

      <Phase7Container ref={phase7ContainerRef}>
        <Phase7InnerContainer>
          <Phase7VideoContainer ref={phase7VideoRef}>
            <img src="/images/photos/something-more.jpeg" alt="ULI Toronto" />
            <Phase7VideoMask ref={phase7VideoMaskRef} />
          </Phase7VideoContainer>
          <Phase7Content ref={phase7ContentRef}>
            <Phase7Text>
              Together, we have influence. In times of economic uncertainty, ULI membership means
            </Phase7Text>
            <Phase7LargeText>something more</Phase7LargeText>
            <Phase7Button href="https://toronto.uli.org/about/membership/" target="_blank" rel="noopener noreferrer">Become a Member</Phase7Button>
          </Phase7Content>
        </Phase7InnerContainer>
      </Phase7Container>

      <Phase8Container ref={phase8ContainerRef}>
        <Phase8InnerContainer>
          <Phase8TopText ref={phase8TopTextRef}>
            When we come together renewal is
          </Phase8TopText>
          <Phase8LargeText ref={phase8LargeTextRef}>
            Inevitable
          </Phase8LargeText>
          <Phase8WordLogoContainer ref={phase8WordLogoContainerRef}>
            <Phase8WordsWrapper>
              <Phase8Word ref={phase8WordRef}>INEVITAB</Phase8Word>
            </Phase8WordsWrapper>
            <Phase8Logo ref={phase8LogoRef} src={uliLogo} alt="ULI" />
          </Phase8WordLogoContainer>
        </Phase8InnerContainer>
      </Phase8Container>
    </NarrativeContainer>
  );
};

export default Narrative;

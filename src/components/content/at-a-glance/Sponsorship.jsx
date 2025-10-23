import styled from 'styled-components';
import Marquee from 'react-fast-marquee';
import { colors, GridContainer, GridRow, GridColumn } from '../../../styles';
import sponsorsData from '../../../data/sponsors.json';

const SponsorshipSection = styled.section`
  width: 100%;
  padding: 80px 0;
  background-color: #FAFAFA;
`;

const SponsorshipTitle = styled.h2`
  color: ${colors.rubyRed};
  margin-bottom: 60px;
  position: relative;
  font-size: 85px;
  line-height: 1.1;
  letter-spacing: -0.03em;
  font-family: 'Big Shoulders', sans-serif;
  font-weight: 800;
  text-align: center;
  width: 100%;

  @media (max-width: 1024px) {
    font-size: 64px;
  }

  @media (max-width: 768px) {
    font-size: 52px;
  }

  @media (max-width: 480px) {
    font-size: 42px;
  }
`;

const ThankYouText = styled.p`
  font-size: 24px;
  color: ${colors.black};
  text-align: center;
  margin-bottom: 40px;
  font-weight: 500;
`;

const MarqueeWrapper = styled.div`
  width: 100%;
  padding: 60px 0;
  margin-bottom: 40px;
  background-color: #FAFAFA;
`;

const MarqueeItem = styled.div`
  display: inline-block;       
  vertical-align: top;
  margin: 0 30px;           
`;

const SponsorBox = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    img {
      filter: grayscale(0%);
      opacity: 1;
    }
  }
`;

const SponsorLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  width: 100%;
`;

const SponsorLogo = styled.img`
  max-width: 100%;
  max-height: 100px;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 1;
  transition: all 0.3s ease;
  margin-bottom: 10px;
`;

const SponsorTier = styled.div`
  font-size: 12px;
  color: ${colors.rubyRed};
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SponsorButton = styled.a`
  display: inline-block;
  padding: 12px 20px;
  background-color: ${colors.rubyRed};
  color: ${colors.white};
  text-decoration: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 400;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.black};
    transform: translateY(-2px);
  }
`;

const Sponsorship = ({ sectionId = "at-a-glance-sponsorship" }) => {
  return (
    <SponsorshipSection id={sectionId} data-hide-nav>
      <GridContainer>
        <GridRow>
          <GridColumn cols={12}>
            <SponsorshipTitle> Special Thanks to Our Sponsors</SponsorshipTitle>
          </GridColumn>
        </GridRow>
      </GridContainer>
      <MarqueeWrapper>
        <Marquee
          gradient={false}
          speed={40}
          pauseOnHover={true}
          pauseOnClick={true}
          autoFill                     // keeps items repeating to fill the track
        >
          {sponsorsData.sponsors.map((sponsor, index) => (
            <MarqueeItem key={index}>
              <SponsorBox>
                <SponsorLink
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${sponsor.name} website`}
                >
                  <SponsorLogo
                    src={sponsor.logo}
                    alt={sponsor.name}
                    loading="lazy"
                  />
                  <SponsorTier>{sponsor.tier}</SponsorTier>
                </SponsorLink>
              </SponsorBox>
            </MarqueeItem>
          ))}
        </Marquee>
      </MarqueeWrapper>

      <ButtonContainer>
        <SponsorButton
          href="https://toronto.uli.org/about/sponsorship/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more about Sponsorship
        </SponsorButton>
      </ButtonContainer>
    </SponsorshipSection>
  );
};

export default Sponsorship;

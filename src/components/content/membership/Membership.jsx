import styled from 'styled-components';
import { colors, GridContainer, GridRow, GridColumn } from '../../../styles';

const MembershipSection = styled.section`
  width: 100%;
  height: 100vh;
  height: 100dvh;
  padding: 120px 0;
  background-color: ${colors.mutedGreen};

  @media (min-width: 1600px) {
    height: 70vh;
    height: 70dvh;
  }

  @media (max-width: 1024px) {
    height: auto;
    min-height: 80vh;
    padding: 100px 0;
  }

  @media (max-width: 768px) {
    padding: 80px 0;
    min-height: 70vh;
  }

  @media (max-width: 480px) {
    padding: 60px 0;
    min-height: 60vh;
  }
`;

const MembershipTitle = styled.h1`
  font-family: 'Big Shoulders', sans-serif;
  font-size: 150px;
  font-weight: 800;
  color: ${colors.primaryGreen};
  line-height: 0.9;
  text-transform: uppercase;
  margin: 0 0 60px 0;

  @media (max-width: 1024px) {
    font-size: 90px;
    margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    font-size: 64px;
    margin-bottom: 32px;
  }

  @media (max-width: 480px) {
    font-size: 52px;
    margin-bottom: 24px;
  }
`;

const Subtitle = styled.h2`
  font-size: 28px;
  font-weight: 500;
  color: ${colors.primaryGreen};
  margin-bottom: 40px;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 24px;
  }
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: ${colors.primaryGreen};
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    margin-bottom: 18px;
  }
`;

const CTAButton = styled.a`
  display: inline-block;
  padding: 16px;
  background-color: ${colors.primaryGreen};
  color: ${colors.white};
  text-decoration: none;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 400;
  transition: all 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: ${colors.black};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 14px 28px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    padding: 12px 24px;
    width: 100%;
    text-align: center;
  }
`;

const Membership = ({ sectionId = "membership" }) => {
  return (
    <MembershipSection id={sectionId}>
      <GridContainer>
        <GridRow>
        <GridColumn cols={4} mobileCols={0}></GridColumn>
          <GridColumn cols={5} mobileCols={12}>
            <MembershipTitle>Membership</MembershipTitle>
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn cols={4} mobileCols={0}></GridColumn>
          <GridColumn cols={7} mobileCols={12}>
            <Subtitle>
              Connect. Inspire. Lead.
              <br />
              Become a member of ULI.
            </Subtitle>
            <Description>
              ULI is a prestigious nonprofit, nonpartisan research and education organization offering unparalleled conferences, events, and publications—discounted for ULI members.
            </Description>
            <Description>
              If you are involved in real estate development and placemaking, enjoy the best your profession has to offer. Join ULI today.
            </Description>
            <CTAButton
              href="https://toronto.uli.org/about/membership/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Become a Member
            </CTAButton>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </MembershipSection>
  );
};

export default Membership;


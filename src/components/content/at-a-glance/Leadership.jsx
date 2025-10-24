import React from 'react';
import styled from 'styled-components';
import { colors, GridContainer, GridRow, GridColumn } from '../../../styles';
import leadershipData from '../../../data/leadership.json';

const LeadershipSection = styled.section`
  width: 100%;
  padding: 60px 0;
  background-color: ${colors.white};
`;

const LeadershipTitle = styled.h2`
  max-width: 18ch;
  color: ${colors.brandTeal};
  margin-bottom: 60px;
  position: relative;
  font-size: 85px;
  line-height: 1.1;
  letter-spacing: -0.03em;
  font-family: 'Big Shoulders', sans-serif;
  font-weight: 800;

  @media (max-width: 1024px) {
    font-size: 64px;
  }

  @media (max-width: 768px) {
    font-size: 52px;
    max-width: none;
  }

  @media (max-width: 480px) {
    font-size: 42px;
  }
`;

const ProfilesContainer = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const ProfileCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProfileImage = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 20px;
`;

const ProfileRole = styled.div`
  font-size: 14px;
  color: ${colors.brandTeal};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
`;

const ProfileName = styled.div`
  font-size: 30px;
  font-family: 'Big Shoulders', sans-serif;
  font-weight: 700;
  color: ${colors.black};
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const LeadershipLink = styled.a`
  display: inline-block;
  padding: 12px 20px;
  background-color: ${colors.brandTeal};
  color: ${colors.white};
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${colors.black};
    transform: translateY(-2px);
  }
`;

const Leadership = ({ sectionId = "at-a-glance-leadership" }) => {
  return (
    <LeadershipSection id={sectionId}>
      <GridContainer>
        <GridRow>
          <GridColumn cols={4} mobileCols={0} />
          <GridColumn cols={8} mobileCols={12}>
            <LeadershipTitle>FY25 Leadership</LeadershipTitle>
            
            <ProfilesContainer>
              {leadershipData.leaders.map((leader, index) => (
                <ProfileCard key={index}>
                  <ProfileImage src={leader.image} alt={leader.name} />
                  <ProfileRole>{leader.role}</ProfileRole>
                  <ProfileName>{leader.name}</ProfileName>
                </ProfileCard>
              ))}
            </ProfilesContainer>
            
            <LinksContainer>
              {leadershipData.links.map((link, index) => (
                <LeadershipLink 
                  key={index} 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.text}
                </LeadershipLink>
              ))}
            </LinksContainer>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </LeadershipSection>
  );
};

export default Leadership;


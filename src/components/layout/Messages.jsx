import React from 'react';
import styled from 'styled-components';
import { colors, GridContainer, GridRow, GridColumn } from '../../styles';

const MessagesSection = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: ${colors.lightBlue};
  padding: 120px 0;

  @media (max-width: 1024px) {
    min-height: auto;
    padding: 100px 0;
  }

  @media (max-width: 768px) {
    padding: 80px 0;
  }

  @media (max-width: 480px) {
    padding: 60px 0;
  }
`;

const MessageContainer = styled.div`
  margin-bottom: 120px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 100px;
  }

  @media (max-width: 480px) {
    margin-bottom: 80px;
  }
`;

const MessageTitle = styled.h3`
  
  font-size: 85px;
  line-height: 1.1;
  letter-spacing: -0.03em;
  font-family: 'Big Shoulders', sans-serif;
  font-weight: 800;

  color: #2C4D82;
  margin-bottom: 24px;

  @media (min-width: 1600px) {
    font-size: 100px;
  }

  @media (max-width: 1024px) {
    font-size: 64px;
  }

  @media (max-width: 768px) {
    font-size: 52px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 42px;
  }
`;

const MessageAuthor = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.black};
  margin-bottom: 3px;
  margin-top: 50px;
  /* align to right */
  
`;

const MessageRole = styled.div`
  font-size: 14px;
  color: ${colors.black};
  opacity: 0.7;
  margin-bottom: 32px;
  font-style: italic;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const MessageText = styled.p`
  font-size: 16px;
  line-height: 1.55;
  color: ${colors.black};
  margin-bottom: 20px;
  padding-right: 15px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 1.6;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const DirectorImage = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 8px;
  background-image: url('/images/photos/criticial-indus.jpg');
  background-size: cover;
  background-position: center;
  margin-bottom: 8px;

  @media (min-width: 1600px) {
    height: 750px;
  }

  @media (max-width: 768px) {
    height: 450px;
    margin-bottom: 10px;
  }
`;

const ChairImage = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 8px;
  background-image: url('/images/photos/salima.jpg');
  background-size: cover;
  background-position: center;
  margin-bottom: 8px;

  @media (min-width: 1600px) {
    height: 750px;
  }

  @media (max-width: 768px) {
    height: 450px;
    margin-bottom: 10px;
  }
`;

const ImageCaption = styled.p`
  font-size: 13px;
  color: ${colors.black};
  opacity: 0.7;
  font-style: italic;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 24px;
  }
`;

const StaffGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 24px;
  margin-top: 60px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const StaffMember = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StaffThumbnail = styled.div`
  width: 60px;
  height: 60px;
  background-color: ${colors.white};
  background-image: url(${props => props.$bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 4px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const StaffInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const StaffName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.black};
  margin-bottom: 4px;
`;

const StaffRole = styled.div`
  font-size: 12px;
  color: ${colors.black};
  font-style: italic;
  opacity: 0.7;
`;

const Messages = () => {
  return (
    <MessagesSection id="messages" data-messages="true">
      <GridContainer>

        {/* Message from Executive Director */}
        <MessageContainer>
          <GridRow>
            <GridColumn cols={3}></GridColumn>
            <GridColumn cols={1}></GridColumn>
            <GridColumn cols={8}>
            <MessageTitle>
                    Message from the <br />
                    Executive Director
                </MessageTitle>
                <DirectorImage />
              <ImageCaption>Executive Director Richard Joy</ImageCaption>
              <GridRow>
                <GridColumn cols={6}>
                    <MessageText>
                    FY25 was a year of remarkable success, despite facing rising interest rates, construction cost inflation, a stalled condo market, and geopolitical uncertainty. ULI Toronto defied the headwinds, growing our membership, programs, sponsorship, and impact.
                  </MessageText>
                  <MessageText>
                    With over 10,000 registrations across 77 events, record-setting gatherings like our Summer Social (782 attendees) and Meet the Chief Planners Dinner (520+ attendees), and mission-rich programming including our first AI Summit and expanded Public Sector Breakfast Series — we delivered on our role as a trusted convenor and catalyst.
                  </MessageText>
                </GridColumn>
                <GridColumn cols={6}>
                  <MessageText>
                  We closed FY25 in a position of financial strength with nearly $800K in reserves, a projected surplus, and earned two ULI Americas Awards — for our Answering the Call to Action 92 Guide and for the Accelerating Accessibility Coalition.
                </MessageText>
                <MessageText>
                  Looking forward, FY26 presents new challenges — from evolving housing policy to AI disruption. But with the commitment of our members, volunteers, and leadership, ULI Toronto is well-positioned to lead with vision and impact.
                </MessageText>
                </GridColumn>
              </GridRow>
              
              <MessageAuthor>Richard Joy</MessageAuthor>
              <MessageRole>Executive Director</MessageRole> 
              <StaffGrid>
                <StaffMember>
                  <StaffThumbnail $bgImage="https://ulidigitalmarketing.blob.core.windows.net/ulidcnc/sites/14/2023/07/AM2_0213-1-2-480x405.jpg" />
                  <StaffInfo>
                    <StaffName>Richard Joy</StaffName>
                    <StaffRole>Executive Director</StaffRole>
                  </StaffInfo>
                </StaffMember>
                <StaffMember>
                  <StaffThumbnail $bgImage="https://ulidigitalmarketing.blob.core.windows.net/ulidcnc/sites/14/2023/07/2-480x405.png" />
                  <StaffInfo>
                    <StaffName>Alexandra Rybak</StaffName>
                    <StaffRole>Senior Director</StaffRole>
                  </StaffInfo>
                </StaffMember>
                <StaffMember>
                  <StaffThumbnail $bgImage="https://ulidigitalmarketing.blob.core.windows.net/ulidcnc/sites/14/2023/07/2F63E8A1-EA89-4EDE-815F-7EEBF2BF8B35_1_201_a-64bfcb656b549-480x402.jpeg" />
                  <StaffInfo>
                    <StaffName>Jenny Estremadoyro</StaffName>
                    <StaffRole>Senior Associate</StaffRole>
                  </StaffInfo>
                </StaffMember>
                <StaffMember>
                  <StaffThumbnail $bgImage="https://ulidigitalmarketing.blob.core.windows.net/ulidcnc/sites/14/2021/01/image_6487327_web-600x600.jpg" />
                  <StaffInfo>
                    <StaffName>Bdour Abu Qubu</StaffName>
                    <StaffRole>Manager, Events and Marketing</StaffRole>
                  </StaffInfo>
                </StaffMember>
                <StaffMember>
                  <StaffThumbnail $bgImage="https://ulidigitalmarketing.blob.core.windows.net/ulidcnc/sites/14/2024/04/Juhi-2024-Headshot-1-480x405.jpg" />
                  <StaffInfo>
                    <StaffName>Juhi Dawoodia</StaffName>
                    <StaffRole>Associate, Events</StaffRole>
                  </StaffInfo>
                </StaffMember>
                <StaffMember>
                  <StaffThumbnail $bgImage="https://ulidigitalmarketing.blob.core.windows.net/ulidcnc/sites/14/2025/09/Laura-Headshot-68bb53d20912b-480x415.jpg" />
                  <StaffInfo>
                    <StaffName>Laura Bellantone</StaffName>
                    <StaffRole>Associate, Marketing</StaffRole>
                  </StaffInfo>
                </StaffMember>
              </StaffGrid>
            </GridColumn>
          </GridRow>
        </MessageContainer>

        {/* Message from Chair */}
        <MessageContainer>
          <GridRow>
            <GridColumn cols={3}></GridColumn>
            <GridColumn cols={1}></GridColumn>
            <GridColumn cols={8}>
              <MessageTitle>
                Message from the <br />
                Chair
              </MessageTitle>
              <ChairImage />
              <ImageCaption>Chair Salima Rawji</ImageCaption>

              <GridRow>
                <GridColumn cols={6}>
                <MessageText>
                FY25 was a year defined by complexity—where challenges in affordability, geopolitics, economic uncertainty, and social cohesion demanded more from all of us. But it was also a year that affirmed the vital role ULI Toronto plays as a trusted convener and catalyst for progress in our region.
              </MessageText>
              <MessageText>
                Amid rising costs, slumping markets, and urgent housing needs, we stayed focused on impact. From record-setting events to award-winning initiatives, we helped shape conversations that matter—on how to build cities that are more inclusive, more resilient, and more responsive to the people they serve. Whether through our groundbreaking work on Truth & Reconciliation, the growth of our Accessibility Coalition, or new platforms for dialogue between public and private leadership, we embraced the urgency of now.
              </MessageText>
                </GridColumn>
                <GridColumn cols={6}>
                <MessageText>
                This year's theme—Meeting the Moment—speaks to that responsibility. It's about recognizing the scale of the challenges we face, and choosing to lean in with creativity, humility, and shared purpose. It means offering space for difficult conversations and bold ideas. And it means ensuring that ULI Toronto continues to be a place where people from across the sector come together to lead—not just for today, but for what comes next.
              </MessageText>
              <MessageText>
                As we look ahead to FY26, I want to thank our members, volunteers, sponsors, and staff. Your continued support and engagement are the foundation of our success. Together, we are not only meeting the moment—we are shaping the future.
              </MessageText>
                </GridColumn>
              </GridRow>
              <MessageAuthor>Salima Rawji</MessageAuthor>
              <MessageRole>Chair, ULI Toronto</MessageRole>
            </GridColumn>
          </GridRow>
        </MessageContainer>
      </GridContainer>
    </MessagesSection>
  );
};

export default Messages;


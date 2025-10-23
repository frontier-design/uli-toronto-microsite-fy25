import React from 'react';
import styled from 'styled-components';
import { colors, GridContainer, GridRow, GridColumn } from '../../styles';
import { ULILogo } from '../ui';

const FooterContainer = styled.footer`
  background-color: ${colors.mutedGreen};
  color: ${colors.primaryGreen};
  padding: 60px 0 40px 0;
  
  @media (max-width: 768px) {
    padding: 40px 0 30px 0;
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 30px;
  
  @media (max-width: 768px) {
    gap: 24px;
  }
`;

const LogoContainer = styled.div`
  height: 40px;
  width: auto;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    height: 32px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  
  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const SocialLink = styled.a`
  color: ${colors.primaryGreen};
  text-decoration: none;
  font-size: 18px;
  opacity: 0.8;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Copyright = styled.p`
  font-size: 14px;
  color: ${colors.primaryGreen};
  opacity: 0.6;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <GridContainer>
        <GridRow>
          <GridColumn cols={12}>
            <FooterContent>
              <LogoContainer>
                <ULILogo color={colors.primaryGreen} height="100%" />
              </LogoContainer>
              
              <SocialLinks>
                <SocialLink href="https://toronto.uli.org" target="_blank" rel="noopener noreferrer">
                  Website
                </SocialLink>
                <SocialLink href="https://www.linkedin.com/company/uli-toronto" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </SocialLink>
                <SocialLink href="https://twitter.com/ulitoronto" target="_blank" rel="noopener noreferrer">
                  Twitter
                </SocialLink>
                <SocialLink href="https://www.instagram.com/uli_toronto/" target="_blank" rel="noopener noreferrer">
                  Instagram
                </SocialLink>
              </SocialLinks>
              
              <Copyright>
                © 2025 ULI Toronto. All rights reserved.
              </Copyright>
            </FooterContent>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </FooterContainer>
  );
};

export default Footer;

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { GrMoney } from 'react-icons/gr';
import { colors, GridContainer, GridRow, GridColumn } from '../../../styles';
import atAGlanceData from '../../../data/at-a-glance.json';
import financialSnapshotData from '../../../data/financial-snapshot.json';
import DistrictCouncil from './DistrictCouncil';
import Leadership from './Leadership';
import Sponsorship from './Sponsorship';
import { gsap } from '../../../hooks/useGSAP';

const AtAGlanceSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 60px 0 0 0;
`;

const AtAGlanceTitle = styled.h1`
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

const AtAGlanceSubtitle = styled.h3`
  font-size: 14px;
  color: ${colors.brandTeal};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 20px 0;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const AtAGlanceContent = styled.p`
  font-size: 16px;
  line-height: 1.5;
  max-width: 100%;
  margin-bottom: 50px;
  hyphens: auto;
  orphans: 3;
  widows: 3;
  
  word-spacing: 0.05em;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
`;

const FinancialTitle = styled.h2`
    max-width: 18ch;
    color: ${colors.brandTeal};
    margin-bottom: 90px;
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

// Financial Snapshot Components
const OverviewSection = styled.section`
  width: 100%;
  margin-top: 60px;
`;

const FinancialSection = styled.section`
  width: 100%;
  padding: 60px 0 0 0;
`;

const FinancialTable = styled.div`
  width: 100%;
  margin-bottom: 60px;
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const TableTitle = styled.h3`
  font-size: 36px;
  color: ${colors.black};
  font-family: 'Big Shoulders', sans-serif;
  font-weight: 700;
  margin: 0;
`;

const TableDivider = styled.hr`
  border: none;
  /* height: 1px;
  background: ${colors.black};
  margin: 0 0 20px 0; */
`;

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: ${props => props.$isEven ? colors.white : "#efefef"};
`;

const TableLabel = styled.span`
  font-size: 14px;
  line-height: 1.4;
`;

const TableValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  text-align: right;
`;

const TotalRow = styled(TableRow)`
  margin-top: 20px;
  padding: 16px 12px;
  border-top: none;
  background-color: ${colors.brandTeal} !important;
`;

const TotalLabel = styled(TableLabel)`
  font-weight: 700;
  color: ${colors.white};
  font-family: 'Big Shoulders', sans-serif;
  font-size: 18px;
`;

const TotalValue = styled(TableValue)`
  font-weight: 700;
  color: ${colors.white};
  font-family: 'Big Shoulders', sans-serif;
  font-size: 18px;
`;

const HighlightsWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isContentVisible',
})`
  background-color: ${colors.brandTeal};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  pointer-events: auto;
  opacity: ${props => props.isContentVisible ? 1 : 0};
  transition: opacity 0.15s ease;
  padding: 14px 0;
`;

const HighlightCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80px;
  justify-content: center;
`;

const HighlightLabel = styled.div`
  font-size: 14px;
  color: ${colors.white};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const HighlightValue = styled.div`
  font-size: 30px;
  color: ${colors.white};
  font-family: 'Big Shoulders', sans-serif;
  font-weight: 800;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const MoneyIcon = styled(GrMoney)`
  display: none !important;
  color: ${colors.white};
  font-size: 40px;
`;

const FixedHighlightsContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isVisible', 'topPosition', 'dynamicHeight'].includes(prop),
})`
  position: fixed;
  top: ${props => props.topPosition || '120px'};
  left: 0;
  width: 100%;
  z-index: ${props => props.isVisible ? 100 : -1};
  opacity: ${props => props.isVisible ? 1 : 0};
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
  transform: ${props => props.isVisible ? 'scale(1)' : 'scale(0.95)'};
  pointer-events: none;
  max-height: ${props => props.dynamicHeight || 'auto'};
  transition: opacity 0.2s ease, transform 0.2s ease, z-index 0s linear 0.2s;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const MobileHighlightsContainer = styled.div`
  display: none;
  width: 100%;
  margin-top: 40px;

  @media (max-width: 1024px) {
    display: block;
  }
`;

// Helper function to format currency
const formatCurrency = (amount) => {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(absAmount);
  return isNegative ? `-$${formatted}` : `$${formatted}`;
};

const AtAGlance = ({ sectionId = "at-a-glance" }) => {
  const [isHighlightsVisible, setIsHighlightsVisible] = useState(false);
  const [topPosition, setTopPosition] = useState('120px');
  const [dynamicHeight, setDynamicHeight] = useState('auto');
  const [isContentVisible, setIsContentVisible] = useState(false);
  const containerRef = useRef(null);

  const calculateTopPosition = useCallback(() => {
    const navigationElement = document.querySelector('[data-navigation="true"]');
    const navigationBottom = navigationElement ? 
      navigationElement.getBoundingClientRect().bottom : 100;
    const gapFromNav = 20;
    return `${navigationBottom + gapFromNav}px`;
  }, []);

  const calculateDynamicHeight = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const navigationElement = document.querySelector('[data-navigation="true"]');
    const navigationBottom = navigationElement ? 
      navigationElement.getBoundingClientRect().bottom : 100;
    const bottomMargin = 40;
    const gapFromNav = 20;
    const availableHeight = viewportHeight - navigationBottom - gapFromNav - bottomMargin;
    const minHeight = 150;
    const finalHeight = Math.max(minHeight, availableHeight);
    return `${finalHeight}px`;
  }, []);

  const updatePosition = useCallback(() => {
    const newTopPosition = calculateTopPosition();
    const newDynamicHeight = calculateDynamicHeight();
    
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        top: newTopPosition,
        maxHeight: newDynamicHeight,
        duration: 0.35,
        ease: "power2.out"
      });
    }
    
    setTopPosition(newTopPosition);
    setDynamicHeight(newDynamicHeight);
  }, [calculateTopPosition, calculateDynamicHeight]);

  const isNavigationVisible = useCallback(() => {
    const navigationWrapper = document.querySelector('[data-navigation="true"]');
    if (!navigationWrapper) return false;
    const computedStyle = window.getComputedStyle(navigationWrapper);
    return computedStyle.opacity !== '0' && computedStyle.zIndex !== '-1';
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const financialSection = document.getElementById('at-a-glance-financial-snapshot');
      const overviewSection = document.getElementById('at-a-glance-overview');
      if (!financialSection) return;

      const rect = financialSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Check if we're in the financial section (not in overview)
      const isInFinancialSection = rect.top < viewportHeight * 0.7 && rect.bottom > viewportHeight * 0.3;
      
      // Check if we've scrolled past the overview section
      let isPastOverview = true;
      if (overviewSection) {
        const overviewRect = overviewSection.getBoundingClientRect();
        isPastOverview = overviewRect.bottom < viewportHeight * 0.3; // Overview mostly scrolled past
      }
      
      const navVisible = isNavigationVisible();

      // Only show highlights if we're in financial section AND past the overview
      if (isInFinancialSection && isPastOverview && navVisible) {
        if (!isHighlightsVisible) {
          setIsHighlightsVisible(true);
          updatePosition();
          setTimeout(() => {
            setIsContentVisible(true);
          }, 50);
        }
      } else {
        if (isHighlightsVisible) {
          setIsContentVisible(false);
          setTimeout(() => {
            setIsHighlightsVisible(false);
          }, 150);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHighlightsVisible, isNavigationVisible, updatePosition]);

  useEffect(() => {
    const handleResize = () => {
      updatePosition();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updatePosition]);

  useEffect(() => {
    updatePosition();
  }, [updatePosition]);

  useEffect(() => {
    const handleNavigationStateChange = () => {
      updatePosition();
    };
    window.addEventListener('navigationStateChange', handleNavigationStateChange);
    return () => window.removeEventListener('navigationStateChange', handleNavigationStateChange);
  }, [updatePosition]);

  return (
    <AtAGlanceSection id={sectionId}>
      <FixedHighlightsContainer
        ref={containerRef}
        isVisible={isHighlightsVisible}
        topPosition={topPosition}
        dynamicHeight={dynamicHeight}
      >
        <GridContainer>
          <GridRow>
            <GridColumn cols={3}>
              <HighlightsWrapper isContentVisible={isContentVisible}>
                <HighlightCard>
                  <HighlightLabel>Total Revenue</HighlightLabel>
                  <HighlightValue>{formatCurrency(financialSnapshotData.highlights.totalRevenue)}</HighlightValue>
                </HighlightCard>
                <HighlightCard>
                  <HighlightLabel>Total Expenses</HighlightLabel>
                  <HighlightValue>{formatCurrency(financialSnapshotData.highlights.totalExpenses)}</HighlightValue>
                </HighlightCard>
                <HighlightCard>
                  <HighlightLabel>Total Reserves</HighlightLabel>
                  <HighlightValue>{formatCurrency(financialSnapshotData.highlights.totalReserves)}</HighlightValue>
                </HighlightCard>
                <MoneyIcon />
              </HighlightsWrapper>
            </GridColumn>
            <GridColumn cols={9} />
          </GridRow>
        </GridContainer>
      </FixedHighlightsContainer>

      <OverviewSection id="at-a-glance-overview">
        <GridContainer>
          <GridRow>
            <GridColumn cols={4} mobileCols={0} />
            <GridColumn cols={8} mobileCols={12}>
              <AtAGlanceTitle dangerouslySetInnerHTML={{ __html: atAGlanceData.title }} />
            </GridColumn>
          </GridRow>
          
          <GridRow>
            <GridColumn cols={12}>
              <GridRow>
                <GridColumn cols={4} mobileCols={0} />
                <GridColumn cols={1} mobileCols={0}>
                  <AtAGlanceSubtitle>Overview</AtAGlanceSubtitle>
                </GridColumn>
                <GridColumn cols={7} mobileCols={12}>
                  <AtAGlanceContent>
                    {atAGlanceData.content}
                  </AtAGlanceContent>
                </GridColumn>
              </GridRow>
            </GridColumn>
          </GridRow>
        </GridContainer>
      </OverviewSection>
        
      {/* FY25 Financial Snapshot Section */}
      <FinancialSection id="at-a-glance-financial-snapshot">
        <GridContainer>
          <GridRow>
            <GridColumn cols={4} mobileCols={0} /> {/* Nav space */}
            <GridColumn cols={8} mobileCols={12}>
              <FinancialTitle>FY25 Financial <br /> Snapshot</FinancialTitle>
              
              {/* Revenue Table */}
              <FinancialTable>
                <TableHeader>
                  <TableTitle> Revenue </TableTitle>
                </TableHeader>
                <TableDivider />
                {financialSnapshotData.revenue.map((item, index) => (
                  <TableRow key={index} $isEven={index % 2 === 0}>
                    <TableLabel>{item.label}</TableLabel>
                    <TableValue>{formatCurrency(item.amount)}</TableValue>
                  </TableRow>
                ))}
                <TotalRow>
                  <TotalLabel>TOTAL Revenue</TotalLabel>
                  <TotalValue>{formatCurrency(financialSnapshotData.totalRevenue)}</TotalValue>
                </TotalRow>
              </FinancialTable>
              
              {/* Expenses Table */}
              <FinancialTable>
                <TableHeader>
                  <TableTitle> Expenses </TableTitle>
                </TableHeader>
                <TableDivider />
                {financialSnapshotData.expenses.map((item, index) => (
                  <TableRow key={index} $isEven={index % 2 === 0}>
                    <TableLabel>{item.label}</TableLabel>
                    <TableValue>{formatCurrency(item.amount)}</TableValue>
                  </TableRow>
                ))}
                <TotalRow>
                  <TotalLabel>TOTAL EXPENSES</TotalLabel>
                  <TotalValue>{formatCurrency(financialSnapshotData.totalExpenses)}</TotalValue>
                </TotalRow>
              </FinancialTable>

              {/* Mobile Highlights - Only visible on mobile */}
              <MobileHighlightsContainer>
                <HighlightsWrapper isContentVisible={true}>
                  <HighlightCard>
                    <HighlightLabel>Total Revenue</HighlightLabel>
                    <HighlightValue>{formatCurrency(financialSnapshotData.highlights.totalRevenue)}</HighlightValue>
                  </HighlightCard>
                  <HighlightCard>
                    <HighlightLabel>Total Expenses</HighlightLabel>
                    <HighlightValue>{formatCurrency(financialSnapshotData.highlights.totalExpenses)}</HighlightValue>
                  </HighlightCard>
                  <HighlightCard>
                    <HighlightLabel>Total Reserves</HighlightLabel>
                    <HighlightValue>{formatCurrency(financialSnapshotData.highlights.totalReserves)}</HighlightValue>
                  </HighlightCard>
                  <MoneyIcon />
                </HighlightsWrapper>
              </MobileHighlightsContainer>
            </GridColumn>
          </GridRow>
        </GridContainer>
      </FinancialSection>
      
      <DistrictCouncil sectionId="at-a-glance-district-council" />
      
      <Leadership sectionId="at-a-glance-leadership" />
      
      <Sponsorship sectionId="at-a-glance-sponsorship" />
    </AtAGlanceSection>
  );
};

export default AtAGlance;


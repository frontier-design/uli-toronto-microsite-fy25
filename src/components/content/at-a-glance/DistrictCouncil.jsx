import React, { useRef, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { FaMap, FaMicrophone, FaHandshake } from 'react-icons/fa';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { colors, GridContainer, GridRow, GridColumn } from '../../../styles';
import districtCouncilData from '../../../data/district-council.json';

const DistrictCouncilSection = styled.section`
  width: 100%;
  padding: 60px 0;
  background-color: ${colors.white};
`;

const SectionTitle = styled.h2`
  max-width: 25ch;
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

const ChartTitle = styled.h3`
  font-family: 'Big Shoulders', sans-serif;
  font-size: 24px;
  color: ${colors.black};
  margin-bottom: 20px;
  font-weight: 700;
`;

const ChartSubtitle = styled.p`
  font-size: 14px;
  color: ${colors.brandTeal};
  margin-bottom: 30px;
`;

const ChartContainer = styled.div`
  width: 100%;
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    margin-bottom: 50px;
  }

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }

  @media (max-width: 480px) {
    margin-bottom: 30px;
  }
`;

const PieChartContainer = styled.div`
  width: 100%;
  height: 350px;
  
  svg {
    display: block;
  }
`;

const PieLegendHorizontal = styled.div`
  column-count: 2;
  margin-top: 50px;
  
  > * {
    break-inside: avoid;
    margin-bottom: 10px;
  }
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  min-height: 30px;
  max-width: 140px;
`;

const LegendDot = styled.div`
  width: 17px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: ${props => props.$color};
  margin-right: 8px;
  flex-shrink: 0;
`;

const TreemapLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
`;

const TreemapLegendItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const TreemapLegendSquare = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${props => props.$color};
  margin-right: 6px;
  flex-shrink: 0;
`;

const TreemapContainer = styled.div`
  width: 100%;
  height: 350px;
  margin-bottom: 40px;
`;

const BarChartContainer = styled.div`
  width: 100%;
  margin-top: 70px;
  min-height: 400px;
  overflow: hidden;

  svg {
    max-width: 100%;
    height: auto;
  }

  @media (max-width: 1024px) {
    margin-top: 40px;
  }

  @media (max-width: 768px) {
    margin-top: 30px;
  }

  @media (max-width: 480px) {
    margin-top: 24px;
  }
`;

const KeyFeaturesContainer = styled.div`
  background-color: ${colors.brandTeal};
  padding: 40px 30px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 400px;
`;

const KeyFeaturesTitle = styled.h3`
  font-family: 'Big Shoulders', sans-serif;
  font-size: 32px;
  color: ${colors.white};
  margin-bottom: 40px;
  font-weight: 800;
  width: 100%;
`;

const StatItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 40px;
  width: 100%;
`;

const StatIcon = styled.div`
  color: ${colors.white};
  font-size: 55px;
  margin-right: 20px;
  margin-top: 5px;
  flex-shrink: 0;
`;

const StatContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StatNumber = styled.div`
  font-family: 'Big Shoulders', sans-serif;
  font-size: 48px;
  color: ${colors.white};
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 8px;
`;

const StatLabel = styled.p`
  color: ${colors.white};
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
`;

const DistrictCouncil = ({ sectionId = "at-a-glance-district-council" }) => {
  const pieChartRef = useRef();
  const treemapRef = useRef();
  const barChartRef = useRef();
  const [treemapLegendData, setTreemapLegendData] = useState([]);

  // Memoized pie chart data
  const pieData = useMemo(() => {
    return districtCouncilData.membersBySector.map(d => ({
      ...d,
      percentage: d.value
    }));
  }, []);

  // Memoized treemap data
  const treemapData = useMemo(() => {
    const data = districtCouncilData.membershipTypes.breakdown.map(d => ({
      name: d.name,
      value: d.value,
      percentage: d.value
    }));
    
    return d3.hierarchy({
      name: 'root',
      children: data
    }).sum(d => d.value);
  }, []);

  // Memoized bar chart data
  const barData = useMemo(() => {
    return [...districtCouncilData.eventAttendance].sort((a, b) => b.attendance - a.attendance);
  }, []);

  // Pie Chart Component
  useEffect(() => {
    if (!pieChartRef.current || !pieData.length) return;

    const svg = d3.select(pieChartRef.current);
    svg.selectAll('*').remove();

    const width = 350;
    const height = 350;
    const radius = Math.min(width, height) / 2;

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie()
      .value(d => d.value)
      .sort(null);

    const arc = d3.arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius);

    const arcs = g.selectAll('.arc')
      .data(pie(pieData))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => d.data.color)
      .style('stroke', colors.white)
      .style('stroke-width', 1);

  }, [pieData]);

  // Treemap Component
  useEffect(() => {
    if (!treemapRef.current || !treemapData) return;

    // Small delay to ensure container is properly sized
    const renderTreemap = () => {
      const svg = d3.select(treemapRef.current);
      svg.selectAll('*').remove();

      // Get the container width for responsive sizing - ensure we get the full available width
      const containerWidth = treemapRef.current.parentElement.clientWidth;
      const width = containerWidth > 0 ? containerWidth : 400; // Use container width or fallback
      const height = 300;
      const margin = { top: 0, right: 0, bottom: 0, left: 0 };

      const g = svg
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const treemap = d3.treemap()
        .size([width - margin.left - margin.right, height - margin.top - margin.bottom]);

      const root = treemap(treemapData);

      const cells = g.selectAll('g')
        .data(root.leaves())
        .enter()
        .append('g')
        .attr('transform', d => `translate(${d.x0},${d.y0})`);

      // Custom color scheme based on #595177
      const baseColor = "#595177";
      const colorScale = d3.scaleSequential((t) => {
        const base = d3.rgb(baseColor);
        // Create lighter variations by blending with white
        const white = d3.rgb(255, 255, 255);
        return d3.rgb(
          base.r + (white.r - base.r) * t * 0.8,
          base.g + (white.g - base.g) * t * 0.8,
          base.b + (white.b - base.b) * t * 0.8
        );
      })
      .domain([0, root.leaves().length - 1]);
      
      // Create legend data with colors
      const legendData = root.leaves().map((d, i) => ({
        name: d.data.name,
        percentage: d.data.percentage,
        color: colorScale(i)
      }));
      setTreemapLegendData(legendData);
      
      cells.append('rect')
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d => d.y1 - d.y0)
        .attr('fill', (d, i) => colorScale(i))
        .style('stroke', colors.white)
        .style('stroke-width', 1);

      // Add text to all rectangles with improved fitting
      const textElements = cells.append('text')
        .attr('x', d => (d.x1 - d.x0) / 2)
        .attr('y', d => (d.y1 - d.y0) / 2)
        .attr('text-anchor', 'middle')
        .style('font-weight', 'bold');

      textElements.each(function(d, i) {
        // Get the background color for this rectangle
        const bgColor = d3.rgb(colorScale(i));
        // Calculate luminance to determine if we need white or black text
        const luminance = (0.299 * bgColor.r + 0.587 * bgColor.g + 0.014 * bgColor.b) / 255;
        const textColor = luminance > 0.5 ? colors.black : colors.white;
        
        const rectWidth = d.x1 - d.x0;
        const rectHeight = d.y1 - d.y0;
        const area = rectWidth * rectHeight;
        const minDimension = Math.min(rectWidth, rectHeight);
        
        let fontSize = '8px';
        let showName = true;
        let nameText = d.data.name;
        
        // Determine font size and content based on available space
        if (minDimension < 25) {
          // Very small rectangles - only percentage
          fontSize = '7px';
          showName = false;
        } else if (minDimension < 40) {
          // Small rectangles - only percentage
          fontSize = '8px';
          showName = false;
        } else if (minDimension < 60 || area < 2000) {
          // Medium rectangles - abbreviated name
          fontSize = '9px';
          nameText = d.data.name.length > 12 ? 
            d.data.name.substring(0, 12) + '...' : 
            d.data.name;
        } else {
          // Large rectangles - full name
          fontSize = '12px';
        }
        
        const textElement = d3.select(this);
        textElement.style('fill', textColor).style('font-size', fontSize);
        
        // Calculate percentage font size (slightly larger)
        const percentageFontSize = fontSize === '7px' ? '9px' : 
                                   fontSize === '8px' ? '10px' : 
                                   fontSize === '9px' ? '12px' : '16px';
        
        if (showName) {
          // Add name on first line
          textElement.append('tspan')
            .attr('x', (d.x1 - d.x0) / 2)
            .attr('dy', '-0.3em')
            .text(nameText);
          
          // Add percentage on second line with Big Shoulders font
          textElement.append('tspan')
            .attr('x', (d.x1 - d.x0) / 2)
            .attr('dy', '1.2em')
            .style('font-family', 'Big Shoulders, sans-serif')
            .style('font-size', percentageFontSize)
            .style('font-weight', '800')
            .text(d.data.percentage + '%');
        } else {
          // Only show percentage for small rectangles
          textElement.append('tspan')
            .attr('x', (d.x1 - d.x0) / 2)
            .attr('dy', '0.35em')
            .style('font-family', 'Big Shoulders, sans-serif')
            .style('font-size', percentageFontSize)
            .style('font-weight', '800')
            .text(d.data.percentage + '%');
        }
      });
    };

    // Render with a small delay to ensure container is sized
    setTimeout(renderTreemap, 10);

  }, [treemapData]);

  // Bar Chart Component
  useEffect(() => {
    if (!barChartRef.current || !barData.length) return;

    const svg = d3.select(barChartRef.current);
    svg.selectAll('*').remove();

    // Get container width for responsive chart
    const container = barChartRef.current.parentElement;
    const containerWidth = container ? container.offsetWidth : 450;
    const width = Math.min(containerWidth, 450);
    const height = 250;
    const margin = { top: 30, right: 10, bottom: 60, left: 10 };

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleBand()
      .domain(barData.map(d => d.council))
      .range([0, width - margin.left - margin.right])
      .padding(0.15);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(barData, d => d.attendance) * 1.1])
      .range([height - margin.top - margin.bottom, 0]);

    g.selectAll('.bar')
      .data(barData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.council))
      .attr('y', d => yScale(d.attendance))
      .attr('width', xScale.bandwidth())
      .attr('height', d => yScale(0) - yScale(d.attendance))
      .attr('fill', d => d.council === 'Toronto' ? colors.brandTeal : '#D4DBEB');

    // Add numbers on top of bars
    g.selectAll('.bar-number')
      .data(barData)
      .enter()
      .append('text')
      .attr('class', 'bar-number')
      .attr('x', d => xScale(d.council) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d.attendance) - 8)
      .attr('text-anchor', 'middle')
      .style('font-size', '11px')
      .style('font-weight', 'bold')
      .style('fill', colors.black)
      .text(d => d.attendance.toLocaleString());

    // Add city labels below bars
    g.selectAll('.bar-label')
      .data(barData)
      .enter()
      .append('text')
      .attr('class', 'bar-label')
      .attr('x', d => xScale(d.council) + xScale.bandwidth() / 2)
      .attr('y', height - margin.top - margin.bottom + 15)
      .attr('text-anchor', 'middle')
      .style('font-size', '11px')
      .style('font-weight', 'bold')
      .style('fill', colors.black)
      .text(d => d.council);

  }, [barData]);

  return (
    <DistrictCouncilSection id={sectionId} data-hide-nav>
      <GridContainer>
        <GridRow>
          <GridColumn cols={12}>
            <SectionTitle>ULI Toronto District Council <br /> Year At a Glance</SectionTitle>
          </GridColumn>
        </GridRow>
        
        <GridRow>
          {/* Column 1: Pie Chart */}
          <GridColumn cols={4} mobileCols={12}>
            <ChartContainer>
              <ChartTitle>Members by Sector & Discipline</ChartTitle>
              <PieChartContainer>
                <svg ref={pieChartRef} />
              </PieChartContainer>
              <PieLegendHorizontal>
                {pieData.map((item, index) => (
                  <LegendItem key={index}>
                    <LegendDot $color={item.color} />
                    <span>{item.label} {item.percentage}%</span>
                  </LegendItem>
                ))}
              </PieLegendHorizontal>
            </ChartContainer>
          </GridColumn>
          
          {/* Column 2: Treemap + Bar Chart */}
          <GridColumn cols={4} mobileCols={12}>
            <ChartContainer>
              <ChartTitle>Membership Types</ChartTitle>
              <ChartSubtitle>Total: {districtCouncilData.membershipTypes.total.toLocaleString()} Members</ChartSubtitle>
              <TreemapContainer>
                <svg ref={treemapRef} />
              </TreemapContainer>
              <TreemapLegend>
                {treemapLegendData.map((item, index) => (
                  <TreemapLegendItem key={index}>
                    <TreemapLegendSquare $color={item.color} />
                    <span>{item.name} {item.percentage}%</span>
                  </TreemapLegendItem>
                ))}
              </TreemapLegend>
            </ChartContainer>
            
            <ChartContainer>
              <BarChartContainer>
              <ChartTitle>Event Attendance by District Council</ChartTitle>
                <svg ref={barChartRef} />
              </BarChartContainer>
            </ChartContainer>
          </GridColumn>
          
          <GridColumn cols={1} mobileCols={0} />
          {/* Column 3: Key Stats */}
          <GridColumn cols={3} mobileCols={12}>
            <ChartContainer>
              <KeyFeaturesContainer>
                <KeyFeaturesTitle>Key Stats</KeyFeaturesTitle>
                
                <StatItem>
                  <StatIcon>
                    <FaMap />
                  </StatIcon>
                  <StatContent>
                    <StatNumber>77</StatNumber>
                    <StatLabel>Events in FY24</StatLabel>
                  </StatContent>
                </StatItem>
                
                <StatItem>
                  <StatIcon>
                    <IoChatbubblesOutline />
                  </StatIcon>
                  <StatContent>
                    <StatNumber>130</StatNumber>
                    <StatLabel>Average event attendance for 26 virtual and 41 in-person events</StatLabel>
                  </StatContent>
                </StatItem>
                
                <StatItem>
                  <StatIcon>
                    <FaMicrophone />
                  </StatIcon>
                  <StatContent>
                    <StatNumber>413</StatNumber>
                    <StatLabel>Total speakers (45% female and 31% BIPOC)</StatLabel>
                  </StatContent>
                </StatItem>
                
                <StatItem>
                  <StatIcon>
                    <FaHandshake />
                  </StatIcon>
                  <StatContent>
                    <StatNumber>287</StatNumber>
                    <StatLabel>Volunteer committee members</StatLabel>
                  </StatContent>
                </StatItem>
              </KeyFeaturesContainer>
            </ChartContainer>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </DistrictCouncilSection>
  );
};

export default DistrictCouncil;

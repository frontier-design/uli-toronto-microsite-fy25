import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { colors, GridContainer, GridRow, GridColumn } from '../../styles';
import storiesData from '../../data/stories.json';
import { gsap } from '../../hooks/useGSAP';

const DynamicDataContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isVisible', 'dynamicHeight', 'topPosition'].includes(prop),
})`
  position: fixed;
  top: ${props => props.topPosition || '120px'};
  left: 0;
  width: 100%;
  z-index: ${props => props.isVisible ? 9999 : -1};
  opacity: ${props => props.isVisible ? 1 : 0};
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
  transform: ${props => props.isVisible ? 'translateY(0px) scale(1)' : 'translateY(20px) scale(0)'};
  pointer-events: none;
  max-height: ${props => props.dynamicHeight || 'auto'};
  /* overflow: hidden; */
  transition: scale 0.05s ease, opacity 0.15s ease, transform 0.2s ease, z-index 0s linear 0.2s;

  @media (max-width: 1024px) {
    display: none !important;
  }
`;

const DataCard = styled.a.withConfig({
  shouldForwardProp: (prop) => prop !== 'isContentVisible',
})`
  background-color: white;
  border-radius: 8px;
  margin: 0;
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  border: 1px solid ${colors.lightGray};
  flex-direction: row;
  gap: 16px;
  align-items: flex-start;
  opacity: ${props => props.isContentVisible ? 1 : 0};
  transform: translateY(${props => props.isContentVisible ? '0px' : '10px'});
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: auto;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    border-color: ${colors.primaryGreen};
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

const PDFTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.primaryGreen};
  margin: 0;
  line-height: 1.3;
`;

const LearnMoreButton = styled.span`
  display: inline-block;
  width: fit-content;
  background-color: ${colors.mutedGreen};
  color: ${colors.primaryGreen};
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  transition: all 0.3s ease;
  
  a:hover & {
    background-color: ${colors.primaryGreen};
    color: white;
  }
`;

const CardThumbnail = styled.img`
  width: 120px;
  height: auto;
  border-radius: 6px;
  object-fit: contain;
  border: 1px solid ${colors.lightGray};
  transition: all 0.3s ease;
  flex-shrink: 0;
  
  /* ${DataCard}:hover & {
    transform: scale(1.05);
  } */
`;

const DynamicData = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPositioned, setIsPositioned] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);
  const [dynamicHeight, setDynamicHeight] = useState('auto');
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [topPosition, setTopPosition] = useState('120px');
  const [isMobile, setIsMobile] = useState(false);
  const dataCardRef = useRef(null);
  const containerRef = useRef(null);
  const isUpdatingRef = useRef(false);

  // Detect mobile/tablet screens and disable DynamicData
  useEffect(() => {
    const checkMobile = () => {
      const isMobileScreen = window.innerWidth <= 1024;
      setIsMobile(isMobileScreen);
      if (isMobileScreen) {
        setIsVisible(false);
        setIsContentVisible(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const calculateTopPosition = useCallback(() => {
    const navigationElement = document.querySelector('[data-navigation="true"]');
    const navigationBottom = navigationElement ? 
      navigationElement.getBoundingClientRect().bottom : 100;
    const gapFromNav = 20; // 20px gap between DynamicData and navigation
    return `${navigationBottom + gapFromNav}px`;
  }, []);

  const calculateDynamicHeight = useCallback(() => {
    // Calculate available space from navigation bottom to bottom margin
    const viewportHeight = window.innerHeight;
    const navigationElement = document.querySelector('[data-navigation="true"]');
    const navigationBottom = navigationElement ? 
      navigationElement.getBoundingClientRect().bottom : 100;
    const bottomMargin = 40; // Bottom margin from viewport bottom
    const gapFromNav = 20; // 20px gap between DynamicData and navigation
    const availableHeight = viewportHeight - navigationBottom - gapFromNav - bottomMargin;
    
    // Use the full available height from 20px below nav to bottom margin
    const minHeight = 150;
    const finalHeight = Math.max(minHeight, availableHeight);
    
    return `${finalHeight}px`;
  }, []);

  const updatePosition = useCallback(() => {
    const newTopPosition = calculateTopPosition();
    const newDynamicHeight = calculateDynamicHeight();
    
    if (containerRef.current) {
      // Animate position changes with GSAP
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

  // Helper function to check if story has a PDF with an image
  const hasPDFWithImage = useCallback((story) => {
    if (!story || !story.interactiveText) return false;
    return story.interactiveText.some(item => item.pdfLink && item.hoverImage);
  }, []);

  // Helper function to get the PDF data
  const getPDFData = useCallback((story) => {
    if (!story || !story.interactiveText) return null;
    const pdfItems = story.interactiveText.filter(item => item.pdfLink && item.hoverImage);
    if (pdfItems.length === 0) return null;
    
    // Get the last PDF item (most recently added)
    const pdfItem = pdfItems[pdfItems.length - 1];
    
    return {
      title: pdfItem.dynamicDataTitle || pdfItem.highlightedText,
      link: pdfItem.pdfLink,
      hoverImage: pdfItem.hoverImage
    };
  }, []);

  // Helper function to check if navigation is visible
  const isNavigationVisible = useCallback(() => {
    const navigationWrapper = document.querySelector('[data-navigation="true"]');
    if (!navigationWrapper) return false;
    const computedStyle = window.getComputedStyle(navigationWrapper);
    return computedStyle.opacity !== '0' && computedStyle.zIndex !== '-1';
  }, []);

  useEffect(() => {
  const updateActiveStory = () => {
      // Prevent multiple simultaneous updates
      if (isUpdatingRef.current) return;
      
      // Don't show DynamicData on mobile/tablet
      if (isMobile) {
        setIsVisible(false);
        setIsContentVisible(false);
        return;
      }
      
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 600; 

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        
        if (scrollPosition >= sectionTop) {
          // Check if this is a story section
          const story = storiesData.stories.find(s => s.id === section.id);
          
            if (story && hasPDFWithImage(story)) {
              const navVisible = isNavigationVisible();
              
              // If we're switching to a different story, fade out content first
              if (currentStory && currentStory.id !== story.id) {
                isUpdatingRef.current = true;
                setIsContentVisible(false);
                // Wait for content to fade out, then update story and fade in
                setTimeout(() => {
                  setCurrentStory(story);
                  setIsPositioned(true);
                  updatePosition();
                  // Wait for container positioning, then fade in content
                  setTimeout(() => {
                    // Check if navigation is visible
                    if (navVisible) {
                      setIsVisible(true);
                      setTimeout(() => {
                        setIsContentVisible(true);
                        isUpdatingRef.current = false;
                      }, 50);
                    } else {
                      isUpdatingRef.current = false;
                    }
                  }, 200);
                }, 150);
              } else if (!currentStory) {
                // First time showing a story
                isUpdatingRef.current = true;
                setCurrentStory(story);
                setIsPositioned(true);
                updatePosition();
                setTimeout(() => {
                  // Check if navigation is visible
                  if (navVisible) {
                    setIsVisible(true);
                    setTimeout(() => {
                      setIsContentVisible(true);
                      isUpdatingRef.current = false;
                    }, 50);
                  } else {
                    isUpdatingRef.current = false;
                  }
                }, 200);
              } else if (currentStory.id === story.id) {
                // Same story - ensure it's visible if nav is visible
                if (navVisible && !isVisible) {
                  setIsPositioned(true);
                  setIsVisible(true);
                  setIsContentVisible(true);
                }
              }
            } else {
              isUpdatingRef.current = true;
              setIsContentVisible(false);
              setTimeout(() => {
                setIsVisible(false);
                setIsPositioned(false);
                setCurrentStory(null);
                isUpdatingRef.current = false;
              }, 150);
            }
          break;
        }
      }
    };

    const handleScroll = () => {
      // Always update active story first
      updateActiveStory();
      
      // Hide dynamic data if navigation is not visible
      if (!isNavigationVisible() && isVisible) {
        setIsContentVisible(false);
        setTimeout(() => {
          setIsVisible(false);
        }, 150);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [calculateDynamicHeight, currentStory, updatePosition, hasPDFWithImage, isNavigationVisible, isVisible, isMobile]);

  // Recalculate height and position on window resize
  useEffect(() => {
    const handleResize = () => {
      updatePosition();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updatePosition]);

  // Update position on mount
  useEffect(() => {
    updatePosition();
  }, [updatePosition]);

  // Watch for navigation changes using MutationObserver and transition events
  useEffect(() => {
    const navigationElement = document.querySelector('[data-navigation="true"]');
    if (!navigationElement) return;

    let timeoutId;
    const observer = new MutationObserver(() => {
      // Debounce the updates to prevent excessive calls
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        updatePosition();
      }, 50);
    });

    // Observe changes to the navigation element and its children
    observer.observe(navigationElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });

    // Also listen for transition events on the navigation dynamic element
    const navigationDynamic = navigationElement.querySelector('[data-navigation-dynamic]');
    
    if (navigationDynamic) {
      const handleTransitionEnd = () => {
        updatePosition();
      };
      
      navigationDynamic.addEventListener('transitionend', handleTransitionEnd);
      
      return () => {
        observer.disconnect();
        navigationDynamic.removeEventListener('transitionend', handleTransitionEnd);
      };
    }

    return () => {
      observer.disconnect();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [updatePosition]);

  // Listen for custom navigation state change events
  useEffect(() => {
    let timeoutId;
    
    const handleNavigationStateChange = () => {
      // Clear any pending updates
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Update immediately
      updatePosition();
      
      // Update again after navigation transition completes
      timeoutId = setTimeout(() => {
        updatePosition();
      }, 350); // Slightly longer than the navigation transition (0.3s)
    };

    window.addEventListener('navigationStateChange', handleNavigationStateChange);
    
    return () => {
      window.removeEventListener('navigationStateChange', handleNavigationStateChange);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [updatePosition]);

  if (!currentStory || !hasPDFWithImage(currentStory)) {
    return null;
  }

  const pdfData = getPDFData(currentStory);

  if (!pdfData) {
    return null;
  }

  return (
    <>
      <DynamicDataContainer 
        ref={containerRef}
        isVisible={isVisible && isPositioned} 
        dynamicHeight={dynamicHeight} 
        topPosition={topPosition}
        data-dynamic-data="true"
      >
        <GridContainer>
          <GridRow>
            <GridColumn cols={3}>
              <DataCard 
                ref={dataCardRef} 
                isContentVisible={isContentVisible}
                href={pdfData.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {pdfData.hoverImage && (
                  <CardThumbnail 
                    src={pdfData.hoverImage} 
                    alt={pdfData.title}
                  />
                )}
                <CardContent>
                  <PDFTitle>{pdfData.title}</PDFTitle>
                  <LearnMoreButton>
                    Learn More
                  </LearnMoreButton>
                </CardContent>
              </DataCard>
            </GridColumn>
            <GridColumn cols={9} />
          </GridRow>
        </GridContainer>
      </DynamicDataContainer>
    </>
  );
};

export default DynamicData;

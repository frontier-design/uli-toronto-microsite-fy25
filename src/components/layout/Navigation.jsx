import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { colors, GridContainer, GridRow, GridColumn } from '../../styles';
import { ULILogo } from '../ui';
import navigationData from '../../data/navigation.json';
import storiesData from '../../data/stories.json';

const NavigationContainer = styled.div`
  position: fixed;
  top: 40px;
  width: 100%;
  z-index: ${props => props.$isPullQuoteVisible ? -1 : 10000};
  pointer-events: none;
  transition: z-index 0s linear ${props => props.$isPullQuoteVisible ? '0.4s' : '0s'};

  @media (max-width: 1024px) {
    top: 20px;
  }

  @media (max-width: 768px) {
    top: 16px;
    z-index: 10000;
    pointer-events: auto;
  }
`;

const NavigationWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$isPullQuoteVisible', '$isInMessages', '$isInAtAGlance', '$isInClosingReflections', '$isInMembership'].includes(prop),
})`
  border-radius: 8px;
  background-color: ${props => {
    if (props.$isInMessages) return colors.navyBlue;
    if (props.$isInAtAGlance) return colors.rubyRed;
    if (props.$isInClosingReflections) return colors.white;
    if (props.$isInMembership) return colors.white;
    return colors.mutedGreen;
  }};
  opacity: ${props => props.$isPullQuoteVisible ? 0 : 1};
  transform: ${props => props.$isPullQuoteVisible ? 'scale(0)' : 'scale(1)'};
  overflow: hidden;
  pointer-events: auto;
  position: relative;
  z-index: ${props => props.$isPullQuoteVisible ? -1 : 1};
  
  @media (max-width: 768px) {
    opacity: 1;
    transform: scale(1);
    z-index: 1;
  }
  transition: 
    background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
    opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    z-index 0s linear ${props => props.$isPullQuoteVisible ? '0.4s' : '0s'};
`;

const NavigationStatic = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  
  @media (max-width: 768px) {
    padding: 3px 8px;
  }
`;

const NavigationDynamic = styled.div`
  max-height: ${props => props.$isOpen ? props.$dynamicHeight : '0px'};
  opacity: ${props => props.$isOpen ? 1 : 0};
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: ${props => props.$isOpen ? '12px 20px' : '0px'};
`;

const NavigationMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavigationItem = styled.li`
  margin-bottom: 4px;
`;

const NavigationLink = styled.a.withConfig({
  shouldForwardProp: (prop) => !['$isInMessages', '$isInAtAGlance', '$isInClosingReflections', '$isInMembership'].includes(prop),
})`
  color: ${props => {
    if (props.$isActive) {
      if (props.$isInMessages) return colors.navyBlue;
      if (props.$isInAtAGlance) return colors.rubyRed;
      if (props.$isInClosingReflections) return colors.primaryGreen;
      if (props.$isInMembership) return colors.primaryGreen;
      return colors.white;
    }
    if (props.$isInMessages) return colors.lightBlue;
    if (props.$isInAtAGlance) return colors.white;
    if (props.$isInClosingReflections) return colors.primaryGreen;
    if (props.$isInMembership) return colors.primaryGreen;
    return colors.primaryGreen;
  }};
  background-color: ${props => {
    if (props.$isActive) {
      if (props.$isInMessages) return colors.lightBlue;
      if (props.$isInAtAGlance) return colors.white;
      if (props.$isInClosingReflections) return colors.mutedGreen;
      if (props.$isInMembership) return colors.mutedGreen;
      return colors.primaryGreen;
    }
    return 'transparent';
  }};
  text-decoration: none;
  font-weight: 400;
  font-size: 15px;
  display: block;
  padding: 6px 12px;
  border-radius: 4px;
  transition: all 0.2s ease;
  width: fit-content !important;
  
  &:hover {
    background-color: ${props => {
      if (props.$isActive) {
        if (props.$isInMessages) return colors.lightBlue;
        if (props.$isInAtAGlance) return colors.white;
        if (props.$isInClosingReflections) return colors.mutedGreen;
        if (props.$isInMembership) return colors.mutedGreen;
        return colors.primaryGreen;
      }
      if (props.$isInMessages) return 'rgba(212, 219, 235, 0.2)';
      if (props.$isInAtAGlance) return 'rgba(255, 255, 255, 0.2)';
      if (props.$isInClosingReflections) return colors.mutedGreen;
      if (props.$isInMembership) return colors.mutedGreen;
      return 'rgba(1, 112, 59, 0.1)';
    }};
  }
`;

const SubMenu = styled.ul`
  list-style: none;
  margin: ${props => props.$isExpanded ? '4px 0 0 0' : '0'};
  padding: 0 0 0 20px;
  max-height: ${props => props.$isExpanded ? '200px' : '0px'};
  opacity: ${props => props.$isExpanded ? 1 : 0};
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const SubMenuItem = styled.li`
  margin-bottom: 2px;
  width: fit-content !important;
`;

const SubMenuLink = styled.a.withConfig({
  shouldForwardProp: (prop) => !['$isInMessages', '$isInAtAGlance', '$isInClosingReflections', '$isInMembership'].includes(prop),
})`
  color: ${props => {
    if (props.$isActive) {
      if (props.$isInMessages) return colors.navyBlue;
      if (props.$isInAtAGlance) return colors.rubyRed;
      if (props.$isInClosingReflections) return colors.primaryGreen;
      if (props.$isInMembership) return colors.primaryGreen;
      return colors.white;
    }
    if (props.$isInMessages) return colors.lightBlue;
    if (props.$isInAtAGlance) return colors.white;
    if (props.$isInClosingReflections) return colors.primaryGreen;
    if (props.$isInMembership) return colors.primaryGreen;
    return colors.primaryGreen;
  }};
  background-color: ${props => {
    if (props.$isActive) {
      if (props.$isInMessages) return colors.lightBlue;
      if (props.$isInAtAGlance) return colors.white;
      if (props.$isInClosingReflections) return colors.mutedGreen;
      if (props.$isInMembership) return colors.mutedGreen;
      return colors.primaryGreen;
    }
    return 'transparent';
  }};
  text-decoration: none;
  font-size: 13px;
  display: block;
  padding: 6px 12px;
  border-radius: 4px;
  opacity: ${props => props.$isActive ? 1 : 0.8};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => {
      if (props.$isActive) {
        if (props.$isInMessages) return colors.lightBlue;
        if (props.$isInAtAGlance) return colors.white;
        if (props.$isInClosingReflections) return colors.mutedGreen;
        if (props.$isInMembership) return colors.mutedGreen;
        return colors.primaryGreen;
      }
      if (props.$isInMessages) return 'rgba(212, 219, 235, 0.2)';
      if (props.$isInAtAGlance) return 'rgba(255, 255, 255, 0.2)';
      if (props.$isInClosingReflections) return colors.mutedGreen;
      if (props.$isInMembership) return colors.mutedGreen;
      return 'rgba(1, 112, 59, 0.1)';
    }};
    opacity: 1;
  }
`;

const LogoContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$isInMessages', '$isInAtAGlance', '$isInClosingReflections', '$isInMembership'].includes(prop),
})`
  width: 35px;
  height: 35px;
  transition: mix-blend-mode 0.4s ease;
  
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

const ToggleButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['$isInClosingReflections', '$isInMembership'].includes(prop),
})`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

const IconContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$isOpen', '$isInMessages', '$isInAtAGlance', '$isInClosingReflections', '$isInMembership'].includes(prop),
})`
  width: 36px;
  height: 36px;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 4px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => {
    if (props.$isInMessages) return colors.lightBlue;
    if (props.$isInAtAGlance) return colors.white;
    if (props.$isInClosingReflections) return colors.primaryGreen;
    if (props.$isInMembership) return colors.primaryGreen;
    return colors.primaryGreen;
  }};

  &:hover {
    background-color: ${props => {
      if (props.$isInMessages) return colors.lightBlue + '20';
      if (props.$isInAtAGlance) return 'rgba(255, 255, 255, 0.2)';
      if (props.$isInClosingReflections) return colors.mutedGreen;
      if (props.$isInMembership) return colors.mutedGreen;
      return colors.primaryGreen + '20';
    }};

    &::before,
    &::after {
      background-color: ${props => {
        if (props.$isInMessages) return colors.lightBlue;
        if (props.$isInAtAGlance) return colors.white;
        if (props.$isInClosingReflections) return colors.primaryGreen;
        if (props.$isInMembership) return colors.primaryGreen;
        return colors.primaryGreen;
      }};
    }
  }
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: ${props => {
      if (props.$isInMessages) return colors.lightBlue;
      if (props.$isInAtAGlance) return colors.white;
      if (props.$isInClosingReflections) return colors.primaryGreen;
      if (props.$isInMembership) return colors.primaryGreen;
      return colors.primaryGreen;
    }};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
  }
  
  &::before {
    width: 2px;
    height: 20px;
    left: 50%;
    top: 50%;
    transform: ${props => props.$isOpen ? 'translate(-50%, -50%) rotate(-90deg)' : 'translate(-50%, -50%)'};
  }
  
  &::after {
    width: 20px;
    height: 2px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Navigation = () => {
  const [isCompact, setIsCompact] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userManuallyClosed, setUserManuallyClosed] = useState(false);
  const [expandedItems, setExpandedItems] = useState(new Set());
  const navigationMenuRef = useRef(null);
  const [activeSection, setActiveSection] = useState('');
  const [dynamicHeight, setDynamicHeight] = useState('80vh');
  const [isPullQuoteVisible, setIsPullQuoteVisible] = useState(false);
  const [isInMessagesSection, setIsInMessagesSection] = useState(false);
  const [isInAtAGlanceSection, setIsInAtAGlanceSection] = useState(false);
  const [isInClosingReflectionsSection, setIsInClosingReflectionsSection] = useState(false);
  const [isInMembershipSection, setIsInMembershipSection] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile/tablet screens
  useEffect(() => {
    const checkMobile = () => {
      const isMobileScreen = window.innerWidth <= 1024;
      setIsMobile(isMobileScreen);
      if (isMobileScreen) {
        setIsCompact(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Dynamically generate navigation data with Stories sub-items
  const enhancedNavigationData = useMemo(() => {
    return {
      navigationItems: navigationData.navigationItems.map(item => {
        if (item.id === 'stories') {
          return {
            ...item,
            subItems: storiesData.stories.map(story => ({
              id: story.id,
              label: story.title.replace(/<br\s*\/?\s*>/gi, ' ')
            }))
          };
        }
        return item;
      })
    };
  }, []);

  const calculateDynamicHeight = useCallback(() => {
    if (!navigationMenuRef.current) return '80vh';
    
    const menuHeight = navigationMenuRef.current.scrollHeight;
    const maxViewportHeight = window.innerHeight * 0.8; // 80vh in pixels
    
    // If content fits within 80vh, use content height
    if (menuHeight <= maxViewportHeight) {
      return `${menuHeight + 40}px`; // Add padding
    }
    
    // Otherwise, use 80vh as max
    return '80vh';
  }, []);

  const toggleSubMenu = (itemId) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      
      // Recalculate height after state update
      setTimeout(() => {
        setDynamicHeight(calculateDynamicHeight());
      }, 50);
      
      return newSet;
    });
  };

  const checkNavVisibility = useCallback(() => {
    const hideNavElements = document.querySelectorAll('[data-hide-nav]');
    const viewportHeight = window.innerHeight;
    let shouldHide = false;
    
    hideNavElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const hideMode = element.getAttribute('data-hide-nav');
      
      // Calculate visibility percentage
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(viewportHeight, rect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const visibilityPercentage = rect.height > 0 ? visibleHeight / rect.height : 0;
      
      // Hide based on mode
      if (hideMode === 'immediate') {
        // Hide as soon as any part is visible
        if (visibilityPercentage > 0) {
          shouldHide = true;
        }
      } else {
        // Consistent 20% threshold for all elements with data-hide-nav="true"
        const threshold = 0.2;
        
        if (visibilityPercentage > threshold) {
          shouldHide = true;
        }
      }
    });
    
    setIsPullQuoteVisible(shouldHide);
    
    // Also fade out DynamicData when full-width elements are visible
    const dynamicDataContainer = document.querySelector('[data-dynamic-data="true"]');
    if (dynamicDataContainer) {
      dynamicDataContainer.style.opacity = shouldHide ? '0' : '1';
      dynamicDataContainer.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    return shouldHide;
  }, []);

  const updateActiveSection = useCallback(() => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 150; // Offset for better UX

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionTop = section.offsetTop;
      
      if (scrollPosition >= sectionTop) {
        setActiveSection(section.id || '');
        
        // Auto-expand the relevant parent section
        const newExpandedItems = new Set();
        enhancedNavigationData.navigationItems.forEach(item => {
          // Check if this is the active main section or if any of its sub-items are active
          if (section.id === item.id || (item.subItems && item.subItems.some(subItem => subItem.id === section.id))) {
            newExpandedItems.add(item.id);
            
            // Auto-scroll to the active sub-item
            if (section.id !== item.id && navigationMenuRef.current) {
              setTimeout(() => {
                const activeSubItem = navigationMenuRef.current.querySelector(`a[href="#${section.id}"]`);
                if (activeSubItem) {
                  activeSubItem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                  });
                }
              }, 100); // Small delay to ensure menu is expanded
            }
          }
        });
        setExpandedItems(newExpandedItems);
        
        // Recalculate height after auto-expanding
        setTimeout(() => {
          setDynamicHeight(calculateDynamicHeight());
        }, 1);
        
        break;
      }
    }
    
    // Check full-width elements visibility
    checkNavVisibility();
  }, [navigationMenuRef, calculateDynamicHeight, checkNavVisibility, enhancedNavigationData.navigationItems]);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // First check if any section dividers or full-width elements should hide the nav
          // This takes precedence over other navigation logic
          const sectionDividerVisible = checkNavVisibility();
          
          const narrativeSection = document.querySelector('#narrative');
          const messagesSection = document.querySelector('#messages');
          const atAGlanceSection = document.querySelector('#at-a-glance');
          const closingReflectionsSection = document.querySelector('[data-closing-reflections="true"]');
          const membershipSection = document.querySelector('#membership');
          const mockSection = document.querySelector('section:not(#narrative)');
          
          const scrollPosition = window.scrollY;
          const viewportHeight = window.innerHeight;
          let shouldExpand = false;
          let isInNarrative = false;
          let isInMessages = false;
          let isInAtAGlance = false;
          let isInClosingReflections = false;
          let isInMembership = false;
          
          if (narrativeSection) {
            const narrativeTop = narrativeSection.offsetTop;
            const narrativeBottom = narrativeTop + narrativeSection.offsetHeight;
            
            // Check if we're in the narrative section
            if (scrollPosition >= narrativeTop - 100 && scrollPosition <= narrativeBottom + 100) {
              isInNarrative = true;
              // Stay collapsed in the narrative section (don't auto-expand)
              shouldExpand = false;
            }
          }
          
          // Only apply messages section logic if no section divider is visible
          if (!sectionDividerVisible && messagesSection) {
            const rect = messagesSection.getBoundingClientRect();
            const elementVisibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
            
            // If any part of messages section is visible in viewport
            if (elementVisibleHeight > 0 && rect.bottom > 0 && rect.top < viewportHeight) {
              isInMessages = true;
            }
          }
          
          // Only apply at-a-glance section logic if no section divider is visible
          if (!sectionDividerVisible && atAGlanceSection) {
            const rect = atAGlanceSection.getBoundingClientRect();
            const elementVisibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
            
            // If any part of at-a-glance section is visible in viewport
            if (elementVisibleHeight > 0 && rect.bottom > 0 && rect.top < viewportHeight) {
              isInAtAGlance = true;
            }
          }
          
          // Only apply closing reflections section logic if no section divider is visible
          if (!sectionDividerVisible && closingReflectionsSection) {
            const rect = closingReflectionsSection.getBoundingClientRect();
            const elementVisibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
            
            // If any part of closing reflections section is visible in viewport
            if (elementVisibleHeight > 0 && rect.bottom > 0 && rect.top < viewportHeight) {
              isInClosingReflections = true;
            }
          }
          
          // Only apply membership section logic if no section divider is visible
          if (!sectionDividerVisible && membershipSection) {
            const rect = membershipSection.getBoundingClientRect();
            const elementVisibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
            
            // If any part of membership section is visible in viewport
            if (elementVisibleHeight > 0 && rect.bottom > 0 && rect.top < viewportHeight) {
              isInMembership = true;
            }
          }
          
          // If in messages section, keep compact and auto-expand (but only if no section divider is visible)
          if (isInMessages) {
            setIsCompact(true);
            setIsInMessagesSection(true);
            setIsInAtAGlanceSection(false);
            // Auto-expand the navbar in messages section (but not on mobile/tablet)
            if (!userManuallyClosed && !isMobile) {
              setIsOpen(true);
              // Dispatch event when navigation auto-opens
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent('navigationStateChange'));
              }, 10);
            }
          } else if (isInAtAGlance) {
            setIsCompact(true);
            setIsInMessagesSection(false);
            setIsInAtAGlanceSection(true);
            setIsInClosingReflectionsSection(false);
            // Auto-expand the navbar in at-a-glance section (but not on mobile/tablet)
            if (!userManuallyClosed && !isMobile) {
              setIsOpen(true);
              // Dispatch event when navigation auto-opens
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent('navigationStateChange'));
              }, 10);
            }
          } else if (isInClosingReflections) {
            setIsCompact(true);
            setIsInMessagesSection(false);
            setIsInAtAGlanceSection(false);
            setIsInClosingReflectionsSection(true);
            setIsInMembershipSection(false);
            // Auto-expand the navbar in closing reflections section (but not on mobile/tablet)
            if (!userManuallyClosed && !isMobile) {
              setIsOpen(true);
              // Dispatch event when navigation auto-opens
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent('navigationStateChange'));
              }, 10);
            }
          } else if (isInMembership) {
            setIsCompact(true);
            setIsInMessagesSection(false);
            setIsInAtAGlanceSection(false);
            setIsInClosingReflectionsSection(false);
            setIsInMembershipSection(true);
            // Auto-expand the navbar in membership section (but not on mobile/tablet)
            if (!userManuallyClosed && !isMobile) {
              setIsOpen(true);
              // Dispatch event when navigation auto-opens
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent('navigationStateChange'));
              }, 10);
            }
          } else {
            setIsInMessagesSection(false);
            setIsInAtAGlanceSection(false);
            setIsInClosingReflectionsSection(false);
            setIsInMembershipSection(false);
            
            // Only auto-expand if we're not in the narrative section and past the first other section
            if (!isInNarrative && mockSection) {
              const mockSectionTop = mockSection.offsetTop;
              
              if (scrollPosition >= mockSectionTop - 100) {
                shouldExpand = true;
              }
            }
          }
          
          // Only apply general navigation logic if no section divider is visible
          if (!sectionDividerVisible) {
            if (shouldExpand && !isInMessages && !isInAtAGlance && !isInClosingReflections && !isInMembership) {
              setIsCompact(true);
              // Don't auto-expand on mobile/tablet
              if (!userManuallyClosed && !isMobile) {
                setIsOpen(true);
                // Dispatch event when navigation auto-opens
                setTimeout(() => {
                  window.dispatchEvent(new CustomEvent('navigationStateChange'));
                }, 10);
              }
            } else if (!isInMessages && !isInAtAGlance && !isInClosingReflections && !isInMembership && !shouldExpand) {
              if (!isMobile) {
                setIsCompact(false);
              }
              setIsOpen(false); 
              setUserManuallyClosed(false);
              // Dispatch event when navigation auto-closes
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent('navigationStateChange'));
              }, 10);
            }
          }
          
          // Update active section on scroll
          updateActiveSection();
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [userManuallyClosed, updateActiveSection, checkNavVisibility, isMobile]);

  // Automatically recalculate navigation height when menu content changes
  useEffect(() => {
    if (!navigationMenuRef.current) return;
    
    let timeoutId;
    
    const resizeObserver = new ResizeObserver(() => {
      // Debounce the height calculation to avoid excessive re-renders
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setDynamicHeight(calculateDynamicHeight());
      }, 100);
    });
    
    resizeObserver.observe(navigationMenuRef.current);
    
    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [calculateDynamicHeight]);

  return (
    <NavigationContainer data-navigation="true" $isPullQuoteVisible={isPullQuoteVisible}>
      <GridContainer>
        <GridRow>
          <GridColumn cols={isMobile ? 12 : (isCompact ? 3 : 3)}>
            <NavigationWrapper $isPullQuoteVisible={isPullQuoteVisible} $isInMessages={isInMessagesSection} $isInAtAGlance={isInAtAGlanceSection} $isInClosingReflections={isInClosingReflectionsSection} $isInMembership={isInMembershipSection}>
              <NavigationStatic>
                <a href="#landing" style={{ textDecoration: 'none' }}>
                  <LogoContainer $isInMessages={isInMessagesSection} $isInAtAGlance={isInAtAGlanceSection} $isInClosingReflections={isInClosingReflectionsSection} $isInMembership={isInMembershipSection}>
                    <ULILogo 
                      color={
                        isInMessagesSection ? colors.lightBlue :
                        isInAtAGlanceSection ? colors.white :
                        colors.primaryGreen
                      } 
                      height="100%" 
                    />
                  </LogoContainer>
                </a>
                <ToggleButton $isInClosingReflections={isInClosingReflectionsSection} $isInMembership={isInMembershipSection} onClick={() => {
                  const newIsOpen = !isOpen;
                  setIsOpen(newIsOpen);
                  
                  // If user is closing the nav while it's compact (scrolled), mark as manually closed
                  if (!newIsOpen && isCompact) {
                    setUserManuallyClosed(true);
                  }
                  
                  // Dispatch custom event to notify other components of navigation state change
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('navigationStateChange'));
                  }, 10);
                }}>
                  <IconContainer $isOpen={isOpen} $isInMessages={isInMessagesSection} $isInAtAGlance={isInAtAGlanceSection} $isInClosingReflections={isInClosingReflectionsSection} $isInMembership={isInMembershipSection} />
                </ToggleButton>
              </NavigationStatic>
              <NavigationDynamic $isOpen={isOpen} $dynamicHeight={dynamicHeight} data-navigation-dynamic="true">
                <NavigationMenu ref={navigationMenuRef}>
                  {enhancedNavigationData.navigationItems.map((item) => {
                    const isMainItemActive = activeSection === item.id;
                    const hasActiveSubItem = item.subItems && item.subItems.some(subItem => activeSection === subItem.id);
                    
                    return (
                      <NavigationItem key={item.id}>
                        <NavigationLink 
                          href={`#${item.id}`}
                          $isActive={isMainItemActive || hasActiveSubItem}
                          $isInMessages={isInMessagesSection}
                          $isInAtAGlance={isInAtAGlanceSection}
                          $isInClosingReflections={isInClosingReflectionsSection}
                          $isInMembership={isInMembershipSection}
                          onClick={(e) => {
                            if (item.subItems && item.subItems.length > 0) {
                              e.preventDefault();
                              toggleSubMenu(item.id);
                            }
                          }}
                        >
                          {item.label}
                        </NavigationLink>
                        {item.subItems && item.subItems.length > 0 && (
                          <SubMenu $isExpanded={expandedItems.has(item.id)}>
                            {item.subItems.map((subItem) => (
                              <SubMenuItem key={subItem.id}>
                                <SubMenuLink 
                                  href={`#${subItem.id}`}
                                  $isActive={activeSection === subItem.id}
                                  $isInMessages={isInMessagesSection}
                                  $isInAtAGlance={isInAtAGlanceSection}
                                  $isInClosingReflections={isInClosingReflectionsSection}
                                  $isInMembership={isInMembershipSection}
                                >
                                  {subItem.label}
                                </SubMenuLink>
                              </SubMenuItem>
                            ))}
                          </SubMenu>
                        )}
                      </NavigationItem>
                    );
                  })}
                </NavigationMenu>
              </NavigationDynamic>
            </NavigationWrapper>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </NavigationContainer>
  );
};

export default Navigation;
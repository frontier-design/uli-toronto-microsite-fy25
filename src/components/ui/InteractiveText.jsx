import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles';
import { gsap } from '../../hooks/useGSAP';

const HighlightedText = styled.span`
  background-color: ${colors.mutedGreen};
  color: ${colors.primaryGreen};
  padding: 2px 4px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline;
  z-index: 10;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;

  &:hover {
    background-color: ${colors.primaryGreen};
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const HighlightedTextNonClickable = styled.span`
  color: ${colors.primaryGreen};
  font-style: italic;
  cursor: default;
  position: relative;
  display: inline;
  z-index: 10;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
`;

const HoverImage = styled.span`
  position: fixed;
  z-index: 10;
  max-width: 300px;
  opacity: 0;
  visibility: hidden;
  transform: scale(0);
  pointer-events: none;
  left: 0px;
  top: 0px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  display: inline-block;

  img {
    width: auto;
    height: auto;
    max-width: 100%;
    display: block;
    border-radius: 5px;
  }
`;

const InteractiveText = ({ 
  text, 
  highlightedText, 
  hoverImage, 
  pdfLink,
  scrollToVideo,
  videoRef,
  className 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const hoverImageRef = useRef(null);

  const handleClick = () => {
    if (pdfLink) {
      window.open(pdfLink, '_blank', 'noopener,noreferrer');
    } else if (scrollToVideo && videoRef && videoRef.current) {
      videoRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  };

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    
    // Only show hover image if it exists
    if (hoverImage && hoverImageRef.current) {
      // Calculate positioning based on image dimensions
      const imageWidth = imageDimensions.width || 300; // fallback to 300px
      const imageHeight = imageDimensions.height || 200; // fallback to 200px
      
      gsap.set(hoverImageRef.current, {
        left: e.clientX,
        top: e.clientY,
        visibility: 'visible',
        transform: `translate(-${imageWidth}px, -${imageHeight}px) scale(0)`
      });
      
      gsap.to(hoverImageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    
    // Only animate out if hover image exists
    if (hoverImage && hoverImageRef.current) {
      gsap.to(hoverImageRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(hoverImageRef.current, { visibility: 'hidden' });
        }
      });
    }
  };

  // Load image dimensions when component mounts
  useEffect(() => {
    if (hoverImage) {
      const img = new Image();
      img.onload = () => {
        // Calculate rendered dimensions based on max-width constraint of 300px
        const maxWidth = 300;
        const aspectRatio = img.height / img.width;
        const renderedWidth = Math.min(img.width, maxWidth);
        const renderedHeight = renderedWidth * aspectRatio;
        
        setImageDimensions({ width: renderedWidth, height: renderedHeight });
      };
      img.src = hoverImage;
    }
  }, [hoverImage]);

  // GSAP animation for cursor following with easing
  useEffect(() => {
    if (isHovered && hoverImage && hoverImageRef.current) {
      const handleGlobalMouseMove = (e) => {
        const imageWidth = imageDimensions.width || 300;
        const imageHeight = imageDimensions.height || 200;
        
        gsap.to(hoverImageRef.current, {
          left: e.clientX,
          top: e.clientY,
          transform: `translate(-${imageWidth}px, -${imageHeight}px) scale(1)`,
          duration: 0.2,
          ease: "power2.out"
        });
      };
      
      document.addEventListener('mousemove', handleGlobalMouseMove);
      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
      };
    }
  }, [isHovered, hoverImage, imageDimensions]);

  // Split text around the highlighted portion
  const parts = text.split(highlightedText);
  
  if (parts.length !== 2) {
    // If highlighted text not found, return original text
    return <span className={className}>{text}</span>;
  }

        const HighlightedComponent = (pdfLink || scrollToVideo) ? HighlightedText : HighlightedTextNonClickable;

        return (
          <>
            <span className={className}>
              {parts[0]}
              <HighlightedComponent
                onClick={(pdfLink || scrollToVideo) ? handleClick : undefined}
                onMouseEnter={hoverImage ? handleMouseEnter : undefined}
                onMouseLeave={hoverImage ? handleMouseLeave : undefined}
              >
                {highlightedText}
              </HighlightedComponent>
              {parts[1]}
            </span>
      {hoverImage && (
        <HoverImage ref={hoverImageRef}>
          <img src={hoverImage} alt={highlightedText} />
        </HoverImage>
      )}
    </>
  );
};

export default InteractiveText;

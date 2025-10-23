import React from 'react';
import styled from 'styled-components';
import { colors, GridContainer, GridRow, GridColumn } from '../../../styles';
import storiesData from '../../../data/stories.json';
import PullQuote from './PullQuote';
import StoryImage from './StoryImage';
import FullWidthImage from '../media/FullWidthImage';
import VideoEmbed from '../media/VideoEmbed';
import VideoGallery from '../media/VideoGallery';
import ParallaxImages from '../media/ParallaxImages';
import InteractiveText from '../../ui/InteractiveText';

const StorySection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 60px 0 0 0;
  margin-bottom: ${props => props.$isLast ? '80px' : '0'};

  @media (max-width: 1024px) {
    padding: 30px 0 0 0;
    margin-bottom: ${props => props.$isLast ? '40px' : '0'};
  }

  @media (max-width: 768px) {
    padding: 20px 0 0 0;
    margin-bottom: ${props => props.$isLast ? '30px' : '0'};
  }

  @media (max-width: 480px) {
    padding: 16px 0 0 0;
    margin-bottom: ${props => props.$isLast ? '24px' : '0'};
  }
`;

const StoryTitle = styled.h1`
  max-width: 18ch;
  color: ${colors.primaryGreen};
  margin-bottom: 60px;
  position: relative;
  /* text-transform: uppercase; */

  font-size: 85px;
  line-height: 1.1;
  letter-spacing: -0.03em;
  font-family: 'Big Shoulders', sans-serif;
  font-weight: 800;

  @media (min-width: 1600px) {
    font-size: 100px;
  }

  @media (max-width: 1024px) {
    font-size: 64px;
    margin-bottom: 50px;
  }

  @media (max-width: 768px) {
    font-size: 52px;
    margin-bottom: 40px;
    margin-top: 30px;
    max-width: none;
  }

  @media (max-width: 480px) {
    font-size: 42px;
    margin-bottom: 32px;
    margin-top: 24px;
  }

  /* &::after {
    content: '';
    display: block;
    width: 36px;
    height: 4px;
    background-color: ${colors.primaryGreen};
    margin-top: 10px;
  } */
`;

const StorySubtitle = styled.h3`
  font-size: 14px;
  color: ${colors.primaryGreen};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 20px 0;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const StoryContent = styled.p`
  font-size: 16px;
  line-height: 1.5;
  max-width: 100%;
  margin-bottom: 50px;
  hyphens: auto;
  orphans: 3;
  widows: 3;
  
  /* Better text wrapping to prevent single letter orphans */
  word-spacing: 0.05em;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;

  @media (max-width: 1024px) {
    font-size: 15px;
    margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 32px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 24px;
  }
`;

const StoryDivider = styled.hr`
  border: none;
  height: 1px;
  background: ${colors.lightGray};
  margin: 80px auto;
  width: 100%;

  @media (max-width: 1024px) {
    margin: 60px auto;
  }

  @media (max-width: 768px) {
    margin: 40px auto;
  }

  @media (max-width: 480px) {
    margin: 30px auto;
  }
`;


const Stories = ({ storyId, sectionId, isLast = false }) => {
  const story = storiesData.stories.find(s => s.id === storyId);
  const videoRef = React.useRef(null);
  const videoGalleryRef = React.useRef(null);

  // Function to render content with interactive text
  const renderContent = (content, interactiveTexts = []) => {
    if (!interactiveTexts || interactiveTexts.length === 0) {
      return content;
    }

    // Create a map of all interactive texts with their positions
    const interactiveMap = interactiveTexts
      .map(({ highlightedText, hoverImage, pdfLink, scrollToVideo }) => ({
        text: highlightedText,
        hoverImage,
        pdfLink,
        scrollToVideo,
        index: content.indexOf(highlightedText)
      }))
      .filter(item => item.index !== -1)
      .sort((a, b) => a.index - b.index);

    if (interactiveMap.length === 0) {
      return content;
    }

    // Build the content with all interactive texts
    let result = [];
    let lastIndex = 0;

    interactiveMap.forEach(({ text, hoverImage, pdfLink, scrollToVideo, index }, i) => {
      // Add text before this interactive element
      if (index > lastIndex) {
        result.push(content.substring(lastIndex, index));
      }

      // Determine which ref to use based on whether there's a video gallery or regular video embed
      const targetVideoRef = story?.videoGallery ? videoGalleryRef : videoRef;

      // Add the interactive text component
      result.push(
        <InteractiveText
          key={i}
          text={text}
          highlightedText={text}
          hoverImage={hoverImage}
          pdfLink={pdfLink}
          scrollToVideo={scrollToVideo}
          videoRef={scrollToVideo ? targetVideoRef : null}
        />
      );

      lastIndex = index + text.length;
    });

    // Add remaining text after the last interactive element
    if (lastIndex < content.length) {
      result.push(content.substring(lastIndex));
    }

    return <>{result}</>;
  };

  // Function to render images based on position
  const renderImages = (images = [], position) => {
    if (!images || images.length === 0) return null;
    
    const filteredImages = images.filter(img => img.position === position);
    if (filteredImages.length === 0) return null;
    
    // Check if this is a two-column layout
    const isTwoColumn = filteredImages.length > 1 && filteredImages[0].layout === 'two-column';
    
    if (isTwoColumn) {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {filteredImages.map((image, index) => (
            <StoryImage
              key={`${position}-${index}`}
              src={image.src}
              alt={image.alt}
              caption={image.caption}
            />
          ))}
        </div>
      );
    }
    
    return filteredImages.map((image, index) => (
      <StoryImage
        key={`${position}-${index}`}
        src={image.src}
        alt={image.alt}
        caption={image.caption}
      />
    ));
  };
  
  // Extract a meaningful quote from the story content
  const extractQuote = (content) => {
    if (!content) return null;
    
    // Split content into sentences
    const sentences = content.split(/[.!?]+/).filter(sentence => sentence.trim().length > 30);
    
    if (sentences.length === 0) return null;
    
    // Find the longest sentence for a more substantial quote
    let bestQuote = sentences[0].trim();
    let maxLength = 0;
    
    sentences.forEach(sentence => {
      const trimmed = sentence.trim();
      if (trimmed.length > maxLength && trimmed.length < 400) {
        maxLength = trimmed.length;
        bestQuote = trimmed;
      }
    });
    
    return bestQuote + '.';
  };
  
  const extractedQuote = extractQuote(story?.content);
  
  // Only show pull quotes for specific stories (examples)
  const storiesWithPullQuotes = ['critical-industry-insights', 'climate-resiliency', 'local-global-industry-tours', 'navigating-public-policy'];
  const shouldShowPullQuote = story && storiesWithPullQuotes.includes(story.id) && (story.pullQuote || extractedQuote);
  const pullQuoteText = story?.pullQuote || extractedQuote;
  const pullQuoteAuthor = story?.pullQuoteAuthor || 'ULI Toronto';
  
  // Only show full-width images for specific stories (examples)
  const storiesWithFullWidthImages = [];
  const shouldShowFullWidthImage = story && storiesWithFullWidthImages.includes(story.id);
  
  // Only show parallax images for specific stories
  const storiesWithParallaxImages = ['climate-resiliency'];
  const shouldShowParallaxImages = story && storiesWithParallaxImages.includes(story.id);
  
  // Only show video gallery for specific stories (examples)
  const storiesWithVideoGallery = ['housing-affordability'];
  const shouldShowVideoGallery = story && storiesWithVideoGallery.includes(story.id) && story.videoGallery;
  
  if (!story) {
    return (
      <StorySection id={sectionId} isLast={isLast}>
        <GridContainer>
          <GridRow>
            <GridColumn cols={4} />
            <GridColumn cols={8}>
              <StoryTitle>Story Not Found</StoryTitle>
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn cols={4} />
            <GridColumn cols={8}>
              <StoryImage>Image placeholder</StoryImage>
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn cols={4} />
            <GridColumn cols={2}>
              <StorySubtitle>Error</StorySubtitle>
            </GridColumn>
            <GridColumn cols={6}>
              <StoryContent>The requested story could not be found.</StoryContent>
            </GridColumn>
          </GridRow>
        </GridContainer>
      </StorySection>
    );
  }

  return (
    <StorySection id={sectionId} $isLast={isLast}>
      <GridContainer>
        <GridRow>
          <GridColumn cols={4} className="story-title-offset" />
          <GridColumn cols={8} className="story-title-content">
            <StoryTitle dangerouslySetInnerHTML={{ __html: story.title }} />
          </GridColumn>
        </GridRow>
        
        {/* Images positioned before content - full width */}
        <GridRow>
          <GridColumn cols={4} />
          <GridColumn cols={8}>
            {renderImages(story.images, 'before')}
          </GridColumn>
        </GridRow>
        
        <GridRow>
          <GridColumn cols={4} />
          <GridColumn cols={1}>
            <StorySubtitle>Overview</StorySubtitle>
          </GridColumn>
          <GridColumn cols={7}>
            <StoryContent>
              {renderContent(story.content, story.interactiveText)}
            </StoryContent>
          </GridColumn>
        </GridRow>
        
        {/* Images positioned after content - full width */}
        <GridRow>
          <GridColumn cols={4} />
          <GridColumn cols={8}>
            {renderImages(story.images, 'after')}
            
            {/* Video embed if available */}
            {story.videoEmbed && (
              <VideoEmbed 
                embedHtml={story.videoEmbed}
                buttonText={story.videoButtonText}
                buttonLink={story.videoButtonLink}
                videoRef={videoRef}
                videoTitle={story.videoTitle}
              />
            )}
          </GridColumn>
        </GridRow>
      </GridContainer>
      
      {/* Pull Quote spanning full width - only show for specific example stories */}
      {shouldShowPullQuote && (
        <PullQuote 
          quote={pullQuoteText}
          author={pullQuoteAuthor}
        />
      )}
      
      {/* Full Width Image spanning all 12 columns - only show for specific example stories */}
      {shouldShowFullWidthImage && (
        <FullWidthImage 
          imageUrl={story.fullWidthImage || "https://via.placeholder.com/1200x400/4A8B5A/FFFFFF?text=Full+Width+Image"}
        />
      )}
      
      {/* Parallax Images - only show for specific stories */}
      {shouldShowParallaxImages && (
        <ParallaxImages />
      )}
      
      {/* Video Gallery spanning full width - only show for specific example stories */}
      {shouldShowVideoGallery && (
        <div ref={videoGalleryRef}>
          <VideoGallery 
            videos={story.videoGallery.videos}
            title={story.videoGallery.title}
            description={story.videoGallery.description}
            buttonText={story.videoButtonText}
            buttonLink={story.videoButtonLink}
          />
        </div>
      )}
      
      {!isLast && (
        <GridContainer>
          <GridRow>
            <GridColumn cols={12}>
              <StoryDivider />
            </GridColumn>
          </GridRow>
        </GridContainer>
      )}
    </StorySection>
  );
};

export default Stories;

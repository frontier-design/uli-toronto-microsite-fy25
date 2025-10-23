import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from '../../../hooks/useGSAP';
import { gridConfig } from '../../../styles';
import oce_2 from '../../../assets/images/uli-oliviaChow-event/oce_2.jpg';
import oce_3 from '../../../assets/images/uli-oliviaChow-event/oce_3.jpg';
import oce_5 from '../../../assets/images/uli-oliviaChow-event/oce_5.jpg';

const ParallaxContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: ${gridConfig.maxWidth}px;
  margin: 80px auto;
  padding: 0 ${gridConfig.margin}px;
  height: 50vh;

  @media (min-width: 1600px) {
    max-width: 1800px;
  }

  @media (max-width: 1024px) {
    height: 80vh;
    margin: 40px auto;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
    height: 30vh;
    margin: 30px auto;
  }
`;

const ParallaxImage = styled.div`
  position: absolute;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &.parallax-img-1 {
    @media (min-width: 1600px) {
      width: 390px !important;
      height: 520px !important;
    }

    @media (max-width: 1024px) {
      width: 240px !important;
      height: 320px !important;
    }

    @media (max-width: 768px) {
      width: 200px !important;
      height: 267px !important;
    }

    @media (max-width: 480px) {
      width: 160px !important;
      height: 213px !important;
    }
  }

  &.parallax-img-2 {
    @media (min-width: 1600px) {
      width: 455px !important;
      height: 585px !important;
    }

    @media (max-width: 1024px) {
      width: 280px !important;
      height: 360px !important;
    }

    @media (max-width: 768px) {
      width: 233px !important;
      height: 300px !important;
    }

    @media (max-width: 480px) {
      width: 186px !important;
      height: 240px !important;
    }
  }

  &.parallax-img-3 {
    @media (min-width: 1600px) {
      width: 494px !important;
      height: 390px !important;
    }

    @media (max-width: 1024px) {
      width: 304px !important;
      height: 240px !important;
    }

    @media (max-width: 768px) {
      width: 253px !important;
      height: 200px !important;
    }

    @media (max-width: 480px) {
      width: 202px !important;
      height: 160px !important;
    }
  }

  &.parallax-img-4 {
    @media (min-width: 1600px) {
      width: 416px !important;
      height: 546px !important;
    }

    @media (max-width: 1024px) {
      width: 256px !important;
      height: 336px !important;
    }

    @media (max-width: 768px) {
      width: 213px !important;
      height: 280px !important;
    }

    @media (max-width: 480px) {
      width: 171px !important;
      height: 224px !important;
    }
  }

  &.parallax-img-5 {
    @media (min-width: 1600px) {
      width: 650px !important;
      height: 390px !important;
    }

    @media (max-width: 1024px) {
      width: 400px !important;
      height: 240px !important;
    }

    @media (max-width: 768px) {
      width: 333px !important;
      height: 200px !important;
    }

    @media (max-width: 480px) {
      width: 267px !important;
      height: 160px !important;
    }
  }
`;

// Default images if none provided
const defaultImages = [

    {
      src: oce_2,
      alt: 'Architecture 2',
      width: '350px',
      height: '450px',
      top: '0%',
      right: '10%',
      speed: 0.4,
      rotation: 3,
    },
    {
      src: oce_3,
      alt: 'Architecture 3',
      width: '380px',
      height: '300px',
      top: '0%',
      left: '5%',
      speed: 0.8,
      rotation: -3,
    },
    {
      src: oce_5,
      alt: 'Architecture 5',
      width: '500px',
      height: '300px',
      top: '30%',
      right: '35%',
      speed: 0.6,
      rotation: -4,
    },
  ];

const ParallaxImages = ({ images = [] }) => {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect for each image with different delays and speeds
      imageRefs.current.forEach((imageEl, index) => {
        if (!imageEl) return;

        const image = images.length > 0 ? images[index] : defaultImages[index];
        const speed = image?.speed || (1 + index * 0.3); // Varying speeds based on index
        const rotation = image?.rotation || (index % 2 === 0 ? -2 : 2); // Alternate rotation

        gsap.to(imageEl, {
          y: () => `${-150 * speed}px`,
          rotation: rotation,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5 + (index * 0.1), // Staggered scrub timing
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [images]);

  const displayImages = images.length > 0 ? images : defaultImages;

  return (
    <ParallaxContainer ref={containerRef} data-hide-nav="true">
      {displayImages.map((image, index) => (
        <ParallaxImage
          key={index}
          className={`parallax-img-${index + 1}`}
          ref={(el) => (imageRefs.current[index] = el)}
          style={{
            width: image.width,
            height: image.height,
            top: image.top,
            left: image.left,
            right: image.right,
            bottom: image.bottom,
            zIndex: image.zIndex || index,
          }}
        >
          <img src={image.src} alt={image.alt || `Parallax image ${index + 1}`} />
        </ParallaxImage>
      ))}
    </ParallaxContainer>
  );
};

export default ParallaxImages;

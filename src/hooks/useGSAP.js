import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const useGSAP = (callback, deps = []) => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current && callback) {
      const ctx = gsap.context(callback, ref);
      return () => ctx.revert();
    }
  }, deps);

  return ref;
};

export const useScrollTrigger = (callback, deps = []) => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current && callback) {
      const ctx = gsap.context(() => {
        callback(ScrollTrigger);
      }, ref);
      return () => ctx.revert();
    }
  }, deps);

  return ref;
};

// Common animation presets
export const fadeInUp = {
  opacity: 0,
  y: 60,
  duration: 1,
  ease: "power2.out",
};

export const fadeInLeft = {
  opacity: 0,
  x: -60,
  duration: 1,
  ease: "power2.out",
};

export const fadeInRight = {
  opacity: 0,
  x: 60,
  duration: 1,
  ease: "power2.out",
};

export const scaleIn = {
  opacity: 0,
  scale: 0.8,
  duration: 0.8,
  ease: "back.out(1.7)",
};

export const staggerChildren = {
  stagger: 0.2,
  delay: 0.3,
};

export { gsap };
export default gsap;

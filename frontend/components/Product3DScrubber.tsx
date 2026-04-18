'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 60; // Assuming 60 frames for the 3D scroll animation

export default function Product3DScrubber() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  // Track scroll progress purely within this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      // Pad to 3 digits, e.g. 001, 002
      const paddedIndex = i.toString().padStart(3, '0');
      img.src = `/images/3d-sequence/frame_${paddedIndex}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          // Draw first frame immediately
          drawFrame(0, loadedImages);
        }
      };
      
      // If user doesn't have the sequence yet, we fail gracefully.
      img.onerror = () => {
        // Fallback or ignore for placeholder
      };
      
      loadedImages.push(img);
    }
  }, []);

  const drawFrame = (frameIndex: number, imgArray = images) => {
    if (!canvasRef.current || imgArray.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imgArray[frameIndex];
    if (!img) return;

    // Draw filling the canvas maintaining aspect ratio (object-cover equivalent)
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height,
                  centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
  };

  // Sync scroll to frame
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length > 0) {
      // Map 0-1 to 0-(FRAME_COUNT-1)
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(latest * FRAME_COUNT)));
      drawFrame(frameIndex);
    }
  });

  // Text fading logic based on scroll
  const text1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [0, 1, 1, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
  const text3Opacity = useTransform(scrollYProgress, [0.7, 0.8, 0.9, 1], [0, 1, 1, 0]);

  // Dimensions sync
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Redraw current frame
        drawFrame(Math.floor(scrollYProgress.get() * FRAME_COUNT));
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images]);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#121212]" style={{ height: "400vh" }}>
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#BDC2C2] border-t border-b border-black/10">
        
        {/* Canvas for 3D Sequence rendering */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full"
        />

        {/* Fallback pattern if sequence is missing */}
        {images.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[#050505]/40 border-8 border-dashed border-[#050505]/20 m-12">
            <h3 className="text-2xl font-semibold uppercase tracking-widest mb-4">3D Sequence Placeholder</h3>
            <p className="font-serif text-sm">Place frames `frame_001.jpg` to `frame_060.jpg` in `/public/images/3d-sequence/` to activate scroll scrubbing.</p>
          </div>
        )}

        {/* Deep Scroll Typography Overlays */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.div style={{ opacity: text1Opacity }} className="absolute text-center px-6">
            <h2 className="text-4xl md:text-6xl luxury-heading text-[#050505] drop-shadow-sm">360° PRECISION</h2>
            <p className="mt-4 text-xl font-serif text-[#050505]/80">Examine every scarred edge.</p>
          </motion.div>
          <motion.div style={{ opacity: text2Opacity }} className="absolute text-center px-6">
            <h2 className="text-4xl md:text-6xl luxury-heading text-[#050505] drop-shadow-sm">RAW HARDWARE</h2>
            <p className="mt-4 text-xl font-serif text-[#050505]/80">Cold, heavy, uncompromising.</p>
          </motion.div>
          <motion.div style={{ opacity: text3Opacity }} className="absolute text-center px-6">
            <h2 className="text-4xl md:text-6xl luxury-heading text-[#050505] drop-shadow-sm">THE DARK ARTS</h2>
            <p className="mt-4 text-xl font-serif text-[#050505]/80">Anti-fashion engineering at its peak.</p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

'use client';

import HeroMedia from '@/components/sections/HeroMedia';
import EditorialText from '@/components/sections/EditorialText';
import ImageShowcase from '@/components/sections/ImageShowcase';
import SplitContent from '@/components/sections/SplitContent';

export default function AboutPage() {
  return (
    <main>
      {/* 1. Hero */}
      <HeroMedia
        imageSrc="/images/belt_detail.png"
        imageAlt="LLEMWELL Heritage"
        heading="Our Heritage"
        subheading="The Story of LLEMWELL"
        overlayOpacity={55}
        showScrollIndicator={true}
      />

      {/* 2. Genesis Story */}
      <EditorialText
        subheading="The Genesis"
        heading="Born From the Underground"
        body="LLEMWELL was founded on a singular vision: to create not merely an accessory, but a weapon of self-expression. While high fashion evolved, the raw, unfiltered energy of the punk scene was being diluted. Our founders sought to reclaim this space — bringing visceral aesthetics to heavy-duty leather goods."
      />

      {/* 3. Full-Bleed Image */}
      <ImageShowcase
        src="/images/belt_lifestyle.png"
        alt="LLEMWELL lifestyle"
        height="60vh"
      />

      {/* 4. Split: Material */}
      <SplitContent
        imageSrc="/images/belt_hero.png"
        imageAlt="LLEMWELL raw leather and heavy metal hardware"
        subheading="The Material"
        heading="Heavy Metal & Raw Leather"
        description="We scour the earth to source materials that can survive the mosh pit and the runway alike. Our leather is thick, distressed calfskin, scarred to perfection. The heavy metal spikes and custom silver buckles are forged to take a beating, oxidizing naturally over time to create a unique, chaotic patina that only gets better with age."
      />

      {/* 5. Split: Craft */}
      <SplitContent
        imageSrc="/images/belt_detail.png"
        imageAlt="LLEMWELL handmade precision craftsmanship"
        subheading="The Craft"
        heading="Handmade Precision"
        description="Every stitch, every eyelet, every spike is placed by hand. There are no shortcuts in our atelier. Each belt passes through the hands of a single craftsman from start to finish — a process that takes days, not hours. This is not manufacturing. This is creation."
        reverse={true}
      />

      {/* 6. CTA Hero */}
      <HeroMedia
        imageSrc="/images/heroX1.jpg"
        imageAlt="Discover The Belt"
        heading="Discover The Belt"
        subheading="Explore Our Masterpiece"
        ctaText="The Belt"
        ctaLink="/product"
        overlayOpacity={60}
      />
    </main>
  );
}

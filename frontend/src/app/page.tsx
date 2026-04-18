import SnapContainer from '@/components/sections/SnapContainer';
import SnapSection from '@/components/sections/SnapSection';
import HeroMedia from '@/components/sections/HeroMedia';
import SplitContent from '@/components/sections/SplitContent';
import HorizontalProductSlider from '@/components/sections/HorizontalProductSlider';

export default function Home() {
  const sliderSlides = [
    {
      id: 1,
      imageSrc: '/images/belt_hero.png',
      imageAlt: 'Hardware Detail 1',
      title: 'Forged to Endure',
      subtitle: 'The Material',
    },
    {
      id: 2,
      imageSrc: '/images/belt_lifestyle.png',
      imageAlt: 'Hardware Detail 2',
      title: 'Scarred With Purpose',
      subtitle: 'The Craft',
    },
    {
      id: 3,
      imageSrc: '/images/heroShowcase.jpg',
      imageAlt: 'Raw Aesthetic',
      title: 'Reject the Ordinary',
      subtitle: 'The Statement',
    },
    // {
    //   id: 4,
    //   imageSrc: '/images/belt_hero.png',
    //   imageAlt: 'Hardware Detail 1',
    //   title: 'Forged to Endure',
    //   subtitle: 'The Material',
    // },
    // {
    //   id: 5,
    //   imageSrc: '/images/heroShowcase.jpg',
    //   imageAlt: 'Raw Aesthetic',
    //   title: 'Reject the Ordinary',
    //   subtitle: 'The Statement',
    // }
  ];

  return (
    <SnapContainer>
      
      {/* Unified Hero + Overlapping Slider Block */}
      <div className="relative w-full z-0 flex flex-col">
        {/* Sticky Hero Background */}
        <div className=" top-0 h-screen w-full snap-start z-0 overflow-hidden">
          <HeroMedia
            imageSrc="/images/heroX1.jpg"
            imageAlt="LLEMWELL Luxury Belt"
            subheading="Uncompromising Craftsmanship"
            heading="RAW OPIUM AESTHETIC"
            overlayOpacity={40}
          />
        </div>
        
        {/* Slider overlapping the Hero on scroll */}
        <div className="h-screen w-full snap-start relative z-10 flex items-end">
          {/* Gradient to darken the hero behind the slider content */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent pointer-events-none" />
          
          <div className="relative z-20 w-full h-full">
            <HorizontalProductSlider
              heading="UNCOMPROMISING ASSETS"
              subheading="The Collection"
              slides={sliderSlides}
              backgroundColor="bg-transparent"
            />
          </div>
        </div>
      </div>

      <SnapSection className="bg-white z-20 relative">
        <SplitContent
          imageSrc="/images/heroShowcase.jpg"
          imageAlt="LLEMWELL Craftsmanship"
          subheading="The Art of Rebellion"
          heading="Redefine Boundaries"
          description={"We did not create LLEMWELL to follow trends. We created it to build armor.\n\nA true collision of high-fashion precision and reckless underground energy. Every LLEMWELL studded belt is a riot of craftsmanship. Forged from distressed calfskin leather and weaponized with heavy metal eyelets, silver spikes, and chunky vintage hardware."}
          ctaText="Explore the Details"
          ctaLink="/product"
          reverse={false}
          backgroundColor="bg-transparent" // Replaced to transparent to use section bg
          textColor="text-black"
        />
      </SnapSection>

      <SnapSection className="z-20 relative">
        <HeroMedia
          imageSrc="/images/heroX1.jpg" 
          imageAlt="A Statement of Power"
          heading="A Statement of Power"
          subheading="Worn by the few who define the future"
          ctaText="Request an Allocation"
          ctaLink="/contact"
          overlayOpacity={60}
          align="center"
        />
      </SnapSection>
      
    </SnapContainer>
  );
}

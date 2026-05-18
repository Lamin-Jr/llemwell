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
      title: 'Industrial Decay',çç
      subtitle: 'The Hardware',
    },
    {
      id: 2,
      imageSrc: '/images/belt_lifestyle.png',
      imageAlt: 'Hardware Detail 2',
      title: 'Distorted Proportions',
      subtitle: 'The Silhouette',
    },
    {
      id: 3,
      imageSrc: '/images/heroShowcase.jpg',
      imageAlt: 'Raw Aesthetic',
      title: 'Structural Mutation',
      subtitle: 'The Form',
    },
    {
      id: 4,
      imageSrc: '/images/belt_hero.png',
      imageAlt: 'Hardware Detail 1',
      title: 'Heavy Metal Glamour',
      subtitle: 'The Binding',
    },
    {
      id: 5,
      imageSrc: '/images/heroShowcase.jpg',
      imageAlt: 'Raw Aesthetic',
      title: 'Monumental Scale',
      subtitle: 'The Artifact',
    }
  ];

  return (
    <SnapContainer>
      
      {/* Unified Hero + Overlapping Slider Block */}
      <div className="relative w-full z-0 flex flex-col">
        {/* Sticky Hero Background */}
        <div className=" top-0 h-screen w-full snap-start z-30 overflow-hidden">
          <HeroMedia
            imageSrc="/images/heroX1.jpg"
            imageAlt="LLEMWELL Luxury Belt"
            subheading="Structural Mutation"
            heading="BRUTALIST PROPORTIONS"
            overlayOpacity={40}
          />
        </div>
        
        {/* Slider overlapping the Hero on scroll XVS 1 */}
        <div className="h-screen w-full snap-start relative z-0 flex items-end">
          {/* Gradient to darken the hero behind the slider content */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent pointer-events-none" />
          
          <div className="relative z-20 w-full h-full">
            <HorizontalProductSlider
              heading="ARCHITECTURAL INTERVENTIONS"
              subheading="The Artifacts"
              slides={sliderSlides}
              backgroundColor="bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* <SnapSection className="bg-transparent z-20 relative">
        <SplitContent
          imageSrc="/images/heroShowcase.jpg"
          imageAlt="LLEMWELL Craftsmanship"
          imageClass="drop-shadow-2xl brightness-110 grayscale" 
          subheading="A Study in Restraint and Excess"
          heading="Sculptural Mutation"
          description={"A belt is not merely an accessory; it is a structural intervention. A brutal line drawn across the body to anchor the silhouette. We reject the decorative in favor of the monumental.\n\nEvery LLEMWELL artifact is an exercise in severe proportions—distressed leathers that mourn the passage of time, hardware forged with industrial coldness, and a relentless commitment to structural decay. It is armor for a world in decline."}
          ctaText="Examine the Structure"
          ctaLink="/product"
          reverse={false}
          backgroundColor="bg-transparent" // Replaced to transparent to use section bg
          textColor="text-foreground"
        />
      </SnapSection> */}

      {/* <SnapSection className="z-20 relative">
        <HeroMedia
          imageSrc="/images/heroX1.jpg" 
          imageAlt="A Statement of Power"
          heading="Monumental Severity"
          subheading="Hardware that outlives the flesh"
          ctaText="Acquire the Artifact"
          ctaLink="/contact"
          overlayOpacity={60}
          align="center"
        />
      </SnapSection> */}
      
    </SnapContainer>
  );
}

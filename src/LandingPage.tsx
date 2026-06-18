import { useNavigate } from 'react-router';
import { Navbar } from '@/components/Navbar';
import { PixelHero } from '@/components/ui/pixel-perfect-hero';
import { BackgroundPaths } from '@/components/ui/background-paths';
import { ChartLeaderboard } from '@/sections/ChartLeaderboard';
import { PlatformsSection } from '@/sections/PlatformsSection';
import { ExploreCharts } from '@/sections/ExploreCharts';
import { NewsSection } from '@/sections/NewsSection';
import { FooterSection } from '@/sections/FooterSection';

export function LandingPage() {
  const navigate = useNavigate();
  const openCharts = () => navigate('/app#charts');

  return (
    <div className="relative overflow-x-clip bg-[var(--lp-bg)] min-h-screen" style={{ fontFamily: "'Kanit', sans-serif" }}>
      <Navbar />

      {/* 1. Hero — pixel canvas animation */}
      <div id="hero">
        <PixelHero
          word1="Ngoma"
          word2="Charts."
          description="Aggregating Kenyan music charts across six platforms into a unified voice. Every beat, every rise, every number one — tracked in real time."
          primaryCta="Explore Charts"
          primaryCtaMobile="Explore"
          secondaryCta="View Rankings"
          secondaryCtaMobile="Rankings"
          onPrimaryClick={openCharts}
          onSecondaryClick={openCharts}
        />
      </div>

      {/* 2. Music Rankings transition */}
      <BackgroundPaths title="Music Rankings" />

      {/* 3. Ngoma Top 10 chart */}
      <ChartLeaderboard />

      {/* 4. Platform coverage */}
      <PlatformsSection />

      {/* 5. Explore chart categories */}
      <ExploreCharts />

      {/* 6. News */}
      <NewsSection />

      {/* 7. Footer */}
      <FooterSection />
    </div>
  );
}

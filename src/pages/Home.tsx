import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { About } from '@/components/sections/About';
import { Portfolio } from '@/components/sections/Portfolio';

import { CTA } from '@/components/sections/CTA';

export function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <Portfolio />

      <CTA />
    </main>
  );
}

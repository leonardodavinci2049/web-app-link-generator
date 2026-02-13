import { Suspense } from "react";
import { AfiliadoHero } from "@/components/afiliado/AfiliadoHero";
import { ConversionCard } from "@/components/afiliado/ConversionCard";
//import { CountdownTimer } from "@/components/afiliado/CountdownTimer";
import { RecentLinksSection } from "@/components/afiliado/RecentLinksSection";
import { UrgencyBanner } from "@/components/afiliado/UrgencyBanner";
import ModeToggle from "@/components/theme/mode-toggle";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
  return (
    <main className="min-h-dvh w-full flex flex-col items-center pb-6 relative overflow-x-hidden">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ModeToggle />
      </div>

      {/* Content wrapper */}
      <div className="w-full max-w-md px-4 flex flex-col items-center z-10 pt-2">
        <AfiliadoHero />

        {/*   <div className="w-full flex justify-center mb-1">
          <CountdownTimer />
        </div> */}

        <UrgencyBanner />

        <ConversionCard />

        {/* Recent generated links */}
        <Suspense
          fallback={
            <div className="w-full mt-6 flex justify-center py-8">
              <Spinner className="text-primary" />
            </div>
          }
        >
          <RecentLinksSection />
        </Suspense>
      </div>

      <div className="mt-6 text-center text-xs opacity-40 mix-blend-plus-darker">
        <p>Termos de Uso | Privacidade</p>
      </div>
    </main>
  );
}

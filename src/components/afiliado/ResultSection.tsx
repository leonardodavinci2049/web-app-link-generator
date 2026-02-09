"use client";

import { Check, ShieldCheck, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ResultSection({ link }: { link: string }) {
  return (
    <div className="mt-4 animate-in slide-in-from-bottom-4 fade-in duration-700 fill-mode-forwards">
      <div className="relative border-2 border-accent rounded-xl p-4 bg-card/50 shadow-sm text-center">
        {/* Verified Badge */}
        <div className="absolute -top-3 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm uppercase tracking-wider">
          <ShieldCheck className="w-3 h-3" />
          Verificado
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-primary font-bold text-base">
            <div className="bg-primary/10 p-1.5 rounded-full">
              <Check className="w-4 h-4 text-primary" />
            </div>
            Desconto Aplicado com Sucesso!
          </div>

          <Button
            className="w-full h-12 text-sm font-bold rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] gap-2"
            size="lg"
            variant="outline"
            style={{
              borderColor: "var(--accent)",
              backgroundColor: "var(--accent)",
              color: "var(--accent-foreground)",
            }}
            onClick={() => window.open(link, "_blank")}
          >
            <ShoppingBag className="w-4 h-4" />
            PEGAR MEU PRODUTO AGORA
          </Button>
        </div>
      </div>
    </div>
  );
}

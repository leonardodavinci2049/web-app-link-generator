"use client";

import { Copy, ShieldCheck, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function ResultSection({ link }: { link: string }) {
  return (
    <div className="mt-4 animate-in slide-in-from-bottom-4 fade-in duration-700 fill-mode-forwards">
      <div className="relative border-2 border-accent rounded-xl px-2 py-4 bg-card/50 shadow-sm text-center">
        {/* Verified Badge */}
        <div className="absolute -top-3 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm uppercase tracking-wider">
          <ShieldCheck className="w-3 h-3" />
          Verificado
        </div>

        <div className="flex flex-col items-center gap-4 py-2">
          <div className="space-y-1">
            <h3 className="text-primary font-bold text-lg leading-tight">
              Link gerado com sucesso!
            </h3>
            <p className="text-muted-foreground text-xs font-medium leading-relaxed max-w-[280px] mx-auto">
              Copie o link abaixo e aguarde o próximo cupom ser gerado.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 w-full">
            <Button
              className="h-12 text-xs font-bold rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] gap-1.5 px-1"
              size="lg"
              variant="outline"
              style={{
                borderColor: "var(--primary)",
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
              onClick={() => window.open(link, "_blank")}
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span>PEGAR PRODUTO</span>
            </Button>
            <Button
              className="h-12 text-xs font-bold rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] gap-1.5 px-1"
              size="lg"
              variant="outline"
              style={{
                borderColor: "var(--accent)",
                backgroundColor: "var(--accent)",
                color: "var(--accent-foreground)",
              }}
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast.success("Link copiado com sucesso!");
              }}
            >
              <Copy className="w-4 h-4 shrink-0" />
              <span>COPIAR LINK</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

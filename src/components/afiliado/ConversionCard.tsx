"use client";

import { AlertCircle, Link2, Sparkles, Ticket } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { generateAffiliateLinkAction } from "@/app/actions/generate-affiliate-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResultSection } from "./ResultSection";

export function ConversionCard() {
  const router = useRouter();
  const [inputLink, setInputLink] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async () => {
    if (generatedLink) {
      // Reset state to generate another
      setGeneratedLink(null);
      setInputLink("");
      setError(null);
      return;
    }

    // Validation
    setError(null);
    if (!inputLink.trim()) {
      setError("Por favor, cole o link do produto.");
      return;
    }

    const validPrefixes = [
      "https://s.shopee.com",
      "https://br.shopee.com",
      "https://shopee.com.br",
      "https://br.shp.ee",
      "https://shp.ee",
    ];

    // Check if starts with valid prefix
    const isValid = validPrefixes.some((prefix) =>
      inputLink.startsWith(prefix),
    );

    if (!isValid) {
      setError("Link irreconhecível. Certifique-se que é um link da Shopee.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await generateAffiliateLinkAction(inputLink.trim());

      if (result.success && result.affiliateLink) {
        setGeneratedLink(result.affiliateLink);
        // Força o refetch explícito dos Server Components (RecentLinksSection)
        // contornando possíveis inconsistências do cache de componentes
        router.refresh();
      } else {
        setError(result.error ?? "Erro ao gerar link de afiliado.");
      }
    } catch {
      setError("Erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto mt-4">
      <div className="bg-card text-card-foreground border-2 border-dashed border-primary/30 rounded-2xl p-5 pt-8 shadow-xl relative z-10 transition-all duration-300">
        {/* Top Badge */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5 whitespace-nowrap">
            <Ticket className="w-3.5 h-3.5" />
            SISTEMA DE CONVERSÕES
          </div>
        </div>

        {/* Header content */}
        <div className="text-center space-y-2 mb-4">
          <h2 className="text-xl font-bold leading-tight">
            CUPOM DE DESCONTO AQUI
          </h2>
          <p className="text-muted-foreground text-xs px-2">
            Escolha qualquer produto da Shopee que a gente aplica o desconto pra
            você!
          </p>
        </div>

        {/* Input Section */}
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className={`pl-9 h-12 rounded-xl transition-all border-input focus-visible:ring-primary ${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
                placeholder="Cole aqui o link do produto..."
                value={inputLink}
                onChange={(e) => setInputLink(e.target.value)}
                disabled={isLoading || !!generatedLink}
              />
            </div>
            {error && (
              <div className="flex items-center gap-1.5 text-xs text-destructive font-medium animate-in slide-in-from-top-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {error}
              </div>
            )}
          </div>

          <Button
            className="w-full h-12 rounded-xl text-base font-bold shadow-lg transition-all hover:brightness-110 active:scale-[0.98]"
            onClick={handleAction}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                PROCESSANDO...
              </span>
            ) : generatedLink ? (
              <span className="flex items-center gap-2">
                GERAR OUTRO CUPOM
                <Sparkles className="w-4 h-4" />
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                GERAR LINK COM DESCONTO
              </span>
            )}
          </Button>
        </div>

        {/* Result Section */}
        {generatedLink && <ResultSection link={generatedLink} />}
      </div>
    </div>
  );
}

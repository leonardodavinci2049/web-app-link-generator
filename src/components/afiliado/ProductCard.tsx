"use client";

import { Check, Copy, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  imageUrl: string;
  productName: string;
  affiliateLink: string;
}

export function ProductCard({
  imageUrl,
  productName,
  affiliateLink,
}: ProductCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(affiliateLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = affiliateLink;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-card text-card-foreground border border-border rounded-xl p-3 shadow-sm flex gap-3 items-start transition-all hover:shadow-md">
      {/* Product Image */}
      <div className="relative w-16 h-16 min-w-16 rounded-lg overflow-hidden bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={productName}
            fill
            sizes="64px"
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
            Sem img
          </div>
        )}
      </div>

      {/* Product Info & Actions */}
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <p className="text-sm font-medium leading-snug line-clamp-2">
          {productName}
        </p>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs rounded-lg gap-1.5 flex-1"
            onClick={() => window.open(affiliateLink, "_blank")}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Ver produto
          </Button>

          <Button
            size="sm"
            variant={copied ? "default" : "secondary"}
            className="h-8 text-xs rounded-lg gap-1.5 flex-1"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copiar link
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

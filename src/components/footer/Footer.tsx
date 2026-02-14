import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="mt-12 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {/* Disclaimer Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2">
              <span className="text-primary">🛍️</span> Parceiro Oficial Shopee
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Somos Parceiros da Shopee! 🤝 Suas compras através de nossos links
              não apenas lhe garantem os melhores produtos, cupons e promoções,
              mas também nos apoiam com uma comissão de afiliado, sem custo
              extra para você.{" "}
              <span className="font-medium text-foreground">
                Juntos, ganhamos! 💎✨
              </span>
            </p>
          </div>

          {/* Copyright Section */}
          <div className="flex flex-col justify-center gap-4 text-center md:text-right md:items-end">
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-center">
              <Image
                src="/logo-promosdamih.jpeg"
                alt="Cupons da Mih"
                width={96}
                height={96}
                className="rounded-md object-contain h-24 w-auto"
              />
              <div className="space-y-1">
                <p className="text-sm font-medium">Cupons da Mih</p>
                <p className="text-xs text-muted-foreground">
                  Publisher de Ofertas, Promoções e Cupom de Desconto
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-8 border-t flex flex-col items-center justify-between gap-4 md:flex-row text-xs text-muted-foreground">
          <p className="text-center md:text-left w-full text-balance">
            Copyright © 2020 - {currentYear} | Cupons da Mih | Publisher de
            Ofertas, Promoções e Cupom de Desconto - Todos os Direitos
            Reservados.
          </p>
          <div className="flex gap-4 shrink-0">
            <Link
              href="https://shopee.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              Shopee <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

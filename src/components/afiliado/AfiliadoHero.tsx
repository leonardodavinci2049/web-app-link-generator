import Image from "next/image";

export function AfiliadoHero() {
  return (
    <div className="flex flex-col items-center text-center space-y-2 py-4">
      <div className="relative">
        <div className="rounded-full border-4 border-background shadow-lg overflow-hidden w-32 h-32 relative">
          <Image
            src="/logo-promosdamih2.png"
            alt="Logo"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="space-y-1 px-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          GERADOR DE DESCONTOS
        </h1>
        <p className="text-foreground/80 font-medium text-xs">
          Você escolhe o produto, nós Geramos o Link com o Cupom!
        </p>
      </div>
    </div>
  );
}
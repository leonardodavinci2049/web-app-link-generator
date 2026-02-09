import Image from "next/image";

export function AfiliadoHero() {
  return (
    <div className="flex flex-col items-center text-center space-y-2 py-4">
      <div className="relative">
        <div className="rounded-full border-4 border-background shadow-lg overflow-hidden w-20 h-20 relative">
          <Image
            src="/logo-elly-v2.png"
            alt="Logo"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="space-y-1 px-4">
        <h1 className="text-2xl font-bold tracking-tight text-primary-foreground">
          GERADOR DE DESCONTOS
        </h1>
        <p className="text-primary-foreground/90 font-medium text-sm">
          Você escolhe o produto, nós aplicamos o desconto!
        </p>
      </div>
    </div>
  );
}

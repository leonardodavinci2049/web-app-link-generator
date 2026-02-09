import { TriangleAlert } from "lucide-react";

export function UrgencyBanner() {
  return (
    <div className="flex items-center justify-center gap-2 p-2 px-4 rounded-lg bg-destructive/10 text-destructive text-sm font-semibold animate-pulse mt-4">
      <TriangleAlert className="h-4 w-4" />
      <span>O DESCONTO PODE ACABAR A QUALQUER MOMENTO!</span>
    </div>
  );
}

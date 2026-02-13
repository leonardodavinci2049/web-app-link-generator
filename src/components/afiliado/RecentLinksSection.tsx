import { History } from "lucide-react";
import { connection } from "next/server";
import { fetchRecentLinksAction } from "@/app/actions/fetch-recent-links";
import { ProductCard } from "./ProductCard";

export async function RecentLinksSection() {
  await connection();
  const result = await fetchRecentLinksAction(10);

  if (!result.success || !result.records || result.records.length === 0) {
    return null;
  }

  return (
    <section className="w-full mt-6">
      <div className="flex items-center gap-2 mb-3">
        <History className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-bold uppercase tracking-wide">
          Links gerados recentemente
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {result.records.map((record) => (
          <ProductCard
            key={record.ID}
            imageUrl={record.IMAGE_URL}
            productName={record.PRODUCT_NAME}
            affiliateLink={record.AFFILIATE_LINK}
          />
        ))}
      </div>
    </section>
  );
}

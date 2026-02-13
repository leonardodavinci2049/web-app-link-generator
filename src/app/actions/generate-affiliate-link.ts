"use server";

import { revalidatePath } from "next/cache";
import { ShopeeServiceApi } from "@/services/api/shopee";

interface GenerateAffiliateLinkResult {
  success: boolean;
  affiliateLink?: string;
  error?: string;
}

export async function generateAffiliateLinkAction(
  originUrl: string,
): Promise<GenerateAffiliateLinkResult> {
  try {
    const response = await ShopeeServiceApi.generateAffiliateLink({
      originUrl,
    });

    revalidatePath("/");

    return {
      success: true,
      affiliateLink: response.affiliateLink,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Erro inesperado ao gerar link de afiliado.";

    return {
      success: false,
      error: message,
    };
  }
}

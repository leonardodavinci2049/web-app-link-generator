"use server";

import { PromolinksServiceApi } from "@/services/api/promolinks";
import type { LinkGenerationRecord } from "@/services/api/promolinks/types/promolinks-types";

interface FetchRecentLinksResult {
  success: boolean;
  records?: LinkGenerationRecord[];
  error?: string;
}

export async function fetchRecentLinksAction(
  limit = 10,
): Promise<FetchRecentLinksResult> {
  try {
    const response = await PromolinksServiceApi.linkGenerationFindAll({
      pe_limit: limit,
    });

    if (!PromolinksServiceApi.isSuccessResponse(response)) {
      return {
        success: false,
        error: response.message || "Erro ao buscar links recentes.",
      };
    }

    const records = PromolinksServiceApi.extractLinkGenerationRecords(response);

    return {
      success: true,
      records,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Erro inesperado ao buscar links recentes.";

    return {
      success: false,
      error: message,
    };
  }
}

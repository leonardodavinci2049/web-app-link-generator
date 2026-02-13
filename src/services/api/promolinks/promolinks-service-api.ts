import "server-only";

import { envs } from "@/core/config";
import { PROMOLINKS_ENDPOINTS } from "@/core/constants/api-constants";
import { createLogger } from "@/core/logger";
import { BaseApiService } from "@/lib/axios/base-api-service";

import type {
  LinkGenerationFindAllResponse,
  LinkGenerationRecord,
  PromoLinkFindAllResponse,
  PromoLinkRecord,
} from "./types/promolinks-types";
import { PromolinksError } from "./types/promolinks-types";
import {
  LinkGenerationFindAllSchema,
  PromoLinkFindAllSchema,
} from "./validation/promolinks-schemas";

const logger = createLogger("PromolinksServiceApi");

export class PromolinksServiceApi extends BaseApiService {
  /**
   * Constrói credenciais do sistema a partir das variáveis de ambiente
   */
  private static buildCredentials(): {
    pe_client_id: number;
    pe_app_id: number;
  } {
    return {
      pe_client_id: envs.SYSTEM.CLIENT_ID,
      pe_app_id: envs.SYSTEM.APP_ID,
    };
  }

  /**
   * Constrói headers de autenticação com API Key
   */
  private static buildAuthHeaders(): { headers: { "x-api-key": string } } {
    return {
      headers: {
        "x-api-key": envs.API_KEY,
      },
    };
  }

  /**
   * Busca/lista registros de links de afiliado gerados, com filtros opcionais
   *
   * @param params - Parâmetros opcionais da requisição
   * @param params.pe_limit - Limite de registros a retornar
   * @returns Resposta com array de registros de links gerados
   *
   * @example
   * ```typescript
   * const result = await PromolinksServiceApi.linkGenerationFindAll({
   *   pe_limit: 5,
   * });
   * const records = PromolinksServiceApi.extractLinkGenerationRecords(result);
   * ```
   */
  static async linkGenerationFindAll(params?: {
    pe_limit?: number;
  }): Promise<LinkGenerationFindAllResponse> {
    try {
      const credentials = PromolinksServiceApi.buildCredentials();

      const validatedParams = LinkGenerationFindAllSchema.parse({
        ...credentials,
        ...params,
      });

      const instance = new PromolinksServiceApi();
      const authHeaders = PromolinksServiceApi.buildAuthHeaders();

      const response = await instance.post<LinkGenerationFindAllResponse>(
        PROMOLINKS_ENDPOINTS.LINK_GENERATION_FIND_ALL,
        validatedParams,
        authHeaders,
      );

      return response;
    } catch (error) {
      logger.error("Erro ao buscar registros de link generation", error);

      if (error instanceof PromolinksError) {
        throw error;
      }

      throw new PromolinksError(
        error instanceof Error
          ? error.message
          : "Erro ao buscar registros de link generation",
        "PROMOLINKS_LINK_GENERATION_FIND_ALL_ERROR",
      );
    }
  }

  /**
   * Busca/lista registros de promo links, com filtros por link específico
   *
   * @param params - Parâmetros da requisição
   * @param params.pe_link_id - ID do link de promoção (obrigatório)
   * @param params.pe_limit - Limite de registros a retornar
   * @returns Resposta com array de registros de promo links
   *
   * @example
   * ```typescript
   * const result = await PromolinksServiceApi.promoLinkFindAll({
   *   pe_link_id: 1,
   *   pe_limit: 10,
   * });
   * const records = PromolinksServiceApi.extractPromoLinkRecords(result);
   * ```
   */
  static async promoLinkFindAll(params: {
    pe_link_id: number;
    pe_limit?: number;
  }): Promise<PromoLinkFindAllResponse> {
    try {
      const credentials = PromolinksServiceApi.buildCredentials();

      const validatedParams = PromoLinkFindAllSchema.parse({
        ...credentials,
        ...params,
      });

      const instance = new PromolinksServiceApi();
      const authHeaders = PromolinksServiceApi.buildAuthHeaders();

      const response = await instance.post<PromoLinkFindAllResponse>(
        PROMOLINKS_ENDPOINTS.PROMO_LINK_FIND_ALL,
        validatedParams,
        authHeaders,
      );

      return response;
    } catch (error) {
      logger.error("Erro ao buscar registros de promo link", error);

      if (error instanceof PromolinksError) {
        throw error;
      }

      throw new PromolinksError(
        error instanceof Error
          ? error.message
          : "Erro ao buscar registros de promo link",
        "PROMOLINKS_PROMO_LINK_FIND_ALL_ERROR",
      );
    }
  }

  // ─── Métodos Utilitários (Helpers) ──────────────────────────────────────────

  /**
   * Extrai array de registros da resposta de linkGenerationFindAll
   *
   * @param response - Resposta do endpoint link-generation-find-all
   * @returns Array de registros de links gerados
   */
  static extractLinkGenerationRecords(
    response: LinkGenerationFindAllResponse,
  ): LinkGenerationRecord[] {
    return response.data?.["Link generation find All"] ?? [];
  }

  /**
   * Extrai array de registros da resposta de promoLinkFindAll
   *
   * @param response - Resposta do endpoint promo-link-find-all
   * @returns Array de registros de promo links
   */
  static extractPromoLinkRecords(
    response: PromoLinkFindAllResponse,
  ): PromoLinkRecord[] {
    return response.data?.["Promo link find All"] ?? [];
  }

  /**
   * Verifica se a resposta indica sucesso (statusCode === 100200)
   *
   * @param response - Resposta da API
   * @returns true se statusCode for 100200
   */
  static isSuccessResponse(
    response: LinkGenerationFindAllResponse | PromoLinkFindAllResponse,
  ): boolean {
    return response.statusCode === 100200;
  }
}

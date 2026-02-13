/**
 * Schemas de validação Zod para o serviço Promolinks
 */

import { z } from "zod";

import { envs } from "@/core/config";

/**
 * Schema para buscar/listar registros de links de afiliado gerados
 */
export const LinkGenerationFindAllSchema = z.object({
  pe_client_id: z.number().optional().default(envs.SYSTEM.CLIENT_ID),
  pe_app_id: z
    .number()
    .min(1, { message: "pe_app_id é obrigatório e deve ser maior que 0" })
    .default(envs.SYSTEM.APP_ID),
  pe_limit: z
    .number()
    .min(1, { message: "pe_limit deve ser maior que 0" })
    .optional(),
});

export type LinkGenerationFindAllInput = z.infer<
  typeof LinkGenerationFindAllSchema
>;

/**
 * Schema para buscar/listar registros de promo links
 */
export const PromoLinkFindAllSchema = z.object({
  pe_client_id: z.number().optional().default(envs.SYSTEM.CLIENT_ID),
  pe_app_id: z
    .number()
    .min(1, { message: "pe_app_id é obrigatório e deve ser maior que 0" })
    .default(envs.SYSTEM.APP_ID),
  pe_link_id: z.number().min(1, {
    message: "pe_link_id é obrigatório e deve ser maior que 0",
  }),
  pe_limit: z
    .number()
    .min(1, { message: "pe_limit deve ser maior que 0" })
    .optional(),
});

export type PromoLinkFindAllInput = z.infer<typeof PromoLinkFindAllSchema>;

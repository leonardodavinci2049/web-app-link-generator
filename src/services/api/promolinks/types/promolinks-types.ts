/**
 * Tipos, interfaces e classe de erro utilizados pelo PromolinksServiceApi
 * Baseado nos endpoints /promolinks/v2/*
 */

// ─── Link Generation Find All ──────────────────────────────────────────────────

/**
 * Request para buscar/listar registros de links de afiliado gerados
 */
export interface LinkGenerationFindAllRequest {
  pe_client_id?: number;
  pe_app_id: number;
  pe_limit?: number;
}

/**
 * Registro individual retornado pelo endpoint link-generation-find-all
 */
export interface LinkGenerationRecord {
  CREATEDAT: string;
  ID: number;
  LINK_DESTINATION: string;
  AFFILIATE_LINK: string;
  FLAG_CLICK: number;
  ITEM_ID: number;
  PRODUCT_NAME: string;
  SHOP_NAME: string;
  SHOP_ID: number;
  PRICE_MIN: string;
  PRICE_MAX: string;
  COMMISSION_RATE: string;
  COMMISSION: string;
  SALES: number;
  RATING_STAR: string;
  IMAGE_URL: string;
  PRODUCT_LINK: string;
  OFFER_LINK: string;
  CURRENCY: string;
  DISCOUNT_PERCENT: string;
  ORIGINAL_PRICE: string;
  CATEGORY: string;
  CATEGORY_ID: number;
  BRAND_NAME: string;
  IS_OFFICIAL: number;
  FREE_SHIPPING: number;
  LOCATION: string;
}

/**
 * Response completa do endpoint link-generation-find-all
 */
export interface LinkGenerationFindAllResponse {
  statusCode: number;
  message: string;
  recordId: number;
  data: {
    "Link generation find All": LinkGenerationRecord[];
  };
  quantity: number;
  errorId: number;
  info1: string;
}

// ─── Promo Link Find All ────────────────────────────────────────────────────────

/**
 * Request para buscar/listar registros de promo links
 */
export interface PromoLinkFindAllRequest {
  pe_client_id?: number;
  pe_app_id: number;
  pe_link_id: number;
  pe_limit?: number;
}

/**
 * Registro individual retornado pelo endpoint promo-link-find-all
 */
export interface PromoLinkRecord {
  ID: number;
  LINK1: string;
  LINK2: string;
  LINK3: string;
  LINK_NAME1: string;
  LINK_NAME2: string;
  LINK_NAME3: string;
  SECRET_KEY1: string;
  SECRET_KEY2: string;
  SECRET_KEY3: string;
  NOTES: string;
  CREATEDAT: string | null;
  UPDATEDAT: string | null;
}

/**
 * Response completa do endpoint promo-link-find-all
 */
export interface PromoLinkFindAllResponse {
  statusCode: number;
  message: string;
  recordId: number;
  data: {
    "Promo link find All": PromoLinkRecord[];
  };
  quantity: number;
  errorId: number;
  info1: string;
}

// ─── Erro Customizado ───────────────────────────────────────────────────────────

/**
 * Erro base para operações Promolinks
 */
export class PromolinksError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly statusCode?: number,
  ) {
    super(message);
    this.name = "PromolinksError";
    Object.setPrototypeOf(this, PromolinksError.prototype);
  }
}

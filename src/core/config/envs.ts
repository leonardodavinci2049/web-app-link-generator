import { z } from "zod";

const envsSchema = z.object({
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().positive("PORT must be a positive number")),

  // External APIs
  EXTERNAL_API_MAIN_URL: z
    .string()
    .url("EXTERNAL_API_MAIN_URL must be a valid URL"),

  // INFO DEVELOPER - Variáveis públicas do desenvolvedor (disponíveis no cliente)
  NEXT_PUBLIC_DEVELOPER_NAME: z
    .string()
    .min(1, "NEXT_PUBLIC_DEVELOPER_NAME is required"),
  NEXT_PUBLIC_DEVELOPER_URL: z
    .string()
    .url("NEXT_PUBLIC_DEVELOPER_URL must be a valid URL"),

  // INFO COMPANY - Variáveis públicas da empresa (disponíveis no cliente)
  NEXT_PUBLIC_COMPANY_NAME: z
    .string()
    .min(1, "NEXT_PUBLIC_COMPANY_NAME is required"),
  NEXT_PUBLIC_COMPANY_PHONE: z
    .string()
    .min(10, "NEXT_PUBLIC_COMPANY_PHONE must have at least 10 characters")
    .max(20, "NEXT_PUBLIC_COMPANY_PHONE must have at most 20 characters"),
  NEXT_PUBLIC_COMPANY_EMAIL: z
    .string()
    .email("NEXT_PUBLIC_COMPANY_EMAIL must be a valid email"),
  NEXT_PUBLIC_COMPANY_WHATSAPP: z
    .string()
    .min(10, "NEXT_PUBLIC_COMPANY_WHATSAPP must have at least 10 characters")
    .max(20, "NEXT_PUBLIC_COMPANY_WHATSAPP must have at most 20 characters"),
});

// Inferir o tipo automaticamente a partir do schema
type EnvVars = z.infer<typeof envsSchema>;

// Só executar validação no servidor, nunca no cliente
let envVars: EnvVars;

if (typeof window === "undefined") {
  // Estamos no servidor - fazer validação completa
  const validationResult = envsSchema.safeParse(process.env);

  if (!validationResult.success) {
    const errorMessages = validationResult.error.issues
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join("\n");
    throw new Error(`❌ Invalid environment variables:\n${errorMessages}`);
  }

  envVars = validationResult.data;
} else {
  // Estamos no cliente - usar valores vazios ou default
  envVars = {
    PORT: 0,
    EXTERNAL_API_MAIN_URL: "",
    // Estas variáveis públicas PODEM ser acessadas no cliente
    NEXT_PUBLIC_DEVELOPER_NAME: process.env.NEXT_PUBLIC_DEVELOPER_NAME || "",
    NEXT_PUBLIC_DEVELOPER_URL: process.env.NEXT_PUBLIC_DEVELOPER_URL || "",
    NEXT_PUBLIC_COMPANY_NAME: process.env.NEXT_PUBLIC_COMPANY_NAME || "",
    NEXT_PUBLIC_COMPANY_PHONE: process.env.NEXT_PUBLIC_COMPANY_PHONE || "",
    NEXT_PUBLIC_COMPANY_EMAIL: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "",
    NEXT_PUBLIC_COMPANY_WHATSAPP:
      process.env.NEXT_PUBLIC_COMPANY_WHATSAPP || "",
  };
}

export const envs = {
  PORT: envVars.PORT,
  EXTERNAL_API_MAIN_URL: envVars.EXTERNAL_API_MAIN_URL,
  // INFO DEVELOPER
  NEXT_PUBLIC_DEVELOPER_NAME: envVars.NEXT_PUBLIC_DEVELOPER_NAME,
  NEXT_PUBLIC_DEVELOPER_URL: envVars.NEXT_PUBLIC_DEVELOPER_URL,
  // INFO COMPANY
  NEXT_PUBLIC_COMPANY_NAME: envVars.NEXT_PUBLIC_COMPANY_NAME,
  NEXT_PUBLIC_COMPANY_PHONE: envVars.NEXT_PUBLIC_COMPANY_PHONE,
  NEXT_PUBLIC_COMPANY_EMAIL: envVars.NEXT_PUBLIC_COMPANY_EMAIL,
  NEXT_PUBLIC_COMPANY_WHATSAPP: envVars.NEXT_PUBLIC_COMPANY_WHATSAPP,
};

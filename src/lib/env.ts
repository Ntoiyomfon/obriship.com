export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  resendApiKey: process.env.RESEND_API_KEY,
  resendFromEmail: process.env.RESEND_FROM_EMAIL,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support@fxlogistics.com"
};

export const hasSupabaseEnv = Boolean(env.supabaseUrl && env.supabaseAnonKey);
export const hasSupabaseAdminEnv = Boolean(
  env.supabaseUrl && env.supabaseServiceRoleKey
);
export const hasResendEnv = Boolean(env.resendApiKey && env.resendFromEmail);

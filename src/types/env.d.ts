interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  //   // 필요에 따라 추가 환경변수들
  //   readonly VITE_API_BASE_URL?: string;
  //   readonly VITE_APP_ENV?: "development" | "staging" | "production";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

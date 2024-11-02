/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
    readonly DATABASE_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_EXT_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

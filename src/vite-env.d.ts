/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_EXT_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
//ImportMetaEnv: a custom TypeScript interface used to define the structure of the import.meta.env object in Vite projects.

//import.meta.env contains environment variables that are prefixed with VITE_

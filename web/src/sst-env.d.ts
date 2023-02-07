/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_GRAPHQL_URL: string
  readonly VITE_GENERATE_URL: string
  readonly VITE_GENERATE_REGION: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
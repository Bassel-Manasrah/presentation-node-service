declare namespace NodeJS {
  export interface ProcessEnv {
    DB_URI: string;
    ENVRIONMENT: "development" | "production";
  }
}

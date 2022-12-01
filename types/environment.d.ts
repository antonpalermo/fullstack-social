declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string
      
      NEXTAUTH_URL: string
      NEXTAUTH_SECRET: string

      GOOGLE_CLIENT: string
      GOOGLE_CLIENT_SECRET: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}

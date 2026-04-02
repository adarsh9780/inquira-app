export type Database = {
  public: {
    Tables: {
      optin_user_signup: {
        Row: {
          created_at: string
          email: string
          platform: string
          source: string
          version: string
        }
        Insert: {
          created_at?: string
          email: string
          platform: string
          source: string
          version: string
        }
        Update: {
          created_at?: string
          email?: string
          platform?: string
          source?: string
          version?: string
        }
      }
    }
  }
}

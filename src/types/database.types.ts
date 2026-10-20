export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      career_sessions: {
        Row: {
          answers: Json | null
          completed_at: string | null
          created_at: string | null
          current_level: number | null
          id: string
          result: Json | null
          seed: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          answers?: Json | null
          completed_at?: string | null
          created_at?: string | null
          current_level?: number | null
          id: string
          result?: Json | null
          seed?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          answers?: Json | null
          completed_at?: string | null
          created_at?: string | null
          current_level?: number | null
          id?: string
          result?: Json | null
          seed?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "career_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      cocoklogikus: {
        Row: {
          alternative_roles: Json | null
          competency_scores: Json | null
          completed_at: string | null
          final_score: number | null
          id: string
          level_scores: Json | null
          match_label: string | null
          reason: Json | null
          recommendations: Json | null
          role_name: string | null
          role_slug: string | null
          user_id: string | null
          username: string | null
        }
        Insert: {
          alternative_roles?: Json | null
          competency_scores?: Json | null
          completed_at?: string | null
          final_score?: number | null
          id: string
          level_scores?: Json | null
          match_label?: string | null
          reason?: Json | null
          recommendations?: Json | null
          role_name?: string | null
          role_slug?: string | null
          user_id?: string | null
          username?: string | null
        }
        Update: {
          alternative_roles?: Json | null
          competency_scores?: Json | null
          completed_at?: string | null
          final_score?: number | null
          id?: string
          level_scores?: Json | null
          match_label?: string | null
          reason?: Json | null
          recommendations?: Json | null
          role_name?: string | null
          role_slug?: string | null
          user_id?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cocoklogikus_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      jalan_ids: {
        Row: {
          all_scores: Json | null
          card_code: string | null
          id: string
          is_tie: boolean | null
          issued_at: string | null
          secondary_roles: Json | null
          top_role: Json | null
          user_id: string | null
          username: string | null
        }
        Insert: {
          all_scores?: Json | null
          card_code?: string | null
          id: string
          is_tie?: boolean | null
          issued_at?: string | null
          secondary_roles?: Json | null
          top_role?: Json | null
          user_id?: string | null
          username?: string | null
        }
        Update: {
          all_scores?: Json | null
          card_code?: string | null
          id?: string
          is_tie?: boolean | null
          issued_at?: string | null
          secondary_roles?: Json | null
          top_role?: Json | null
          user_id?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jalan_ids_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      rapor_sessions: {
        Row: {
          answers: Json | null
          assigned_questions: Json | null
          current_level: number | null
          id: string
          is_finished: boolean | null
          role_slug: string | null
          started_at: string | null
          total_levels: number | null
          user_id: string | null
        }
        Insert: {
          answers?: Json | null
          assigned_questions?: Json | null
          current_level?: number | null
          id: string
          is_finished?: boolean | null
          role_slug?: string | null
          started_at?: string | null
          total_levels?: number | null
          user_id?: string | null
        }
        Update: {
          answers?: Json | null
          assigned_questions?: Json | null
          current_level?: number | null
          id?: string
          is_finished?: boolean | null
          role_slug?: string | null
          started_at?: string | null
          total_levels?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rapor_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          active_role_slug: string | null
          avatar_url: string | null
          created_at: string | null
          email: string | null
          google_sub: string | null
          has_cocoklogiku: boolean | null
          has_jalan_id: boolean | null
          id: string
          name: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          active_role_slug?: string | null
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          google_sub?: string | null
          has_cocoklogiku?: boolean | null
          has_jalan_id?: boolean | null
          id: string
          name?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          active_role_slug?: string | null
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          google_sub?: string | null
          has_cocoklogiku?: boolean | null
          has_jalan_id?: boolean | null
          id?: string
          name?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

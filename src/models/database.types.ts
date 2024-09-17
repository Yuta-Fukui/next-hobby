export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      AuditLog: {
        Row: {
          actionType: string
          createdAt: string
          description: string | null
          id: number
          targetId: number | null
          userId: number
        }
        Insert: {
          actionType: string
          createdAt?: string
          description?: string | null
          id?: number
          targetId?: number | null
          userId: number
        }
        Update: {
          actionType?: string
          createdAt?: string
          description?: string | null
          id?: number
          targetId?: number | null
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "AuditLog_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Report: {
        Row: {
          createdAt: string
          data: Json
          id: number
          reportType: string
          userId: number
        }
        Insert: {
          createdAt?: string
          data: Json
          id?: number
          reportType: string
          userId: number
        }
        Update: {
          createdAt?: string
          data?: Json
          id?: number
          reportType?: string
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "Report_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Session: {
        Row: {
          createdAt: string
          expiresAt: string
          id: number
          token: string
          userId: number
        }
        Insert: {
          createdAt?: string
          expiresAt: string
          id?: number
          token: string
          userId: number
        }
        Update: {
          createdAt?: string
          expiresAt?: string
          id?: number
          token?: string
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "Session_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Task: {
        Row: {
          createdAt: string
          description: string | null
          dueDate: string | null
          id: number
          status: Database["public"]["Enums"]["TaskStatus"]
          title: string
          updatedAt: string
          userId: number
        }
        Insert: {
          createdAt?: string
          description?: string | null
          dueDate?: string | null
          id?: number
          status?: Database["public"]["Enums"]["TaskStatus"]
          title: string
          updatedAt: string
          userId: number
        }
        Update: {
          createdAt?: string
          description?: string | null
          dueDate?: string | null
          id?: number
          status?: Database["public"]["Enums"]["TaskStatus"]
          title?: string
          updatedAt?: string
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "Task_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      User: {
        Row: {
          createdAt: string
          email: string
          id: number
          password: string
          updatedAt: string
          username: string
        }
        Insert: {
          createdAt?: string
          email: string
          id?: number
          password: string
          updatedAt: string
          username: string
        }
        Update: {
          createdAt?: string
          email?: string
          id?: number
          password?: string
          updatedAt?: string
          username?: string
        }
        Relationships: []
      }
      UserActivity: {
        Row: {
          activityType: string
          createdAt: string
          description: string | null
          id: number
          userId: number
        }
        Insert: {
          activityType: string
          createdAt?: string
          description?: string | null
          id?: number
          userId: number
        }
        Update: {
          activityType?: string
          createdAt?: string
          description?: string | null
          id?: number
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "UserActivity_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      TaskStatus: "pending" | "in_progress" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

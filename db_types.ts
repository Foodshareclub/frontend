export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      address: {
        Row: {
          address_line_1: string
          address_line_2: string
          address_line_3: string
          city: string
          country: string
          county: string
          postal_code: string
          profile_id: string
          region: string
        }
        Insert: {
          address_line_1?: string
          address_line_2?: string
          address_line_3?: string
          city?: string
          country?: string
          county?: string
          postal_code?: string
          profile_id: string
          region?: string
        }
        Update: {
          address_line_1?: string
          address_line_2?: string
          address_line_3?: string
          city?: string
          country?: string
          county?: string
          postal_code?: string
          profile_id?: string
          region?: string
        }
      }
      admin: {
        Row: {
          created_at: string
          is_admin: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          is_admin: boolean
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          is_admin?: boolean
          updated_at?: string
          user_id?: string
        }
      }
      challenges: {
        Row: {
          challenge_action: string
          challenge_created_at: string
          challenge_description: string
          challenge_difficulty: string
          challenge_image: string
          challenge_name: string
          challenge_post_likes: number
          challenge_score: number
          challenge_views: number
          challenged_people: number
          id: number
          user_id: string
          users_accepted_challenge: string[]
          users_completed_challenge: string[]
          users_liked_challenge: string[]
          users_rejected_challenge: string[]
        }
        Insert: {
          challenge_action?: string
          challenge_created_at?: string
          challenge_description?: string
          challenge_difficulty?: string
          challenge_image?: string
          challenge_name?: string
          challenge_post_likes?: number
          challenge_score?: number
          challenge_views?: number
          challenged_people?: number
          id?: number
          user_id: string
          users_accepted_challenge?: string[]
          users_completed_challenge?: string[]
          users_liked_challenge?: string[]
          users_rejected_challenge?: string[]
        }
        Update: {
          challenge_action?: string
          challenge_created_at?: string
          challenge_description?: string
          challenge_difficulty?: string
          challenge_image?: string
          challenge_name?: string
          challenge_post_likes?: number
          challenge_score?: number
          challenge_views?: number
          challenged_people?: number
          id?: number
          user_id?: string
          users_accepted_challenge?: string[]
          users_completed_challenge?: string[]
          users_liked_challenge?: string[]
          users_rejected_challenge?: string[]
        }
      }
      comments: {
        Row: {
          comment: string | null
          comment_created_at: string
          forum_id: number | null
          id: number
          user_id: string
        }
        Insert: {
          comment?: string | null
          comment_created_at?: string
          forum_id?: number | null
          id?: number
          user_id: string
        }
        Update: {
          comment?: string | null
          comment_created_at?: string
          forum_id?: number | null
          id?: number
          user_id?: string
        }
      }
      ff_push_notifications: {
        Row: {
          batch_index: number | null
          error: string | null
          firestore_id: string | null
          id: number
          initial_page_name: string | null
          notification_image_url: string | null
          notification_sound: string | null
          notification_text: string | null
          notification_title: string | null
          num_batches: number | null
          num_sent: number | null
          parameter_data: string | null
          status: string | null
          target_audience: string | null
          timestamp: Json | null
          user: string
          user_refs: string | null
        }
        Insert: {
          batch_index?: number | null
          error?: string | null
          firestore_id?: string | null
          id?: number
          initial_page_name?: string | null
          notification_image_url?: string | null
          notification_sound?: string | null
          notification_text?: string | null
          notification_title?: string | null
          num_batches?: number | null
          num_sent?: number | null
          parameter_data?: string | null
          status?: string | null
          target_audience?: string | null
          timestamp?: Json | null
          user: string
          user_refs?: string | null
        }
        Update: {
          batch_index?: number | null
          error?: string | null
          firestore_id?: string | null
          id?: number
          initial_page_name?: string | null
          notification_image_url?: string | null
          notification_sound?: string | null
          notification_text?: string | null
          notification_title?: string | null
          num_batches?: number | null
          num_sent?: number | null
          parameter_data?: string | null
          status?: string | null
          target_audience?: string | null
          timestamp?: Json | null
          user?: string
          user_refs?: string | null
        }
      }
      forum: {
        Row: {
          forum_comments_counter: number | null
          forum_like_counter: number | null
          forum_post_created_at: Json | null
          forum_post_description: string | null
          forum_post_image: string | null
          forum_post_name: string | null
          id: number
          user: string | null
        }
        Insert: {
          forum_comments_counter?: number | null
          forum_like_counter?: number | null
          forum_post_created_at?: Json | null
          forum_post_description?: string | null
          forum_post_image?: string | null
          forum_post_name?: string | null
          id?: number
          user?: string | null
        }
        Update: {
          forum_comments_counter?: number | null
          forum_like_counter?: number | null
          forum_post_created_at?: Json | null
          forum_post_description?: string | null
          forum_post_image?: string | null
          forum_post_name?: string | null
          id?: number
          user?: string | null
        }
      }
      handlers: {
        Row: {
          handler_name: string | null
          handlers_description: string | null
          icon_image: string | null
          id: number
          qr_code: string | null
          user: string
        }
        Insert: {
          handler_name?: string | null
          handlers_description?: string | null
          icon_image?: string | null
          id?: number
          qr_code?: string | null
          user: string
        }
        Update: {
          handler_name?: string | null
          handlers_description?: string | null
          icon_image?: string | null
          id?: number
          qr_code?: string | null
          user?: string
        }
      }
      languages: {
        Row: {
          country_flag: Json | null
          flag_url: string | null
          flagCode: string | null
          id: number
          language: string | null
          languageCode: string | null
        }
        Insert: {
          country_flag?: Json | null
          flag_url?: string | null
          flagCode?: string | null
          id?: number
          language?: string | null
          languageCode?: string | null
        }
        Update: {
          country_flag?: Json | null
          flag_url?: string | null
          flagCode?: string | null
          id?: number
          language?: string | null
          languageCode?: string | null
        }
      }
      legal: {
        Row: {
          covid19: string | null
          id: number
        }
        Insert: {
          covid19?: string | null
          id?: number
        }
        Update: {
          covid19?: string | null
          id?: number
        }
      }
      posts: {
        Row: {
          created_at: string | null
          gif_url: string
          gif_url_2: string | null
          gif_url_3: string | null
          id: number
          locations: Json
          pickup_time: string
          post_address: string
          post_arranged_to: string | null
          post_description: string
          post_like_counter: number
          post_metro_station: string | null
          post_name: string | null
          post_published: boolean | null
          post_type: string
          post_views: number
          updated_at: string | null
          user: string | null
        }
        Insert: {
          created_at?: string | null
          gif_url?: string
          gif_url_2?: string | null
          gif_url_3?: string | null
          id?: number
          locations?: Json
          pickup_time?: string
          post_address?: string
          post_arranged_to?: string | null
          post_description?: string
          post_like_counter?: number
          post_metro_station?: string | null
          post_name?: string | null
          post_published?: boolean | null
          post_type?: string
          post_views?: number
          updated_at?: string | null
          user?: string | null
        }
        Update: {
          created_at?: string | null
          gif_url?: string
          gif_url_2?: string | null
          gif_url_3?: string | null
          id?: number
          locations?: Json
          pickup_time?: string
          post_address?: string
          post_arranged_to?: string | null
          post_description?: string
          post_like_counter?: number
          post_metro_station?: string | null
          post_name?: string | null
          post_published?: boolean | null
          post_type?: string
          post_views?: number
          updated_at?: string | null
          user?: string | null
        }
      }
      profiles: {
        Row: {
          about_me: string | null
          avatar_url: string | null
          birth_date: string | null
          created_time: string | null
          email: string | null
          firestore_id: string | null
          first_name: string | null
          id: string
          liked_forum_posts: Json[]
          liked_posts: Json[]
          phone_number: string | null
          roles: string[]
          second_name: string | null
          updated_at: string | null
          user_address: string | null
          user_addresss: number | null
          user_location: string | null
          user_metro_station: string | null
          username: string | null
        }
        Insert: {
          about_me?: string | null
          avatar_url?: string | null
          birth_date?: string | null
          created_time?: string | null
          email?: string | null
          firestore_id?: string | null
          first_name?: string | null
          id: string
          liked_forum_posts?: Json[]
          liked_posts?: Json[]
          phone_number?: string | null
          roles?: string[]
          second_name?: string | null
          updated_at?: string | null
          user_address?: string | null
          user_addresss?: number | null
          user_location?: string | null
          user_metro_station?: string | null
          username?: string | null
        }
        Update: {
          about_me?: string | null
          avatar_url?: string | null
          birth_date?: string | null
          created_time?: string | null
          email?: string | null
          firestore_id?: string | null
          first_name?: string | null
          id?: string
          liked_forum_posts?: Json[]
          liked_posts?: Json[]
          phone_number?: string | null
          roles?: string[]
          second_name?: string | null
          updated_at?: string | null
          user_address?: string | null
          user_addresss?: number | null
          user_location?: string | null
          user_metro_station?: string | null
          username?: string | null
        }
      }
      reviews: {
        Row: {
          id: number
          review_counter: number
          review_posts: Json
          reviews_rating: number
          user: string | null
        }
        Insert: {
          id?: number
          review_counter?: number
          review_posts?: Json
          reviews_rating?: number
          user?: string | null
        }
        Update: {
          id?: number
          review_counter?: number
          review_posts?: Json
          reviews_rating?: number
          user?: string | null
        }
      }
      room_participants: {
        Row: {
          id: number
          image: string | null
          profile_id: string | null
          room_id: number
          text: string | null
          timestamp: string | null
        }
        Insert: {
          id?: number
          image?: string | null
          profile_id?: string | null
          room_id: number
          text?: string | null
          timestamp?: string | null
        }
        Update: {
          id?: number
          image?: string | null
          profile_id?: string | null
          room_id?: number
          text?: string | null
          timestamp?: string | null
        }
      }
      rooms: {
        Row: {
          id: number
          last_message: string | null
          last_message_seen_by: string
          last_message_sent_by: string
          last_message_time: string
          post_id: number
          user_a: string
          user_b: string
        }
        Insert: {
          id: number
          last_message?: string | null
          last_message_seen_by: string
          last_message_sent_by?: string
          last_message_time?: string
          post_id: number
          user_a: string
          user_b: string
        }
        Update: {
          id?: number
          last_message?: string | null
          last_message_seen_by?: string
          last_message_sent_by?: string
          last_message_time?: string
          post_id?: number
          user_a?: string
          user_b?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_room_participant: {
        Args: { room_id: number; profile_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export interface Database {
  public: {
    Tables: {
      shipments: {
        Row: {
          id: string;
          tracking_id: string;
          sender_name: string;
          sender_country: string;
          recipient_name: string;
          recipient_country: string;
          recipient_email: string;
          service_type: string;
          weight_kg: number | null;
          description: string | null;
          current_status: string;
          current_location: string | null;
          current_lat: number | null;
          current_lng: number | null;
          estimated_delivery: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["shipments"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["shipments"]["Row"]>;
        Relationships: [];
      };
      status_logs: {
        Row: {
          id: string;
          shipment_id: string;
          status: string;
          location_name: string;
          lat: number | null;
          lng: number | null;
          note: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["status_logs"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["status_logs"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "status_logs_shipment_id_fkey";
            columns: ["shipment_id"];
            referencedRelation: "shipments";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

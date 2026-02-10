export interface Waiting {
  id: number;
  name : string;
  phone : string;
  customer_id: number;
  status: "WAITING" | "IN_PROGRESS" | "DONE" | "CANCEL" | "NO_SHOW"; // enum 느낌
  queue_order: number;
  estimated_minutes: number;
  started_at : Date;
}

export interface WaitingListResponse {
  success: boolean;
  data: {
    items: Waiting[];
    page: number;
    size: number;
    total: number;
    total_pages: number;
  };
  message: string;
}
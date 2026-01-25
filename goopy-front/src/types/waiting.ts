export interface Waiting {
  id: number;
  name : string;
  phone : string;
  customer_id: number;
  status: "WAITING" | "IN_PROGRESS" | "DONE"; // enum 느낌
  queue_order: number;
  estimated_minutes: number;
}
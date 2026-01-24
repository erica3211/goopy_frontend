import { api } from "./axios";
import type { Waiting } from "../types/waiting";

interface WaitingListResponse {
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

export const getWaitingList = async (): Promise<WaitingListResponse> => {
  const res = await api.get("/waitings");
  return res.data;
};

export const createWaiting = async (data: {
  name: string;
  phone: string;
}) => {
  return api.post("/waiting", data);
};


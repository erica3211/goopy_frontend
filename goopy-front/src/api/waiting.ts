import { api } from "./axios";
import type { Waiting } from "../types/waiting";

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

export const getWaitingList = async (params?: {
  status?: "WAITING" | "IN_PROGRESS";
  page?: number;
  size?: number;
}): Promise<WaitingListResponse> => {
  const res = await api.get("/waitings", {
    params: {
      status: params?.status ?? "WAITING",
      page: params?.page ?? 1,
      size: params?.size ?? 10,
    },
  });

  return res.data;
};
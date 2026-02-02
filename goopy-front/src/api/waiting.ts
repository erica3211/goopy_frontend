import { api } from "./axios";
import type { Waiting, WaitingListResponse } from "../types/waiting";

export const getWaitingList = async (params?: {
  status?: "WAITING" | "IN_PROGRESS";
  page?: number;
  size?: number;
}): Promise<WaitingListResponse> => {
  const res = await api.get("/waitings/list", {
    params: {
      status: params?.status ?? "WAITING",
      page: params?.page ?? 1,
      size: params?.size ?? 10,
    },
  });

  return res.data;
};

interface CreateWaitingRequest {
  customer_id: number;
  estimated_minutes: number;
}

interface CreateWaitingResponse {
  success: boolean;
  data: null;
  message: string;
}

export const createWaiting = async (
  data: CreateWaitingRequest
): Promise<CreateWaitingResponse> => {
  const res = await api.post(
    "/waitings/create",
    null,
    {
      params: {
        customer_id: data.customer_id,
        estimated_minutes: data.estimated_minutes,
      },
    }
  );

  return res.data;
};
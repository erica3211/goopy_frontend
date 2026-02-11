import { api } from "./axios";
import type { Waiting, WaitingListResponse, WaitingStatus } from "../types/waiting";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const getWaitingList = async (params?: {
  status?: WaitingStatus;
  page?: number;
  size?: number;
}): Promise<WaitingListResponse> => {
  const res = await api.get("/get_waiting_list", {
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

interface UpdateWaitingRequest {
  waiting_id : number;
  estimated_minutes ?: number;
  status : "WAITING" | "IN_PROGRESS" | "DONE" | "CANCEL" | "NO_SHOW"
}

export const createWaiting = async (
  data: CreateWaitingRequest
): Promise<CreateWaitingResponse> => {
  const res = await api.post(
    "/create_waiting",
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

export const updateWaiting = async(
  data: UpdateWaitingRequest):
  Promise<UpdateWaitingRequest> =>{
    const res = await api.put(`/update_waiting/${data.waiting_id}`, null, {params:{estimated_minutes: data.estimated_minutes, status: data.status}})
    return res.data;
  }
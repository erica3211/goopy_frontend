import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWaitingList, updateWaiting } from "../api/waiting";
import type { WaitingStatus } from "../types/waiting";


export const useWaitingList = (status?: WaitingStatus) =>
  useQuery({
    queryKey: ["waitingList", status],
    queryFn: () => getWaitingList({ status }),
  });

export const useUpdateWaiting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateWaiting,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["waitingList"], 
      });
    },
  });
};
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWaitingList, createWaiting } from "../api/waiting";

export const useWaitingList = () => {
  return useQuery({
    queryKey: ["waitingList"],
    queryFn: getWaitingList,
    select: (res) => res.data.items, 
  });
};

export const useCreateWaiting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWaiting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["waitingList"] });
    },
  });
};
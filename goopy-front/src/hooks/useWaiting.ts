import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWaitingList } from "../api/waiting";

export const useWaitingList = () => {
  return useQuery({
    queryKey: ["waitingList"],
    queryFn: () => getWaitingList({ status: "WAITING" }),
  });
};
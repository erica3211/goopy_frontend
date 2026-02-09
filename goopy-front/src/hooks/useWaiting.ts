import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWaitingList } from "../api/waiting";

type WaitingStatus = "WAITING" | "IN_PROGRESS";

export const useWaitingList = (status?: WaitingStatus) =>
  useQuery({
    queryKey: ["waitingList", status],
    queryFn: () => getWaitingList({ status }),
  });
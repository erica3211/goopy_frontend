import { api } from "./axios";
import type { Customer } from "../types/customers";

/**
 * 전화번호로 고객 조회
 */
export const getCustomerByPhone = async (
  phone: string
): Promise<Customer | null> => {
  try {
    const res = await api.get("/get_customer/by-phone", {
      params: { phone },
    });

    console.log("res", res);
    // ApiResponse<Customer> 형태라고 가정
    return res.data.data;
  } catch (e: any) {
    // 404 → 고객 없음
    if (e.response?.status === 404) {
      return null;
    }
    throw e;
  }
};

export const createCustomer = async (
  name: string,
  phone: string
): Promise<Customer> => {
  const res = await api.post("/create_customer", { name, phone },
  );

  console.log("res", res);
  return res.data.data;
};
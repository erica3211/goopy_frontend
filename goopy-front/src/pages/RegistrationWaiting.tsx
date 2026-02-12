import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomerByPhone, createCustomer } from "../api/customers";
import { createWaiting } from "../api/waiting";
import "../styles/RegistrationWaiting.css";
import "../styles/Common.css";
import CommonModal from "../components/modal/CommonModal";

export default function RegistrationWaiting() {
  const [commonModal, setCommonModal] = useState<{
    type: "ALERT" | "CONFIRM";
    message: string;
    onConfirm?: () => void;
  } | null>(null);

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"PHONE" | "NAME">("PHONE");

  const formatPhoneNumber = (value: string) => {
    const numbersOnly = value.replace(/\D/g, "");

    if (numbersOnly.length <= 3) {
      return numbersOnly;
    }
    if (numbersOnly.length <= 7) {
      return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
    }
    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(
      3,
      7
    )}-${numbersOnly.slice(7, 11)}`;
  };

  const registerWaiting = async (customerId: number, name: string) => {
    await createWaiting({
      customer_id: customerId,
      estimated_minutes: 15,
    });

    setCommonModal({ type: "ALERT", message: `${name} 님 고객 등록 완료!`, onConfirm: () => () => navigate("/") });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (step === "PHONE") {
        const onlyNumber = phone.replace(/\D/g, "");

        if (!onlyNumber) {
          setCommonModal({ type: "ALERT", message: "전화번호를 입력해주세요." });
          return;
        }

        if (onlyNumber.length !== 11) {
          setCommonModal({ type: "ALERT", message: "전화번호를 정확히 입력해주세요." });
          return;
        }
        const normalizedPhone = phone.replace(/-/g, "");
        const customer = await getCustomerByPhone(normalizedPhone);

        if (!customer) {
          setCommonModal({ type: "ALERT", message: "등록된 고객이 없습니다. 성함을 입력해주세요." });
          setStep("NAME");
          return;
        }
        setCommonModal({
          type: "CONFIRM", message: `${customer.name} 님으로 웨이팅 등록할까요?`, onConfirm: () => async () => {
            console.log("customer", customer);
            await registerWaiting(customer.id, customer.name)
          }
        });
        return;
      }

      if (step === "NAME") {
        if (!name) {
          setCommonModal({ type: "ALERT", message: "등록된 고객이 없습니다. 성함을 입력해주세요." });
          setStep("NAME");
          return;
        }

        setCommonModal({
          type: "CONFIRM", message: `${name} 님으로 웨이팅 등록할까요?`, onConfirm: () => async () => {
            const newCustomer = await createCustomer(name, phone);
            await registerWaiting(newCustomer.id, newCustomer.name)
          }
        });
        return;
      }
    } catch (e) {
      setCommonModal({ type: "ALERT", message: "처리 중 오류가 발생했습니다." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="waiting-register-page">
        <div className="waiting-card">
          <h1 className="title">웨이팅 등록</h1>

          <div className="form-group">
            <label>{step === "PHONE" ? "전화번호" : "이름"}</label>
            <input
              type={step === "PHONE" ? "tel" : "text"}
              placeholder={
                step === "PHONE"
                  ? "010-1234-5678"
                  : "성함을 입력해주세요"
              }

              value={step === "PHONE" ? phone : name}
              onChange={(e) => {
                if (step === "PHONE") {
                  const formatted = formatPhoneNumber(e.target.value);
                  setPhone(formatted);
                } else {
                  setName(e.target.value);
                }
              }}

            />
          </div>
          <div className="button-row">
            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "등록 중..." : "웨이팅 등록"}
            </button>

            <button
              className="back-button"
              onClick={() => navigate("/")}
              disabled={loading}
            >
              홈으로
            </button>
          </div>
        </div>
      </div>

      {commonModal?.type && (
        <CommonModal
          type={commonModal.type}
          message={commonModal.message}
          onConfirm={commonModal.onConfirm}
          onClose={() => {
            setCommonModal(null)
          }}
        />
      )}
    </>
  );
}
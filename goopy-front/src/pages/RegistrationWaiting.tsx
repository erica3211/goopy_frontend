import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomerByPhone, createCustomer } from "../api/customers";
import { createWaiting } from "../api/waiting";
import "../styles/RegistrationWaiting.css";
import "../styles/Common.css";
import "../styles/CommonModal.css";
import CommonModal from "../components/modal/CommonModal";

export default function RegistrationWaiting() {
  type ModalType = "ALERT" | "CONFIRM" | null;
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalMessage, setModalMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"PHONE" | "NAME">("PHONE");

  const registerWaiting = async (customerId: number, name: string) => {
    await createWaiting({
      customer_id: customerId,
      estimated_minutes: 15,
    });

    setModalType("ALERT");
    setModalMessage(`${name} 님 고객 등록 완료!`);
    setOnConfirm(() => () => navigate("/"));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (step === "PHONE") {
        if (!phone) {
          setModalType("ALERT");
          setModalMessage("전화번호를 입력해주세요.");
          return;
        }

        const customer = await getCustomerByPhone(phone);

        if (!customer) {
          setModalType("ALERT");
          setModalMessage("등록된 고객이 없습니다. 성함을 입력해주세요.");
          setStep("NAME");
          return;
        }

        setModalType("CONFIRM");
        setModalMessage(`${customer.name} 님으로 웨이팅 등록할까요?`);
        console.log("modal open");
        setOnConfirm(() => async () => {
          await registerWaiting(customer.id, customer.name);
        });

        return;
      }

      if (step === "NAME") {
        if (!name) {
          setModalType("ALERT");
          setModalMessage("등록된 고객이 없습니다. 성함을 입력해주세요.");
          setStep("NAME");
          return;
        }

        const newCustomer = await createCustomer(name, phone);
        await registerWaiting(newCustomer.id, newCustomer.name);
        return;
      }
    } catch (e) {
      setModalType("ALERT");
      setModalMessage("처리 중 오류가 발생했어요 😢");
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
              onChange={(e) =>
                step === "PHONE"
                  ? setPhone(e.target.value)
                  : setName(e.target.value)
              }
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

      {modalType && (
        <CommonModal
          type={modalType}
          message={modalMessage}
          onConfirm={onConfirm ?? undefined}
          onClose={() => {
            setModalType(null);
            setOnConfirm(null);
          }}
        />
      )}
    </>
  );
}
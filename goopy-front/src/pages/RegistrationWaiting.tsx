import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomerByPhone, createCustomer } from "../api/customers";
import { createWaiting } from "../api/waiting";
import "../styles/RegistrationWaiting.css";
import "../styles/common.css";

export default function RegistrationWaiting() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"PHONE" | "NAME">("PHONE");

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (step === "PHONE") {
        if (!phone) {
          alert("전화번호를 입력해주세요.");
          return;
        }

        const customer = await getCustomerByPhone(phone);

        if (!customer) {
          alert("등록된 고객이 없습니다. 성함을 입력해주세요.");
          setStep("NAME");
          return;
        }

        const ok = window.confirm(
          `${customer.name} 님으로 웨이팅 등록할까요?`
        );
        if (!ok) return;

        await createWaiting({
          customer_id: customer.id,
          estimated_minutes: 15,
        });

        alert("웨이팅 등록 완료!");
        navigate("/");
        return;
      }

      if (step === "NAME") {
        if (!name) {
          alert("성함을 입력해주세요.");
          return;
        }

        // 👉 여기서 고객 생성 API 호출하면 됨
        const newCustomer = await createCustomer(name, phone);

        await createWaiting({
          customer_id: newCustomer.id,
          estimated_minutes: 15,
        });

        alert(`${name} 님 고객 등록 완료!`);
        navigate("/");
        return;
      }
    } catch (e) {
      alert("처리 중 오류가 발생했어요 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
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

        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "등록 중..." : "웨이팅 등록하기"}
        </button>
      </div>
    </div>
  );
}
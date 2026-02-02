import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomerByPhone } from "../api/customers";
import { createWaiting } from "../api/waiting";
import "../styles/RegistrationWaiting.css";
import "../styles/common.css";

export default function RegistrationWaiting() {
  const navigate = useNavigate();
  // const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  if (!phone) {
    alert("전화번호를 입력해주세요.");
    return;
  }

  setLoading(true);

  try {
    // 고객 조회
    const customer = await getCustomerByPhone(phone);

    if (!customer) {
      alert("등록된 고객이 없습니다. 먼저 고객을 등록해주세요.");
      return;
    }

    // 확인 모달
    const ok = window.confirm(
      `${customer.name} 님으로 웨이팅 등록할까요?`
    );

    // 취소
    if (!ok) return;

    // 웨이팅 등록
    const res = await createWaiting({
      customer_id: customer.id,
      estimated_minutes: 15,
    });

    if (!res.success) {
      alert(res.message ?? "웨이팅 등록에 실패했어요 😢");
      return;
    }

    alert("웨이팅 등록 완료!");
    navigate("/waiting/list");

  } catch (e) {
    console.error(e);
    alert("웨이팅 등록 중 오류가 발생했어요 😢");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="waiting-register-page">
      <div className="waiting-card">
        <h1 className="title">웨이팅 등록</h1>

        <div className="form-group">
          <label>전화번호</label>
          <input
            type="tel"
            placeholder="010-1234-5678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
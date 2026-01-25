import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createWaiting } from "../api/waiting";
import "../styles/RegistrationWaiting.css";
import "../styles/common.css";

export default function RegistrationWaiting() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !phone) {
      alert("이름과 전화번호를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      await createWaiting({ name, phone });
      alert("웨이팅 등록 완료!");
      navigate("/waiting"); // 웨이팅 현황 페이지로 이동
    } catch (e) {
      alert("웨이팅 등록에 실패했어요 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="waiting-register-page">
      <div className="waiting-card">
        <h1 className="title">웨이팅 등록</h1>

        <div className="form-group">
          <label>이름</label>
          <input
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
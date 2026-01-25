import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import "../styles/common.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">구피샵 웨이팅</h1>

        <div className="home-buttons">
          <button
            className="btn-primary"
            onClick={() => navigate("/waiting/create")}
          >
            웨이팅 등록하기
          </button>

          <button
            className="btn-outline"
            onClick={() => navigate("/waiting/list")}
          >
            웨이팅 현황 보기
          </button>
        </div>

        <p className="home-footer">
          카카오톡으로 차례를 알려드려요 📩
        </p>
      </div>
    </div>
  );
}
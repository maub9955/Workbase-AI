"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

type ShareModalProps = {
  token: string;
  pageId: string;
  onClose: () => void;
};

export function ShareModal({ token, pageId, onClose }: ShareModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"invite" | "link">("invite");

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus("이메일을 입력해주세요.");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/pages/${pageId}/collaborators`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-token": token
        },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        setStatus(`${email} 님을 초대했습니다. 초대된 사용자는 회원가입 후 이 페이지에 접근할 수 있습니다.\n\n참고: 실제 이메일 전송 기능은 아직 구현되지 않았습니다. 서버 콘솔에 이메일 내용이 출력됩니다.`);
        setEmail("");
      } else {
        const error = await res.json().catch(() => ({ message: "초대에 실패했습니다." }));
        setStatus(error.message ?? "초대에 실패했습니다.");
      }
    } catch (error) {
      setStatus("에러가 발생했습니다.");
    }
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/workspace?page=${pageId}`;
    navigator.clipboard.writeText(link).then(() => {
      setStatus("링크가 클립보드에 복사되었습니다.");
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "500px" }}>
        <h2>페이지 공유</h2>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", borderBottom: "1px solid #eee" }}>
          <button
            type="button"
            onClick={() => setActiveTab("invite")}
            style={{
              padding: "0.5rem 1rem",
              border: "none",
              background: activeTab === "invite" ? "#f0f0f0" : "transparent",
              cursor: "pointer"
            }}
          >
            이메일 초대
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("link")}
            style={{
              padding: "0.5rem 1rem",
              border: "none",
              background: activeTab === "link" ? "#f0f0f0" : "transparent",
              cursor: "pointer"
            }}
          >
            링크 공유
          </button>
        </div>

        {activeTab === "invite" && (
          <div>
            <p style={{ marginBottom: "1rem", color: "#666", fontSize: "0.9rem" }}>
              회원가입된 사용자의 이메일을 입력하세요. 해당 사용자가 이 페이지에 접근할 수 있습니다.
            </p>
            <form onSubmit={handleInvite}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
                required
                style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
              />
              <button type="submit" className="button primary" style={{ width: "100%" }}>
                초대하기
              </button>
            </form>
          </div>
        )}

        {activeTab === "link" && (
          <div>
            <p style={{ marginBottom: "1rem", color: "#666", fontSize: "0.9rem" }}>
              링크를 공유하면 해당 링크를 가진 사용자가 회원가입 후 이 페이지에 접근할 수 있습니다.
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="text"
                value={`${window.location.origin}/workspace?page=${pageId}`}
                readOnly
                style={{ flex: 1, padding: "0.5rem" }}
              />
              <button onClick={handleCopyLink} className="button primary">
                복사
              </button>
            </div>
          </div>
        )}

        {status && (
          <p className="status" style={{ 
            marginTop: "1rem", 
            padding: "0.5rem", 
            background: "#f0f0f0", 
            borderRadius: "4px",
            whiteSpace: "pre-line"
          }}>
            {status}
          </p>
        )}
        <button onClick={onClose} className="button secondary" style={{ marginTop: "1rem", width: "100%" }}>
          닫기
        </button>
      </div>
    </div>
  );
}

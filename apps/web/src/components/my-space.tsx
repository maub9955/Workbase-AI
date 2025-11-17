"use client";

import { useCallback, useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

type User = {
  id: string;
  email: string;
  name: string;
  personalPageId: string;
};

type Page = {
  id: string;
  title: string;
  ownerId: string;
  collaborators: string[];
  entries: { id: string; authorId: string; content: string; createdAt: string }[];
};

export function MySpace() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState<Page | null>(null);
  const [authMode, setAuthMode] = useState<"signup" | "login">("signup");
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
  const [entryContent, setEntryContent] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleAuthChange = (field: keyof typeof authForm, value: string) => {
    setAuthForm((prev) => ({ ...prev, [field]: value }));
  };

  const loadPage = useCallback(
    async (tokenValue: string) => {
      const res = await fetch(`${API_URL}/pages/me`, {
        headers: {
          "x-user-token": tokenValue
        }
      });

      if (!res.ok) {
        throw new Error("개인 페이지를 불러오지 못했습니다.");
      }

      const data = (await res.json()) as Page;
      setPage(data);
    },
    []
  );

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("회원가입 중...");
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authForm)
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({ message: "회원가입에 실패했습니다." }));
        throw new Error(error.message ?? "회원가입에 실패했습니다.");
      }

      const data = await res.json();
      localStorage.setItem("auth_token", data.token);
      setToken(data.token);
      setUser(data.user);
      setStatus("워크스페이스로 이동합니다...");
      setTimeout(() => {
        window.location.href = "/workspace";
      }, 500);
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        setStatus("API 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.");
      } else {
        setStatus(error instanceof Error ? error.message : "에러가 발생했습니다.");
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("로그인 중...");
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: authForm.email, password: authForm.password })
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({ message: "로그인에 실패했습니다." }));
        throw new Error(error.message ?? "로그인에 실패했습니다.");
      }

      const data = await res.json();
      localStorage.setItem("auth_token", data.token);
      setToken(data.token);
      setUser(data.user);
      setStatus("워크스페이스로 이동합니다...");
      setTimeout(() => {
        window.location.href = "/workspace";
      }, 500);
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        setStatus("API 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.");
      } else {
        setStatus(error instanceof Error ? error.message : "에러가 발생했습니다.");
      }
    }
  };

  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !page) return;

    const res = await fetch(`${API_URL}/pages/${page.id}/entries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-token": token
      },
      body: JSON.stringify({ content: entryContent })
    });

    if (!res.ok) {
      setStatus("글 작성에 실패했습니다.");
      return;
    }

    const newEntry = await res.json();
    setPage({ ...page, entries: [newEntry, ...page.entries] });
    setEntryContent("");
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !page) return;

    const res = await fetch(`${API_URL}/pages/${page.id}/collaborators`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-token": token
      },
      body: JSON.stringify({ email: inviteEmail })
    });

    if (res.ok) {
      setStatus(`${inviteEmail} 님에게 권한을 부여했습니다.`);
      setInviteEmail("");
    } else {
      const error = await res.json().catch(() => ({ message: "초대에 실패했습니다." }));
      setStatus(error.message ?? "초대에 실패했습니다.");
    }
  };

  useEffect(() => {
    setStatus(null);
  }, [authMode]);

  return (
    <div className="myspace">
      <header>
        <h1>나만의 개인 페이지</h1>
        <p>회원가입만 하면 즉시 개인 워크스페이스가 생성되고, 동료를 초대해 함께 글을 작성할 수 있어요.</p>
      </header>

      {!token && (
        <section className="auth-card">
          <div className="auth-tabs">
            <button
              className={authMode === "signup" ? "active" : ""}
              onClick={() => setAuthMode("signup")}
            >
              회원가입
            </button>
            <button className={authMode === "login" ? "active" : ""} onClick={() => setAuthMode("login")}>
              로그인
            </button>
          </div>

          <form onSubmit={authMode === "signup" ? handleSignup : handleLogin}>
            {authMode === "signup" && (
              <label>
                이름
                <input
                  type="text"
                  value={authForm.name}
                  onChange={(e) => handleAuthChange("name", e.target.value)}
                  required
                />
              </label>
            )}

            <label>
              이메일
              <input
                type="email"
                value={authForm.email}
                onChange={(e) => handleAuthChange("email", e.target.value)}
                required
              />
            </label>

            <label>
              비밀번호
              <input
                type="password"
                value={authForm.password}
                onChange={(e) => handleAuthChange("password", e.target.value)}
                required
                minLength={6}
              />
            </label>

            <button type="submit" className="button primary">
              {authMode === "signup" ? "회원가입" : "로그인"}
            </button>
          </form>
        </section>
      )}

      {status && (
        <p className="status" style={{ 
          padding: "0.75rem 1rem", 
          margin: "1rem 0", 
          background: status.includes("실패") || status.includes("연결") ? "#ffebee" : "#e8f5e9",
          color: status.includes("실패") || status.includes("연결") ? "#c62828" : "#2e7d32",
          borderRadius: "4px",
          border: `1px solid ${status.includes("실패") || status.includes("연결") ? "#ef5350" : "#66bb6a"}`
        }}>
          {status}
        </p>
      )}

      {token && user && page && (
        <section className="page-panel">
          <div className="page-header">
            <div>
              <h2>{page.title}</h2>
              <p>{user.name}님 전용 공간 · 참여자 {page.collaborators.length}명</p>
            </div>
            <div>
              <a href="/workspace" className="button primary">
                워크스페이스 열기
              </a>
              <button className="button secondary" onClick={() => {
                localStorage.removeItem("auth_token");
                setToken(null);
              }}>
                로그아웃
              </button>
            </div>
          </div>

          <div className="panel-grid">
            <article>
              <h3>새 글 작성</h3>
              <form onSubmit={handleAddEntry} className="entry-form">
                <textarea
                  value={entryContent}
                  onChange={(e) => setEntryContent(e.target.value)}
                  placeholder="오늘의 업무 메모를 남겨보세요"
                  required
                />
                <button type="submit" className="button primary">
                  등록
                </button>
              </form>
            </article>

            <article>
              <h3>동료 초대</h3>
              <form onSubmit={handleInvite} className="invite-form">
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="이메일을 입력하세요"
                  required
                />
                <button type="submit" className="button secondary">
                  권한 부여
                </button>
              </form>
              <p className="helper">동료가 아직 계정이 없으면 먼저 회원가입을 안내해주세요.</p>
            </article>
          </div>

          <article>
            <h3>최근 글</h3>
            <ul className="entries">
              {page.entries.map((entry) => (
                <li key={entry.id}>
                  <p>{entry.content}</p>
                  <span>{new Date(entry.createdAt).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>
      )}
    </div>
  );
}

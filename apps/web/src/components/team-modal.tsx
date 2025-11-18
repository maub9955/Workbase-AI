"use client";

import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

type Team = {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  memberIds: string[];
  createdAt: string;
  updatedAt: string;
};

type TeamModalProps = {
  token: string;
  onClose: () => void;
};

export function TeamModal({ token, onClose }: TeamModalProps) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      const res = await fetch(`${API_URL}/teams`, {
        headers: { "x-user-token": token }
      });
      if (res.ok) {
        const data = await res.json();
        setTeams(data);
      }
    } catch (error) {
      console.error("Failed to load teams", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) {
      setStatus("팀 이름을 입력해주세요.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/teams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-token": token
        },
        body: JSON.stringify({
          name: teamName,
          description: teamDescription || undefined
        })
      });

      if (res.ok) {
        setStatus("팀이 생성되었습니다!");
        setTeamName("");
        setTeamDescription("");
        setShowCreateForm(false);
        loadTeams();
        setTimeout(() => setStatus(null), 2000);
      } else {
        const error = await res.json().catch(() => ({ message: "팀 생성에 실패했습니다." }));
        setStatus(error.message ?? "팀 생성에 실패했습니다.");
      }
    } catch (error) {
      setStatus("에러가 발생했습니다.");
    }
  };

  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeam || !inviteEmail.trim()) {
      setStatus("이메일을 입력해주세요.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/teams/${selectedTeam.id}/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-token": token
        },
        body: JSON.stringify({ email: inviteEmail })
      });

      if (res.ok) {
        setStatus(`${inviteEmail} 님을 팀에 초대했습니다!`);
        setInviteEmail("");
        loadTeams();
        setTimeout(() => setStatus(null), 2000);
      } else {
        const error = await res.json().catch(() => ({ message: "초대에 실패했습니다." }));
        setStatus(error.message ?? "초대에 실패했습니다.");
      }
    } catch (error) {
      setStatus("에러가 발생했습니다.");
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!selectedTeam) return;
    if (!confirm("정말 이 멤버를 팀에서 제거하시겠습니까?")) return;

    try {
      const res = await fetch(`${API_URL}/teams/${selectedTeam.id}/members/${memberId}`, {
        method: "DELETE",
        headers: { "x-user-token": token }
      });

      if (res.ok) {
        setStatus("멤버가 제거되었습니다.");
        loadTeams();
        setTimeout(() => setStatus(null), 2000);
      } else {
        const error = await res.json().catch(() => ({ message: "멤버 제거에 실패했습니다." }));
        setStatus(error.message ?? "멤버 제거에 실패했습니다.");
      }
    } catch (error) {
      setStatus("에러가 발생했습니다.");
    }
  };

  if (loading) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "600px" }}>
          <h2>팀 관리</h2>
          <div style={{ padding: "2rem", textAlign: "center" }}>로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "800px", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ margin: 0 }}>팀 관리</h2>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "#666"
            }}
          >
            ×
          </button>
        </div>

        {status && (
          <div style={{
            padding: "0.75rem 1rem",
            marginBottom: "1rem",
            background: status.includes("실패") || status.includes("에러") ? "#ffebee" : "#e8f5e9",
            borderRadius: "6px",
            color: status.includes("실패") || status.includes("에러") ? "#c62828" : "#2e7d32"
          }}>
            {status}
          </div>
        )}

        <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.1rem" }}>내 팀</h3>
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#0066cc",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.875rem"
                }}
              >
                + 새 팀 만들기
              </button>
            </div>

            {showCreateForm && (
              <form onSubmit={handleCreateTeam} style={{ marginBottom: "1rem", padding: "1rem", background: "#f5f5f5", borderRadius: "6px" }}>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="팀 이름"
                  required
                  style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem", border: "1px solid #ddd", borderRadius: "4px" }}
                />
                <textarea
                  value={teamDescription}
                  onChange={(e) => setTeamDescription(e.target.value)}
                  placeholder="팀 설명 (선택사항)"
                  rows={3}
                  style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem", border: "1px solid #ddd", borderRadius: "4px", resize: "vertical" }}
                />
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button type="submit" style={{ flex: 1, padding: "0.5rem", background: "#0066cc", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                    생성
                  </button>
                  <button type="button" onClick={() => { setShowCreateForm(false); setTeamName(""); setTeamDescription(""); }} style={{ padding: "0.5rem 1rem", background: "#f5f5f5", border: "1px solid #ddd", borderRadius: "4px", cursor: "pointer" }}>
                    취소
                  </button>
                </div>
              </form>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {teams.length === 0 ? (
                <div style={{ padding: "2rem", textAlign: "center", color: "#999" }}>
                  팀이 없습니다. 새 팀을 만들어보세요!
                </div>
              ) : (
                teams.map((team) => (
                  <div
                    key={team.id}
                    onClick={() => setSelectedTeam(team)}
                    style={{
                      padding: "1rem",
                      background: selectedTeam?.id === team.id ? "#e3f2fd" : "white",
                      border: `2px solid ${selectedTeam?.id === team.id ? "#0066cc" : "#e0e0e0"}`,
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>👥 {team.name}</div>
                    {team.description && (
                      <div style={{ fontSize: "0.875rem", color: "#666", marginBottom: "0.5rem" }}>{team.description}</div>
                    )}
                    <div style={{ fontSize: "0.75rem", color: "#999" }}>멤버 {team.memberIds.length}명</div>
                  </div>
                ))
              )}
            </div>
          </div>

          {selectedTeam && (
            <div style={{ flex: 1, borderLeft: "1px solid #e0e0e0", paddingLeft: "1.5rem" }}>
              <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.1rem" }}>팀 멤버</h3>
              
              <form onSubmit={handleInviteMember} style={{ marginBottom: "1rem" }}>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="이메일로 멤버 초대"
                    required
                    style={{ flex: 1, padding: "0.5rem", border: "1px solid #ddd", borderRadius: "4px" }}
                  />
                  <button type="submit" style={{ padding: "0.5rem 1rem", background: "#0066cc", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                    초대
                  </button>
                </div>
              </form>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {selectedTeam.memberIds.map((memberId) => {
                  // 실제로는 사용자 정보를 가져와야 하지만, 여기서는 ID만 표시
                  const isOwner = memberId === selectedTeam.ownerId;
                  return (
                    <div
                      key={memberId}
                      style={{
                        padding: "0.75rem",
                        background: "#f5f5f5",
                        borderRadius: "4px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: "600" }}>{memberId.slice(0, 8)}...</span>
                        {isOwner && <span style={{ marginLeft: "0.5rem", fontSize: "0.75rem", color: "#0066cc" }}>(관리자)</span>}
                      </div>
                      {!isOwner && (
                        <button
                          onClick={() => handleRemoveMember(memberId)}
                          style={{
                            padding: "0.25rem 0.5rem",
                            background: "#ff4444",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "0.75rem"
                          }}
                        >
                          제거
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


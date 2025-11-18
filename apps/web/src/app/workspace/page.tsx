"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "../../components/sidebar";
import { BlockEditor } from "../../components/block-editor";
import { ShareModal } from "../../components/share-modal";
import { TeamModal } from "../../components/team-modal";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

type Page = {
  id: string;
  title: string;
  entries: Array<{ id: string; authorId: string; content: string; createdAt: string }>;
  blockIds: string[];
};

type Block = {
  id: string;
  type: string;
  props: Record<string, unknown>;
  position: number;
};

export default function WorkspacePage() {
  const [token, setToken] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState("");
  const [newPageParentId, setNewPageParentId] = useState<string | null>(null);
  const [sidebarRefresh, setSidebarRefresh] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [editingPageTitle, setEditingPageTitle] = useState(false);
  const [editingPageTitleValue, setEditingPageTitleValue] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("auth_token");
    if (stored) {
      setToken(stored);
      // URL 쿼리 파라미터에서 page 확인
      const urlParams = new URLSearchParams(window.location.search);
      const pageId = urlParams.get("page");
      if (pageId) {
        loadPage(pageId, stored);
      } else {
        loadPersonalPage(stored);
      }
    } else {
      window.location.href = "/my-space";
    }
  }, []);

  const loadPersonalPage = async (tokenValue: string) => {
    try {
      // 페이지 로드 전 블록 초기화 (이전 페이지의 내용이 남아있는 문제 방지)
      setBlocks([]);
      
      const res = await fetch(`${API_URL}/pages/me`, {
        headers: { "x-user-token": tokenValue }
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentPage(data);
        setEditingPageTitleValue(data.title);
        setEditingPageTitle(false);
        loadBlocks(data.id, tokenValue);
      } else {
        const status = res.status;
        const errorText = await res.text().catch(() => "알 수 없는 오류");
        console.error("Failed to load personal page:", status, errorText);
        
        // 401 Unauthorized 또는 403 Forbidden인 경우에만 리다이렉트
        if (status === 401 || status === 403) {
          setStatus("인증이 만료되었습니다. 다시 로그인해주세요.");
          setTimeout(() => {
            localStorage.removeItem("auth_token");
            window.location.href = "/my-space";
          }, 2000);
        } else if (status === 404) {
          // 개인 페이지가 없는 경우 - 서버에서 자동 생성하므로 재시도
          setStatus("개인 페이지를 생성하는 중...");
          // 잠시 후 재시도
          setTimeout(() => {
            loadPersonalPage(tokenValue);
          }, 1000);
        } else {
          // 기타 에러는 에러 메시지만 표시하고 리다이렉트하지 않음
          setStatus(`페이지를 불러올 수 없습니다. (오류 코드: ${status})`);
        }
      }
    } catch (error) {
      console.error("Failed to load page", error);
      // 네트워크 에러인 경우 API 서버가 실행 중인지 확인
      setStatus("서버에 연결할 수 없습니다. API 서버가 실행 중인지 확인해주세요.");
      // 네트워크 에러는 리다이렉트하지 않음 (사용자가 새로고침할 수 있도록)
    }
  };

  const loadPage = async (pageId: string, tokenValue?: string) => {
    const tokenToUse = tokenValue || token;
    if (!tokenToUse) return;
    try {
      // 페이지 변경 시 이전 블록 먼저 초기화 (텍스트가 남아있는 문제 방지)
      setBlocks([]);
      
      const res = await fetch(`${API_URL}/pages/${pageId}`, {
        headers: { "x-user-token": tokenToUse }
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentPage(data);
        setEditingPageTitleValue(data.title);
        setEditingPageTitle(false);
        loadBlocks(pageId, tokenToUse);
      } else {
        const status = res.status;
        const errorText = await res.text().catch(() => "알 수 없는 오류");
        console.error("Failed to load page:", status, errorText);
        
        // 401 Unauthorized 또는 403 Forbidden인 경우
        if (status === 401 || status === 403) {
          setStatus("인증이 만료되었습니다. 다시 로그인해주세요.");
          setTimeout(() => {
            localStorage.removeItem("auth_token");
            window.location.href = "/my-space";
          }, 2000);
        } else if (status === 404) {
          // 페이지를 찾을 수 없으면 개인 페이지로 이동
          setStatus("페이지를 찾을 수 없습니다. 개인 페이지로 이동합니다.");
          loadPersonalPage(tokenToUse);
        } else {
          // 기타 에러는 개인 페이지로 이동
          setStatus("페이지를 불러올 수 없습니다. 개인 페이지로 이동합니다.");
          loadPersonalPage(tokenToUse);
        }
      }
    } catch (error) {
      console.error("Failed to load page", error);
      // 네트워크 에러인 경우 개인 페이지로 이동 시도
      setStatus("서버에 연결할 수 없습니다. 개인 페이지로 이동합니다.");
      if (tokenToUse) {
        loadPersonalPage(tokenToUse);
      }
    }
  };

  const loadBlocks = async (pageId: string, tokenValue: string) => {
    try {
      const res = await fetch(`${API_URL}/pages/${pageId}/blocks`, {
        headers: { "x-user-token": tokenValue }
      });
      if (res.ok) {
        const data = await res.json();
        setBlocks(data || []);
      }
    } catch (error) {
      console.error("Failed to load blocks", error);
      setBlocks([]);
    }
  };

  const handlePageSelect = (pageId: string) => {
    if (token) {
      loadPage(pageId, token);
    }
  };

  const handleCreatePage = (parentId?: string | null) => {
    // parentId가 null이면 상위 페이지 생성 (개인 워크스페이스와 같은 레벨)
    // parentId가 있으면 하위 페이지 생성
    setNewPageParentId(parentId ?? null);
    setShowCreateModal(true);
  };

  const createPage = async () => {
    if (!token || !newPageTitle.trim()) {
      setStatus("페이지 제목을 입력해주세요.");
      return;
    }
    try {
      const payload: any = { title: newPageTitle };
      if (newPageParentId) {
        payload.parentPageId = newPageParentId;
      }
      
      const res = await fetch(`${API_URL}/pages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-token": token
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        setShowCreateModal(false);
        setNewPageTitle("");
        setNewPageParentId(null);
        setStatus("페이지가 생성되었습니다.");
        setSidebarRefresh((prev) => prev + 1);
        loadPage(data.id);
        setTimeout(() => setStatus(null), 2000);
      } else {
        const error = await res.json().catch(() => ({ message: "페이지 생성에 실패했습니다." }));
        setStatus(error.message ?? "페이지 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("Failed to create page", error);
      setStatus("페이지 생성에 실패했습니다.");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!token || !currentPage || !e.target.files?.[0]) return;

    const file = e.target.files[0];
    setStatus("파일 업로드 중...");
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("pageId", currentPage.id);

    try {
      const res = await fetch(`${API_URL}/files/upload`, {
        method: "POST",
        headers: {
          "x-user-token": token
        },
        body: formData
      });

      if (res.ok) {
        setStatus(`${file.name} 파일이 업로드되었습니다.`);
        loadBlocks(currentPage.id, token);
        setTimeout(() => setStatus(null), 3000);
      } else {
        const errorText = await res.text();
        console.error("File upload error:", errorText);
        try {
          const errorJson = JSON.parse(errorText);
          setStatus("파일 업로드에 실패했습니다: " + (errorJson.message || errorText));
        } catch {
          setStatus("파일 업로드에 실패했습니다: " + errorText);
        }
      }
    } catch (error) {
      console.error("Failed to upload file", error);
      setStatus("파일 업로드에 실패했습니다.");
    }
    e.target.value = "";
  };

  const handleBlockUpdate = async (blockId: string, props: Record<string, unknown>) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/pages/blocks/${blockId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-user-token": token
        },
        body: JSON.stringify(props)
      });
      if (res.ok) {
        // 블록 업데이트 후 로컬 상태만 업데이트 (전체 리로드 방지)
        setBlocks(prevBlocks => 
          prevBlocks.map(block => 
            block.id === blockId 
              ? { ...block, props: { ...block.props, ...props } }
              : block
          )
        );
        // 전체 리로드는 하지 않음 (에디터 내용이 사라지는 것을 방지)
        // 필요시에만 특정 블록만 업데이트
      } else {
        console.error("Failed to update block", await res.text());
      }
    } catch (error) {
      console.error("Failed to update block", error);
    }
  };

  const handleBlockCreate = async (type: string, props: Record<string, unknown>) => {
    if (!token || !currentPage) return;
    try {
      const res = await fetch(`${API_URL}/pages/${currentPage.id}/blocks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-token": token
        },
        body: JSON.stringify({ type, props })
      });
      if (res.ok) {
        loadBlocks(currentPage.id, token);
      }
    } catch (error) {
      console.error("Failed to create block", error);
    }
  };

  const handleBlocksReorder = async (blockIds: string[]) => {
    if (!token || !currentPage) return;
    try {
      const res = await fetch(`${API_URL}/pages/${currentPage.id}/blocks/reorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-token": token
        },
        body: JSON.stringify({ blockIds })
      });
      if (res.ok) {
        loadBlocks(currentPage.id, token);
      } else {
        console.error("Failed to reorder blocks", await res.text());
      }
    } catch (error) {
      console.error("Failed to reorder blocks", error);
    }
  };

  const handleBlockDelete = async (blockId: string) => {
    if (!token) return;
    if (!confirm("이 블록을 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`${API_URL}/pages/blocks/${blockId}`, {
        method: "DELETE",
        headers: {
          "x-user-token": token
        }
      });
      if (res.ok) {
        if (currentPage) {
          loadBlocks(currentPage.id, token);
        }
        setStatus("블록이 삭제되었습니다.");
        setTimeout(() => setStatus(null), 2000);
      } else {
        setStatus("블록 삭제에 실패했습니다.");
        setTimeout(() => setStatus(null), 2000);
      }
    } catch (error) {
      console.error("Failed to delete block", error);
      setStatus("블록 삭제에 실패했습니다.");
      setTimeout(() => setStatus(null), 2000);
    }
  };

  const handleUpdatePageTitle = async (pageId: string, newTitle: string) => {
    if (!token || !newTitle.trim()) return;
    try {
      const res = await fetch(`${API_URL}/pages/${pageId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-user-token": token
        },
        body: JSON.stringify({ title: newTitle })
      });
      if (res.ok) {
        setSidebarRefresh((prev) => prev + 1);
        // 현재 페이지인 경우 제목 업데이트
        if (currentPage && currentPage.id === pageId) {
          setCurrentPage({ ...currentPage, title: newTitle });
          setEditingPageTitleValue(newTitle);
        }
      } else {
        const error = await res.json().catch(() => ({ message: "페이지 제목 수정에 실패했습니다." }));
        setStatus(error.message ?? "페이지 제목 수정에 실패했습니다.");
        setTimeout(() => setStatus(null), 2000);
      }
    } catch (error) {
      console.error("Failed to update page title", error);
      setStatus("페이지 제목 수정에 실패했습니다.");
      setTimeout(() => setStatus(null), 2000);
    }
  };

  const handleDeletePage = async (pageId: string) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/pages/${pageId}`, {
        method: "DELETE",
        headers: {
          "x-user-token": token
        }
      });
      if (res.ok) {
        setStatus("페이지가 삭제되었습니다.");
        
        // 삭제된 페이지가 현재 페이지인 경우, 첫 번째 페이지로 이동
        if (currentPage && currentPage.id === pageId) {
          const treeRes = await fetch(`${API_URL}/pages/tree`, {
            headers: { "x-user-token": token }
          });
          if (treeRes.ok) {
            const tree = await treeRes.json();
            if (tree.id) {
              loadPage(tree.id, token);
            } else {
              // 트리가 없으면 개인 페이지로 이동
              loadPersonalPage(token);
            }
          } else {
            // 트리 로드 실패 시 개인 페이지로 이동
            loadPersonalPage(token);
          }
        }
        
        // 사이드바 새로고침 (약간의 지연 후)
        setTimeout(() => {
          setSidebarRefresh((prev) => prev + 1);
        }, 100);
        
        setTimeout(() => setStatus(null), 2000);
      } else {
        const error = await res.json().catch(() => ({ message: "페이지 삭제에 실패했습니다." }));
        setStatus(error.message ?? "페이지 삭제에 실패했습니다.");
        setTimeout(() => setStatus(null), 2000);
      }
    } catch (error) {
      console.error("Failed to delete page", error);
      setStatus("페이지 삭제에 실패했습니다.");
      setTimeout(() => setStatus(null), 2000);
    }
  };

  if (!token) {
    return <div className="workspace-loading">로딩 중...</div>;
  }

  if (!currentPage) {
    return (
      <div className="workspace-loading" style={{ padding: "2rem", textAlign: "center" }}>
        <div>로딩 중...</div>
        {status && (
          <div style={{ marginTop: "1rem", color: "#666", fontSize: "0.9rem" }}>
            {status}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="workspace-layout">
      <Sidebar
        token={token}
        currentPageId={currentPage.id}
        onPageSelect={handlePageSelect}
        onCreatePage={() => handleCreatePage(null)}
        onCreateSubPage={(parentId) => handleCreatePage(parentId)}
        onDeletePage={handleDeletePage}
        onUpdatePageTitle={handleUpdatePageTitle}
        refreshTrigger={sidebarRefresh}
      />
      <main className="workspace-main">
        <header className="page-header">
          {editingPageTitle ? (
            <input
              type="text"
              value={editingPageTitleValue}
              onChange={(e) => setEditingPageTitleValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleUpdatePageTitle(currentPage.id, editingPageTitleValue);
                  setEditingPageTitle(false);
                } else if (e.key === "Escape") {
                  setEditingPageTitleValue(currentPage.title);
                  setEditingPageTitle(false);
                }
              }}
              onBlur={() => {
                handleUpdatePageTitle(currentPage.id, editingPageTitleValue);
                setEditingPageTitle(false);
              }}
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                padding: "0.5rem",
                border: "2px solid #0066cc",
                borderRadius: "4px",
                width: "100%",
                maxWidth: "600px"
              }}
              autoFocus
            />
          ) : (
            <h1
              onDoubleClick={() => {
                setEditingPageTitleValue(currentPage.title);
                setEditingPageTitle(true);
              }}
              style={{ cursor: "text" }}
              title="더블클릭하여 이름 수정"
            >
              {currentPage.title}
            </h1>
          )}
          <div className="page-actions">
            <label className="file-upload-btn">
              📎 파일 업로드
              <input type="file" onChange={handleFileUpload} style={{ display: "none" }} />
            </label>
            <button className="button secondary" onClick={() => setShowShareModal(true)}>
              공유
            </button>
            <button className="button secondary" onClick={() => setShowTeamModal(true)}>
              팀 관리
            </button>
          </div>
        </header>
        {status && (
          <div className="status-message" style={{ 
            padding: "0.5rem 1rem", 
            margin: "0.5rem 0", 
            background: status.includes("실패") ? "#ffebee" : "#e8f5e9", 
            borderRadius: "4px",
            color: status.includes("실패") ? "#c62828" : "#2e7d32"
          }}>
            {status}
          </div>
        )}
        <div className="page-content">
          <BlockEditor
            token={token}
            pageId={currentPage.id}
            blocks={blocks}
            onBlockUpdate={handleBlockUpdate}
            onBlockCreate={handleBlockCreate}
            onBlockDelete={handleBlockDelete}
            onBlocksReorder={handleBlocksReorder}
          />
        </div>
      </main>
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>새 페이지</h2>
            <input
              type="text"
              value={newPageTitle}
              onChange={(e) => setNewPageTitle(e.target.value)}
              placeholder="페이지 제목"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  createPage();
                }
              }}
            />
            <div className="modal-actions">
              <button onClick={createPage}>생성</button>
              <button onClick={() => setShowCreateModal(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
      {showShareModal && currentPage && (
        <ShareModal token={token} pageId={currentPage.id} onClose={() => setShowShareModal(false)} />
      )}
      {showTeamModal && (
        <TeamModal token={token} onClose={() => setShowTeamModal(false)} />
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

type PageTreeNode = {
  id: string;
  title: string;
  icon?: string;
  children: PageTreeNode[];
};

type SidebarProps = {
  token: string | null;
  currentPageId?: string;
  onPageSelect: (pageId: string) => void;
  onCreatePage: () => void;
  onCreateSubPage?: (parentId: string) => void;
  onDeletePage?: (pageId: string) => void;
  onUpdatePageTitle?: (pageId: string, newTitle: string) => void;
  refreshTrigger?: number;
};

export function Sidebar({ token, currentPageId, onPageSelect, onCreatePage, onCreateSubPage, onDeletePage, onUpdatePageTitle, refreshTrigger }: SidebarProps) {
  const [tree, setTree] = useState<PageTreeNode | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const loadTree = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/pages/tree`, {
        headers: { "x-user-token": token }
      });
      if (res.ok) {
        const data = await res.json();
        setTree(data);
        setExpanded(new Set([data.id]));
      }
    } catch (error) {
      console.error("Failed to load tree", error);
    }
  };

  useEffect(() => {
    loadTree();
  }, [token, refreshTrigger]);

  const toggleExpand = (pageId: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(pageId)) {
        next.delete(pageId);
      } else {
        next.add(pageId);
      }
      return next;
    });
  };

  type PageNodeProps = {
    node: PageTreeNode;
    depth: number;
    isExpanded: boolean;
    isActive: boolean;
    expanded: Set<string>;
    currentPageId?: string;
    onToggleExpand: (pageId: string) => void;
    onPageSelect: (pageId: string) => void;
    onCreateSubPage?: (parentId: string) => void;
    onDeletePage?: (pageId: string) => void;
    onUpdatePageTitle?: (pageId: string, newTitle: string) => void;
  };

  function PageNode({ 
    node, 
    depth, 
    isExpanded, 
    isActive, 
    expanded,
    currentPageId,
    onToggleExpand, 
    onPageSelect, 
    onCreateSubPage, 
    onDeletePage, 
    onUpdatePageTitle 
  }: PageNodeProps) {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState(node.title);

    useEffect(() => {
      setEditedTitle(node.title);
    }, [node.title]);

    const handleTitleSave = () => {
      if (onUpdatePageTitle && editedTitle.trim()) {
        onUpdatePageTitle(node.id, editedTitle.trim());
        setIsEditingTitle(false);
      }
    };

    const hasChildren = node.children.length > 0;

    return (
      <div>
        <div
          className={`page-item ${isActive ? "active" : ""}`}
          style={{ 
            paddingLeft: `${depth * 1.5 + 0.5}rem`,
            display: "flex",
            alignItems: "center",
            gap: "0.25rem"
          }}
        >
          {hasChildren && (
            <button
              className="expand-btn"
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand(node.id);
              }}
              style={{ border: "none", background: "transparent", cursor: "pointer" }}
            >
              {isExpanded ? "▼" : "▶"}
            </button>
          )}
          <div
            style={{ flex: 1, display: "flex", alignItems: "center", gap: "0.5rem" }}
            onClick={() => !isEditingTitle && onPageSelect(node.id)}
          >
            {node.icon && <span className="page-icon">{node.icon}</span>}
            {isEditingTitle ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleTitleSave();
                  } else if (e.key === "Escape") {
                    setEditedTitle(node.title);
                    setIsEditingTitle(false);
                  }
                }}
                onBlur={handleTitleSave}
                style={{ 
                  flex: 1, 
                  padding: "0.25rem 0.5rem", 
                  border: "1px solid #0066cc", 
                  borderRadius: "4px", 
                  fontSize: "0.875rem",
                  background: "white"
                }}
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span 
                className="page-title"
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  setIsEditingTitle(true);
                }}
                style={{ cursor: "text", flex: 1 }}
                title="더블클릭하여 이름 수정"
              >
                {node.title}
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
            {onCreateSubPage && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCreateSubPage(node.id);
                }}
                style={{ 
                  border: "none", 
                  background: "transparent", 
                  cursor: "pointer",
                  padding: "0.25rem",
                  fontSize: "0.875rem",
                  color: "#666"
                }}
                title="하위 페이지 추가"
                onMouseEnter={(e) => e.currentTarget.style.color = "#333"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#666"}
              >
                +
              </button>
            )}
            {onDeletePage && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`"${node.title}" 페이지를 삭제하시겠습니까?`)) {
                    onDeletePage(node.id);
                  }
                }}
                style={{ 
                  border: "none", 
                  background: "transparent", 
                  cursor: "pointer",
                  padding: "0.25rem",
                  fontSize: "0.875rem",
                  color: "#ff4444"
                }}
                title="페이지 삭제"
                onMouseEnter={(e) => e.currentTarget.style.color = "#cc3333"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#ff4444"}
              >
                ×
              </button>
            )}
          </div>
        </div>
        {hasChildren && isExpanded && (
          <div className="page-children">
            {node.children.map((child) => (
              <PageNode
                key={child.id}
                node={child}
                depth={depth + 1}
                isExpanded={expanded.has(child.id)}
                isActive={currentPageId === child.id}
                expanded={expanded}
                currentPageId={currentPageId}
                onToggleExpand={onToggleExpand}
                onPageSelect={onPageSelect}
                onCreateSubPage={onCreateSubPage}
                onDeletePage={onDeletePage}
                onUpdatePageTitle={onUpdatePageTitle}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <button className="new-page-btn" onClick={onCreatePage}>
          + 새 페이지
        </button>
      </div>
      <nav className="page-tree">
        {tree && (
          <PageNode
            node={tree}
            depth={0}
            isExpanded={expanded.has(tree.id)}
            isActive={currentPageId === tree.id}
            expanded={expanded}
            currentPageId={currentPageId}
            onToggleExpand={toggleExpand}
            onPageSelect={onPageSelect}
            onCreateSubPage={onCreateSubPage}
            onDeletePage={onDeletePage}
            onUpdatePageTitle={onUpdatePageTitle}
          />
        )}
      </nav>
    </aside>
  );
}

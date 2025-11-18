"use client";

import React, { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

type Block = {
  id: string;
  type: string;
  props: Record<string, unknown>;
  position: number;
};

type BlockRendererProps = {
  block: Block;
  token: string | null;
  onUpdate?: (blockId: string, props: Record<string, unknown>) => void;
  onDelete?: (blockId: string) => void;
};

export function BlockRenderer({ block, token, onUpdate, onDelete }: BlockRendererProps) {
  const [fileData, setFileData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (block.type === "file" && token) {
      const fileId = block.props.fileId as string;
      if (fileId) {
        fetch(`${API_URL}/files/${fileId}`, {
          headers: { "x-user-token": token }
        })
          .then((res) => res.json())
          .then((data) => setFileData(data))
          .catch(console.error);
      }
    }
  }, [block, token]);

  const handleUpdate = (newProps: Record<string, unknown>) => {
    if (onUpdate) {
      // 전체 props를 병합하여 업데이트
      const updatedProps = { ...block.props, ...newProps };
      onUpdate(block.id, updatedProps);
    }
  };

  if (block.type === "file") {
    const mimeType = (block.props.mimeType as string) || (fileData?.mimeType as string) || "";
    const filename = (block.props.filename as string) || (fileData?.title as string) || "파일";
    const fileId = block.props.fileId as string;

    if (mimeType.startsWith("image/")) {
      const imageUrl = `${API_URL}/files/${fileId}/download${token ? `?token=${encodeURIComponent(token)}` : ""}`;
      
      return (
        <div className="file-block image-block" style={{ margin: "1rem 0" }}>
          <img
            src={imageUrl}
            alt={filename}
            style={{ maxWidth: "100%", height: "auto", borderRadius: "4px" }}
            onError={(e) => {
              console.error("이미지 로드 실패:", imageUrl);
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      );
    }

    if (mimeType.startsWith("video/")) {
      const videoUrl = `${API_URL}/files/${fileId}/download${token ? `?token=${encodeURIComponent(token)}` : ""}`;
      const videoRef = React.useRef<HTMLVideoElement>(null);
      
      return (
        <div className="file-block video-block" style={{ margin: "1rem 0", position: "relative" }}>
          <video
            ref={videoRef}
            controls
            onDoubleClick={(e) => {
              const video = e.currentTarget;
              const rect = video.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const width = rect.width;
              if (clickX < width / 2) {
                video.currentTime = Math.max(0, video.currentTime - 10);
              } else {
                video.currentTime = Math.min(video.duration, video.currentTime + 10);
              }
            }}
            style={{ maxWidth: "100%", height: "auto", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
            title="더블클릭: 왼쪽 10초 뒤로, 오른쪽 10초 앞으로"
          >
            <source src={videoUrl} type={mimeType} />
            비디오를 재생할 수 없습니다.
          </video>
          {onDelete && (
            <button
              onClick={() => onDelete(block.id)}
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
                background: "rgba(255, 68, 68, 0.9)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                cursor: "pointer",
                fontSize: "1.2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
              }}
              title="삭제"
            >
              ×
            </button>
          )}
        </div>
      );
    }

    if (mimeType.startsWith("audio/")) {
      const audioUrl = `${API_URL}/files/${fileId}/download${token ? `?token=${encodeURIComponent(token)}` : ""}`;
      const [isEditingTitle, setIsEditingTitle] = useState(false);
      const [editedTitle, setEditedTitle] = useState(filename);
      
      useEffect(() => {
        setEditedTitle(filename);
      }, [filename]);
      
      const handleTitleSave = () => {
        if (onUpdate && editedTitle.trim()) {
          handleUpdate({ filename: editedTitle.trim() });
          setIsEditingTitle(false);
        }
      };
      
      return (
        <div className="file-block audio-block" style={{ margin: "1rem 0", padding: "1rem", background: "white", border: "1px solid #e0e0e0", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", position: "relative" }}>
          {onDelete && (
            <button
              onClick={() => onDelete(block.id)}
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
                background: "#ff4444",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "28px",
                height: "28px",
                cursor: "pointer",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
              }}
              title="삭제"
            >
              ×
            </button>
          )}
          <div style={{ marginBottom: "0.75rem" }}>
            {isEditingTitle ? (
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleTitleSave();
                    } else if (e.key === "Escape") {
                      setEditedTitle(filename);
                      setIsEditingTitle(false);
                    }
                  }}
                  style={{ flex: 1, padding: "0.5rem", border: "1px solid #ddd", borderRadius: "6px", fontSize: "1rem", fontWeight: "600" }}
                  autoFocus
                />
                <button
                  onClick={handleTitleSave}
                  style={{ padding: "0.5rem 1rem", background: "#00aa44", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.875rem" }}
                >
                  저장
                </button>
                <button
                  onClick={() => {
                    setEditedTitle(filename);
                    setIsEditingTitle(false);
                  }}
                  style={{ padding: "0.5rem 1rem", background: "#999", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.875rem" }}
                >
                  취소
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600", color: "#333", flex: 1 }}>🎵 {filename}</h4>
                <button
                  onClick={() => setIsEditingTitle(true)}
                  style={{ padding: "0.25rem 0.5rem", background: "#f5f5f5", border: "1px solid #ddd", borderRadius: "4px", cursor: "pointer", fontSize: "0.875rem" }}
                >
                  제목 수정
                </button>
              </div>
            )}
          </div>
          <audio
            controls
            style={{ width: "100%", marginTop: "0.5rem" }}
          >
            <source src={audioUrl} type={mimeType} />
            오디오를 재생할 수 없습니다.
          </audio>
        </div>
      );
    }

    return (
      <div className="file-block" style={{ margin: "1rem 0", padding: "0.5rem", border: "1px solid #ddd", borderRadius: "4px", position: "relative" }}>
        <a
          href={`${API_URL}/files/${fileId}/download${token ? `?token=${token}` : ""}`}
          download
          style={{ textDecoration: "none", color: "#0066cc" }}
        >
          📎 {filename}
        </a>
        {onDelete && (
          <button
            onClick={() => onDelete(block.id)}
            style={{
              position: "absolute",
              top: "0.25rem",
              right: "0.25rem",
              background: "#ff4444",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              cursor: "pointer",
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            title="삭제"
          >
            ×
          </button>
        )}
      </div>
    );
  }

  if (block.type === "table") {
    const rows = (block.props.rows as any[]) || [];
    const columns = (block.props.columns as string[]) || ["열 1", "열 2", "열 3"];

    const addRow = () => {
      const newRows = [...rows, columns.map(() => "")];
      handleUpdate({ ...block.props, rows: newRows });
    };

    const addColumn = () => {
      const newColumns = [...columns, ""];
      const newRows = rows.map(row => [...row, ""]);
      handleUpdate({ ...block.props, columns: newColumns, rows: newRows });
    };

    const updateColumn = (colIdx: number, value: string) => {
      const newColumns = [...columns];
      newColumns[colIdx] = value;
      handleUpdate({ ...block.props, columns: newColumns });
    };

    const updateCell = (rowIdx: number, colIdx: number, value: string) => {
      const newRows = [...rows];
      if (!newRows[rowIdx]) {
        newRows[rowIdx] = columns.map(() => "");
      }
      newRows[rowIdx][colIdx] = value;
      handleUpdate({ ...block.props, rows: newRows });
    };

    return (
      <div className="table-block" style={{ margin: "1.5rem 0", padding: "1.5rem", background: "white", border: "1px solid #e0e0e0", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600", color: "#333" }}>📊 표</h3>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <button 
              onClick={addColumn} 
              style={{ 
                padding: "0.5rem 1rem", 
                fontSize: "0.875rem", 
                cursor: "pointer",
                background: "#f5f5f5",
                border: "1px solid #ddd",
                borderRadius: "6px",
                color: "#333",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#e8e8e8"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#f5f5f5"}
            >
              + 열 추가
            </button>
            <button 
              onClick={addRow} 
              style={{ 
                padding: "0.5rem 1rem", 
                fontSize: "0.875rem", 
                cursor: "pointer",
                background: "#f5f5f5",
                border: "1px solid #ddd",
                borderRadius: "6px",
                color: "#333",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#e8e8e8"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#f5f5f5"}
            >
              + 행 추가
            </button>
            {onDelete && (
              <button
                onClick={() => onDelete(block.id)}
                style={{
                  background: "#ff4444",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#cc3333"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#ff4444"}
                title="블록 삭제"
              >
                삭제
              </button>
            )}
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "white" }}>
            <thead>
              <tr>
                {columns.map((col, idx) => (
                  <th key={idx} style={{ border: "1px solid #e0e0e0", padding: "0.75rem", textAlign: "left", background: "#f8f9fa", fontWeight: "600" }}>
                    <input
                      type="text"
                      value={col}
                      onChange={(e) => updateColumn(idx, e.target.value)}
                      style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontWeight: "600", color: "#333" }}
                      placeholder="열 이름"
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} style={{ border: "1px solid #e0e0e0", padding: "2rem", textAlign: "center", color: "#999" }}>
                    행을 추가하세요
                  </td>
                </tr>
              ) : (
                rows.map((row, rowIdx) => (
                  <tr key={rowIdx} style={{ transition: "background 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9fa"} onMouseLeave={(e) => e.currentTarget.style.background = "white"}>
                    {columns.map((_, colIdx) => (
                      <td key={colIdx} style={{ border: "1px solid #e0e0e0", padding: "0.75rem" }}>
                        <input
                          type="text"
                          value={row[colIdx] || ""}
                          onChange={(e) => updateCell(rowIdx, colIdx, e.target.value)}
                          style={{ width: "100%", border: "none", outline: "none", background: "transparent", color: "#333" }}
                          placeholder=""
                        />
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (block.type === "board") {
    const columns = (block.props.columns as any[]) || [
      { id: "todo", title: "할 일", items: [] },
      { id: "in-progress", title: "진행 중", items: [] },
      { id: "done", title: "완료", items: [] }
    ];

    const addItem = (columnId: string) => {
      const newColumns = columns.map(col => {
        if (col.id === columnId) {
          return {
            ...col,
            items: [...(col.items || []), { id: Date.now().toString(), title: "새 항목", description: "" }]
          };
        }
        return col;
      });
      handleUpdate({ ...block.props, columns: newColumns });
    };

    const updateItem = (columnId: string, itemId: string, updates: any) => {
      const newColumns = columns.map(col => {
        if (col.id === columnId) {
          return {
            ...col,
            items: (col.items || []).map((item: any) => 
              item.id === itemId ? { ...item, ...updates } : item
            )
          };
        }
        return col;
      });
      handleUpdate({ ...block.props, columns: newColumns });
    };

    return (
      <div className="board-block" style={{ margin: "1.5rem 0", padding: "1.5rem", background: "white", border: "1px solid #e0e0e0", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600", color: "#333" }}>📋 보드</h3>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {onDelete && (
              <button
                onClick={() => onDelete(block.id)}
                style={{
                  background: "#ff4444",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#cc3333"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#ff4444"}
                title="블록 삭제"
              >
                삭제
              </button>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
          {columns.map((col) => (
            <div key={col.id} style={{ minWidth: "280px", background: "#f8f9fa", borderRadius: "8px", padding: "1rem", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
              <h4 style={{ margin: "0 0 1rem 0", fontSize: "0.95rem", fontWeight: "600", color: "#333", paddingBottom: "0.5rem", borderBottom: "2px solid #e0e0e0" }}>{col.title}</h4>
              <div style={{ minHeight: "150px" }}>
                {col.items && col.items.length > 0 ? (
                  col.items.map((item: any, idx: number) => (
                    <div key={item.id || idx} style={{ background: "white", padding: "0.75rem", marginBottom: "0.75rem", borderRadius: "6px", border: "1px solid #e0e0e0", boxShadow: "0 1px 2px rgba(0,0,0,0.05)", transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)"} onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.05)"}>
                      <input
                        type="text"
                        value={item.title || ""}
                        onChange={(e) => updateItem(col.id, item.id, { title: e.target.value })}
                        style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontWeight: "600", marginBottom: "0.5rem", fontSize: "0.9rem", color: "#333" }}
                        placeholder="제목"
                      />
                      {item.description && (
                        <div style={{ fontSize: "0.875rem", color: "#666", lineHeight: "1.4" }}>{item.description}</div>
                      )}
                    </div>
                  ))
                ) : (
                  <div style={{ color: "#999", fontSize: "0.875rem", textAlign: "center", padding: "2rem" }}>
                    항목이 없습니다
                  </div>
                )}
                <button
                  onClick={() => addItem(col.id)}
                  style={{ width: "100%", padding: "0.75rem", marginTop: "0.5rem", border: "2px dashed #ddd", background: "white", cursor: "pointer", borderRadius: "6px", color: "#666", fontSize: "0.875rem", transition: "all 0.2s" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#0066cc";
                    e.currentTarget.style.color = "#0066cc";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#ddd";
                    e.currentTarget.style.color = "#666";
                  }}
                >
                  + 항목 추가
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (block.type === "list") {
    const items = (block.props.items as any[]) || [];

    const addItem = () => {
      const newItems = [...items, { id: Date.now().toString(), text: "", checked: false }];
      handleUpdate({ ...block.props, items: newItems });
    };

    const updateItem = (itemId: string, updates: any) => {
      const newItems = items.map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      );
      handleUpdate({ ...block.props, items: newItems });
    };

    const deleteItem = (itemId: string) => {
      const newItems = items.filter(item => item.id !== itemId);
      handleUpdate({ ...block.props, items: newItems });
    };

    return (
      <div className="list-block" style={{ margin: "1.5rem 0", padding: "1.5rem", background: "white", border: "1px solid #e0e0e0", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600", color: "#333" }}>📝 리스트</h3>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <button 
              onClick={addItem} 
              style={{ 
                padding: "0.5rem 1rem", 
                fontSize: "0.875rem", 
                cursor: "pointer",
                background: "#f5f5f5",
                border: "1px solid #ddd",
                borderRadius: "6px",
                color: "#333",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#e8e8e8"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#f5f5f5"}
            >
              + 항목 추가
            </button>
            {onDelete && (
              <button
                onClick={() => onDelete(block.id)}
                style={{
                  background: "#ff4444",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#cc3333"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#ff4444"}
                title="블록 삭제"
              >
                삭제
              </button>
            )}
          </div>
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {items.length === 0 ? (
            <li style={{ color: "#999", padding: "1.5rem", textAlign: "center" }}>항목을 추가하세요</li>
          ) : (
            items.map((item, idx) => (
              <li 
                key={item.id || idx} 
                style={{ 
                  padding: "0.75rem", 
                  borderBottom: "1px solid #f0f0f0", 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "0.75rem",
                  transition: "background 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9fa"}
                onMouseLeave={(e) => e.currentTarget.style.background = "white"}
              >
                <input
                  type="checkbox"
                  checked={item.checked || false}
                  onChange={(e) => updateItem(item.id, { checked: e.target.checked })}
                  style={{ width: "18px", height: "18px", cursor: "pointer" }}
                />
                <input
                  type="text"
                  value={item.text || ""}
                  onChange={(e) => updateItem(item.id, { text: e.target.value })}
                  style={{ flex: 1, border: "none", outline: "none", background: "transparent", textDecoration: item.checked ? "line-through" : "none", color: item.checked ? "#999" : "#333", fontSize: "0.95rem" }}
                  placeholder="항목 입력..."
                />
                <button
                  onClick={() => deleteItem(item.id)}
                  style={{ border: "none", background: "transparent", cursor: "pointer", color: "#999", fontSize: "1.2rem", padding: "0.25rem", transition: "color 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#ff4444"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#999"}
                >
                  ×
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    );
  }

  if (block.type === "timeline") {
    const events = (block.props.events as any[]) || [];

    const addEvent = () => {
      const newEvents = [...events, { id: Date.now().toString(), date: new Date().toISOString().split("T")[0], title: "", description: "" }];
      handleUpdate({ ...block.props, events: newEvents });
    };

    const updateEvent = (eventId: string, updates: any) => {
      const newEvents = events.map(event => 
        event.id === eventId ? { ...event, ...updates } : event
      );
      handleUpdate({ ...block.props, events: newEvents });
    };

    const deleteEvent = (eventId: string) => {
      const newEvents = events.filter(event => event.id !== eventId);
      handleUpdate({ ...block.props, events: newEvents });
    };

    return (
      <div className="timeline-block" style={{ margin: "1.5rem 0", padding: "1.5rem", background: "white", border: "1px solid #e0e0e0", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600", color: "#333" }}>⏱️ 타임라인</h3>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <button 
              onClick={addEvent} 
              style={{ 
                padding: "0.5rem 1rem", 
                fontSize: "0.875rem", 
                cursor: "pointer",
                background: "#f5f5f5",
                border: "1px solid #ddd",
                borderRadius: "6px",
                color: "#333",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#e8e8e8"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#f5f5f5"}
            >
              + 이벤트 추가
            </button>
            {onDelete && (
              <button
                onClick={() => onDelete(block.id)}
                style={{
                  background: "#ff4444",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#cc3333"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#ff4444"}
                title="블록 삭제"
              >
                삭제
              </button>
            )}
          </div>
        </div>
        <div style={{ position: "relative", paddingLeft: "2.5rem" }}>
          {events.length === 0 ? (
            <div style={{ color: "#999", padding: "2rem", textAlign: "center" }}>이벤트를 추가하세요</div>
          ) : (
            events.map((event, idx) => (
              <div key={event.id || idx} style={{ marginBottom: "1.5rem", position: "relative" }}>
                <div style={{ 
                  position: "absolute", 
                  left: "-2rem", 
                  top: "0.5rem", 
                  width: "1rem", 
                  height: "1rem", 
                  borderRadius: "50%", 
                  background: "#0066cc",
                  border: "3px solid white",
                  boxShadow: "0 0 0 2px #0066cc",
                  zIndex: 1
                }} />
                {idx < events.length - 1 && (
                  <div style={{
                    position: "absolute",
                    left: "-1.75rem",
                    top: "1.5rem",
                    width: "2px",
                    height: "calc(100% + 0.5rem)",
                    background: "#e0e0e0"
                  }} />
                )}
                <div style={{ paddingLeft: "1rem", background: "#f8f9fa", padding: "1rem", borderRadius: "6px", border: "1px solid #e0e0e0" }}>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                    <input
                      type="date"
                      value={event.date || ""}
                      onChange={(e) => updateEvent(event.id, { date: e.target.value })}
                      style={{ border: "1px solid #ddd", padding: "0.5rem", borderRadius: "6px", fontSize: "0.875rem" }}
                    />
                    <input
                      type="text"
                      value={event.title || ""}
                      onChange={(e) => updateEvent(event.id, { title: e.target.value })}
                      style={{ flex: 1, minWidth: "200px", border: "1px solid #ddd", padding: "0.5rem", borderRadius: "6px", fontSize: "0.95rem", fontWeight: "600" }}
                      placeholder="이벤트 제목"
                    />
                    <button
                      onClick={() => deleteEvent(event.id)}
                      style={{ border: "none", background: "transparent", cursor: "pointer", color: "#999", fontSize: "1.2rem", padding: "0.25rem", transition: "color 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "#ff4444"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "#999"}
                    >
                      ×
                    </button>
                  </div>
                  <textarea
                    value={event.description || ""}
                    onChange={(e) => updateEvent(event.id, { description: e.target.value })}
                    style={{ width: "100%", border: "1px solid #ddd", padding: "0.75rem", borderRadius: "6px", fontSize: "0.875rem", resize: "vertical", background: "white" }}
                    placeholder="설명..."
                    rows={3}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  if (block.type === "calendar_view") {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const events = (block.props.events as Record<string, any[]>) || {};

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

    const [eventModal, setEventModal] = useState<{ date: string; events: any[] } | null>(null);

    const addEvent = (date: string) => {
      const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
      const dayEvents = events[dateKey] || [];
      setEventModal({ date: dateKey, events: dayEvents });
    };

    const saveEvent = (eventId: string, updates: any) => {
      if (!eventModal) return;
      const newEvents = {
        ...events,
        [eventModal.date]: eventModal.events.map((e: any) => 
          e.id === eventId ? { ...e, ...updates } : e
        )
      };
      handleUpdate({ ...block.props, events: newEvents });
      setEventModal({ ...eventModal, events: newEvents[eventModal.date] });
    };

    const addNewEvent = () => {
      if (!eventModal) return;
      const newEvent = { id: Date.now().toString(), title: "새 이벤트", hour: 9, minute: 0, ampm: "오전", description: "", color: "#0066cc" };
      const newEvents = {
        ...events,
        [eventModal.date]: [...eventModal.events, newEvent]
      };
      handleUpdate({ ...block.props, events: newEvents });
      setEventModal({ ...eventModal, events: newEvents[eventModal.date] });
    };

    const deleteEvent = (eventId: string) => {
      if (!eventModal) return;
      const newEvents = {
        ...events,
        [eventModal.date]: eventModal.events.filter((e: any) => e.id !== eventId)
      };
      handleUpdate({ ...block.props, events: newEvents });
      setEventModal({ ...eventModal, events: newEvents[eventModal.date] });
    };

    const getDayEvents = (day: number | null) => {
      if (!day) return [];
      const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      return events[dateKey] || [];
    };

    const colorOptions = [
      { name: "파랑", value: "#0066cc" },
      { name: "빨강", value: "#ff4444" },
      { name: "초록", value: "#00aa44" },
      { name: "노랑", value: "#ffaa00" },
      { name: "보라", value: "#8844ff" },
      { name: "분홍", value: "#ff44aa" }
    ];

    return (
      <div className="calendar-block" style={{ margin: "2rem 0", padding: "2rem", background: "white", border: "1px solid #e0e0e0", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", position: "relative" }}>
          <h3 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "600", color: "#333" }}>📅 캘린더 - {currentYear}년 {monthNames[currentMonth]}</h3>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <button
              onClick={() => {
                if (currentMonth === 0) {
                  setCurrentMonth(11);
                  setCurrentYear(currentYear - 1);
                } else {
                  setCurrentMonth(currentMonth - 1);
                }
              }}
              style={{ 
                padding: "0.5rem 1rem", 
                cursor: "pointer",
                background: "#f5f5f5",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "1rem",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#e8e8e8"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#f5f5f5"}
            >
              ←
            </button>
            <button
              onClick={() => {
                if (currentMonth === 11) {
                  setCurrentMonth(0);
                  setCurrentYear(currentYear + 1);
                } else {
                  setCurrentMonth(currentMonth + 1);
                }
              }}
              style={{ 
                padding: "0.5rem 1rem", 
                cursor: "pointer",
                background: "#f5f5f5",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "1rem",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#e8e8e8"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#f5f5f5"}
            >
              →
            </button>
            {onDelete && (
              <button
                onClick={() => onDelete(block.id)}
                style={{
                  background: "#ff4444",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#cc3333"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#ff4444"}
                title="블록 삭제"
              >
                삭제
              </button>
            )}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.75rem" }}>
          {dayNames.map((day) => (
            <div key={day} style={{ padding: "1rem", textAlign: "center", fontWeight: "600", background: "#f8f9fa", borderRadius: "8px", fontSize: "1rem", color: "#333" }}>
              {day}
            </div>
          ))}
          {days.map((day, idx) => {
            const dayEvents = getDayEvents(day);
            const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
            return (
              <div
                key={idx}
                onClick={() => day && addEvent(String(day))}
                style={{
                  minHeight: "140px",
                  padding: "0.75rem",
                  border: isToday ? "2px solid #0066cc" : "1px solid #e0e0e0",
                  background: isToday ? "#e3f2fd" : "white",
                  fontSize: "0.95rem",
                  cursor: day ? "pointer" : "default",
                  borderRadius: "8px",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  if (day) {
                    e.currentTarget.style.background = isToday ? "#d1e7ff" : "#f8f9fa";
                    e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = isToday ? "#e3f2fd" : "white";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {day && (
                  <>
                    <div style={{ fontWeight: "bold", marginBottom: "0.25rem", fontSize: "0.9rem" }}>{day}</div>
                    {dayEvents.length > 0 && (
                      <div style={{ fontSize: "0.7rem" }}>
                        {dayEvents.slice(0, 3).map((event: any, idx: number) => (
                          <div
                            key={idx}
                            style={{
                              marginBottom: "0.15rem",
                              padding: "0.15rem 0.3rem",
                              background: event.color || "#0066cc",
                              color: "white",
                              borderRadius: "3px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              fontSize: "0.65rem"
                            }}
                            title={event.title || "이벤트"}
                          >
                            {event.title || "이벤트"}
                          </div>
                        ))}
                        {dayEvents.length > 3 && (
                          <div style={{ fontSize: "0.65rem", color: "#666", marginTop: "0.15rem" }}>
                            +{dayEvents.length - 3}개 더
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
        {eventModal && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "white",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              padding: "2rem",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              zIndex: 1000,
              minWidth: "500px",
              maxWidth: "700px",
              maxHeight: "85vh",
              overflowY: "auto"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "2px solid #e0e0e0" }}>
              <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "600", color: "#333" }}>📅 {eventModal.date} 이벤트</h3>
              <button
                onClick={() => setEventModal(null)}
                style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: "1.5rem", color: "#999", padding: "0.25rem", transition: "color 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#ff4444"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#999"}
              >
                ×
              </button>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              {eventModal.events.length === 0 ? (
                <div style={{ color: "#999", textAlign: "center", padding: "1rem" }}>이벤트가 없습니다</div>
              ) : (
                eventModal.events.map((event: any) => {
                  const hour = event.hour ?? 9;
                  const minute = event.minute ?? 0;
                  const ampm = event.ampm ?? "오전";
                  const color = event.color || "#0066cc";
                  
                  return (
                    <div key={event.id} style={{ marginBottom: "1rem", padding: "1rem", border: `2px solid ${color}`, borderRadius: "8px", background: `${color}10` }}>
                      <input
                        type="text"
                        value={event.title || ""}
                        onChange={(e) => saveEvent(event.id, { title: e.target.value })}
                        placeholder="이벤트 제목"
                        style={{ width: "100%", marginBottom: "0.75rem", padding: "0.75rem", border: "1px solid #ddd", borderRadius: "6px", fontSize: "1rem", fontWeight: "600" }}
                      />
                      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", alignItems: "center" }}>
                        <select
                          value={ampm}
                          onChange={(e) => {
                            const newAmpm = e.target.value;
                            let newHour = hour;
                            if (newAmpm === "오후" && hour < 12) {
                              newHour = hour + 12;
                            } else if (newAmpm === "오전" && hour >= 12) {
                              newHour = hour - 12;
                            }
                            saveEvent(event.id, { ampm: newAmpm, hour: newHour });
                          }}
                          style={{ padding: "0.5rem", border: "1px solid #ddd", borderRadius: "6px" }}
                        >
                          <option value="오전">오전</option>
                          <option value="오후">오후</option>
                        </select>
                        <input
                          type="number"
                          min="0"
                          max="23"
                          value={hour >= 12 ? hour - 12 : hour}
                          onChange={(e) => {
                            let inputHour = parseInt(e.target.value) || 0;
                            let newAmpm = ampm;
                            let displayHour = inputHour;
                            
                            // 13 이상 입력 시 자동으로 오후로 변환
                            if (inputHour >= 13 && inputHour <= 23) {
                              displayHour = inputHour - 12;
                              newAmpm = "오후";
                            } else if (inputHour === 12) {
                              displayHour = 12;
                              newAmpm = "오후";
                            } else if (inputHour >= 0 && inputHour <= 11) {
                              displayHour = inputHour;
                              newAmpm = inputHour === 0 ? "오전" : ampm;
                            }
                            
                            if (inputHour < 0) displayHour = 0;
                            if (inputHour > 23) displayHour = 11;
                            
                            const newHour = newAmpm === "오후" ? (displayHour === 12 ? 12 : displayHour + 12) : (displayHour === 0 ? 0 : displayHour);
                            saveEvent(event.id, { hour: newHour, ampm: newAmpm });
                          }}
                          style={{ width: "80px", padding: "0.5rem", border: "1px solid #ddd", borderRadius: "6px" }}
                          placeholder="시"
                        />
                        <span>:</span>
                        <input
                          type="number"
                          min="0"
                          max="59"
                          value={minute}
                          onChange={(e) => {
                            const newMinute = Math.min(59, Math.max(0, parseInt(e.target.value) || 0));
                            saveEvent(event.id, { minute: newMinute });
                          }}
                          style={{ width: "80px", padding: "0.5rem", border: "1px solid #ddd", borderRadius: "6px" }}
                          placeholder="분"
                        />
                      </div>
                      <div style={{ marginBottom: "0.75rem" }}>
                        <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.875rem", fontWeight: "600" }}>색상:</label>
                        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                          {colorOptions.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => saveEvent(event.id, { color: opt.value })}
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "6px",
                                border: color === opt.value ? "3px solid #333" : "2px solid #ddd",
                                background: opt.value,
                                cursor: "pointer",
                                boxShadow: color === opt.value ? "0 2px 4px rgba(0,0,0,0.2)" : "none"
                              }}
                              title={opt.name}
                            />
                          ))}
                        </div>
                      </div>
                      <textarea
                        value={event.description || ""}
                        onChange={(e) => saveEvent(event.id, { description: e.target.value })}
                        placeholder="메모 입력..."
                        rows={3}
                        style={{ width: "100%", padding: "0.75rem", border: "1px solid #ddd", borderRadius: "6px", resize: "vertical", marginBottom: "0.75rem" }}
                      />
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          onClick={() => {
                            handleUpdate({ ...block.props, events: events });
                            setEventModal(null);
                          }}
                          style={{ flex: 1, padding: "0.75rem 1rem", background: "#00aa44", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.95rem", fontWeight: "600", transition: "all 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.background = "#008833"}
                          onMouseLeave={(e) => e.currentTarget.style.background = "#00aa44"}
                        >
                          저장
                        </button>
                        <button
                          onClick={() => deleteEvent(event.id)}
                          style={{ padding: "0.75rem 1rem", background: "#ff4444", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.875rem", transition: "all 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.background = "#cc3333"}
                          onMouseLeave={(e) => e.currentTarget.style.background = "#ff4444"}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <button
              onClick={addNewEvent}
              style={{ width: "100%", padding: "0.875rem", background: "#0066cc", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "0.95rem", fontWeight: "600", transition: "all 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#0052a3"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#0066cc"}
            >
              + 이벤트 추가
            </button>
          </div>
        )}
      </div>
    );
  }

  if (block.type === "gallery") {
    const rows = (block.props.rows as any[]) || [];
    const columns = (block.props.columns as number) || 3;
    const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());

    const addRow = () => {
      const newRows = [...rows, Array(columns).fill(null).map(() => ({ id: Date.now().toString() + Math.random(), title: "", description: "", status: "" }))];
      handleUpdate({ ...block.props, rows: newRows });
    };

    const updateCell = (rowIdx: number, colIdx: number, updates: any) => {
      const newRows = rows.map((row, rIdx) => {
        if (rIdx === rowIdx) {
          const newRow = [...row];
          if (!newRow[colIdx]) {
            newRow[colIdx] = { id: Date.now().toString() + Math.random(), title: "", description: "", status: "" };
          }
          newRow[colIdx] = { ...newRow[colIdx], ...updates };
          return newRow;
        }
        return row;
      });
      handleUpdate({ ...block.props, rows: newRows });
    };

    const deleteCell = (rowIdx: number, colIdx: number) => {
      const newRows = rows.map((row, rIdx) => {
        if (rIdx === rowIdx) {
          const newRow = [...row];
          newRow[colIdx] = null;
          return newRow;
        }
        return row;
      });
      handleUpdate({ ...block.props, rows: newRows });
    };

    const mergeCells = () => {
      if (selectedCells.size < 2) return;
      const cellIds = Array.from(selectedCells);
      const positions = cellIds.map(id => {
        const [r, c] = id.split("-").map(Number);
        return { row: r, col: c };
      });
      const minRow = Math.min(...positions.map(p => p.row));
      const maxRow = Math.max(...positions.map(p => p.row));
      const minCol = Math.min(...positions.map(p => p.col));
      const maxCol = Math.max(...positions.map(p => p.col));
      
      const newRows = rows.map((row, rIdx) => {
        if (rIdx < minRow || rIdx > maxRow) return row;
        return row.map((cell: any, cIdx: number) => {
          if (cIdx < minCol || cIdx > maxCol) return cell;
          if (rIdx === minRow && cIdx === minCol) {
            return { ...cell, merged: true, rowSpan: maxRow - minRow + 1, colSpan: maxCol - minCol + 1 };
          }
          return null;
        });
      });
      handleUpdate({ ...block.props, rows: newRows });
      setSelectedCells(new Set());
    };

    const splitCell = (rowIdx: number, colIdx: number) => {
      const cell = rows[rowIdx]?.[colIdx];
      if (!cell || !cell.merged) return;
      
      const rowSpan = cell.rowSpan || 1;
      const colSpan = cell.colSpan || 1;
      const newRows = rows.map((row, rIdx) => {
        if (rIdx < rowIdx || rIdx >= rowIdx + rowSpan) return row;
        return row.map((c: any, cIdx: number) => {
          if (cIdx < colIdx || cIdx >= colIdx + colSpan) return c;
          if (rIdx === rowIdx && cIdx === colIdx) {
            return { ...cell, merged: false, rowSpan: undefined, colSpan: undefined };
          }
          return { id: Date.now().toString() + Math.random(), title: "", description: "", status: "" };
        });
      });
      handleUpdate({ ...block.props, rows: newRows });
    };

    const toggleCellSelection = (rowIdx: number, colIdx: number) => {
      const cellId = `${rowIdx}-${colIdx}`;
      const newSelected = new Set(selectedCells);
      if (newSelected.has(cellId)) {
        newSelected.delete(cellId);
      } else {
        newSelected.add(cellId);
      }
      setSelectedCells(newSelected);
    };

    const addColumn = () => {
      handleUpdate({ ...block.props, columns: columns + 1 });
    };

    const removeColumn = () => {
      if (columns > 1) {
        handleUpdate({ ...block.props, columns: columns - 1 });
      }
    };

    return (
      <div className="gallery-block" style={{ margin: "1.5rem 0", padding: "1.5rem", background: "white", border: "1px solid #e0e0e0", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600", color: "#333", flex: "1 1 auto" }}>🖼️ 갤러리 (데이터베이스)</h3>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <button 
              onClick={removeColumn}
              style={{ 
                padding: "0.5rem 1rem", 
                fontSize: "0.875rem", 
                cursor: "pointer",
                background: "#f5f5f5",
                border: "1px solid #ddd",
                borderRadius: "6px",
                color: "#333",
                transition: "all 0.2s",
                whiteSpace: "nowrap"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#e8e8e8"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#f5f5f5"}
            >
              - 열 제거
            </button>
            <button 
              onClick={addColumn}
              style={{ 
                padding: "0.5rem 1rem", 
                fontSize: "0.875rem", 
                cursor: "pointer",
                background: "#f5f5f5",
                border: "1px solid #ddd",
                borderRadius: "6px",
                color: "#333",
                transition: "all 0.2s",
                whiteSpace: "nowrap"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#e8e8e8"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#f5f5f5"}
            >
              + 열 추가
            </button>
            <button 
              onClick={addRow}
              style={{ 
                padding: "0.5rem 1rem", 
                fontSize: "0.875rem", 
                cursor: "pointer",
                background: "#f5f5f5",
                border: "1px solid #ddd",
                borderRadius: "6px",
                color: "#333",
                transition: "all 0.2s",
                whiteSpace: "nowrap"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#e8e8e8"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#f5f5f5"}
            >
              + 행 추가
            </button>
            {selectedCells.size >= 2 && (
              <button 
                onClick={mergeCells}
                style={{ 
                  padding: "0.5rem 1rem", 
                  fontSize: "0.875rem", 
                  cursor: "pointer",
                  background: "#0066cc",
                  border: "none",
                  borderRadius: "6px",
                  color: "white",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                  boxShadow: "0 2px 4px rgba(0,102,204,0.3)"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#0052a3"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#0066cc"}
              >
                병합
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(block.id)}
                style={{
                  background: "#ff4444",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#cc3333"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#ff4444"}
                title="블록 삭제"
              >
                삭제
              </button>
            )}
          </div>
        </div>
        {rows.length === 0 ? (
          <div style={{ color: "#999", textAlign: "center", padding: "2rem" }}>
            행을 추가하세요
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "white" }}>
              <tbody>
                {rows.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    {Array(columns).fill(null).map((_, colIdx) => {
                      // 병합된 셀의 경우, 첫 번째 셀만 렌더링
                      let shouldRender = true;
                      for (let r = 0; r < rowIdx; r++) {
                        const prevCell = rows[r]?.[colIdx];
                        if (prevCell?.merged && prevCell.rowSpan && r + prevCell.rowSpan > rowIdx) {
                          shouldRender = false;
                          break;
                        }
                      }
                      for (let c = 0; c < colIdx; c++) {
                        const prevCell = row?.[c];
                        if (prevCell?.merged && prevCell.colSpan && c + prevCell.colSpan > colIdx) {
                          shouldRender = false;
                          break;
                        }
                      }
                      
                      if (!shouldRender) {
                        return null;
                      }
                      
                      const cell = row?.[colIdx];
                      const cellId = `${rowIdx}-${colIdx}`;
                      const isSelected = selectedCells.has(cellId);
                      const isMerged = cell?.merged;
                      const rowSpan = cell?.rowSpan || 1;
                      const colSpan = cell?.colSpan || 1;
                      
                      return (
                        <td
                          key={colIdx}
                          rowSpan={isMerged ? rowSpan : undefined}
                          colSpan={isMerged ? colSpan : undefined}
                          onClick={() => toggleCellSelection(rowIdx, colIdx)}
                          style={{
                            border: "1px solid #e0e0e0",
                            padding: "0.75rem",
                            background: isSelected ? "#e3f2fd" : "white",
                            cursor: "pointer",
                            minWidth: "150px",
                            verticalAlign: "top"
                          }}
                        >
                          {cell ? (
                            <div>
                              <input
                                type="text"
                                value={cell.title || ""}
                                onChange={(e) => updateCell(rowIdx, colIdx, { title: e.target.value })}
                                placeholder="제목"
                                style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem", border: "1px solid #ddd", borderRadius: "4px", fontWeight: "600" }}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <textarea
                                value={cell.description || ""}
                                onChange={(e) => updateCell(rowIdx, colIdx, { description: e.target.value })}
                                placeholder="설명"
                                rows={3}
                                style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem", border: "1px solid #ddd", borderRadius: "4px", resize: "vertical", fontSize: "0.875rem" }}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <select
                                value={cell.status || ""}
                                onChange={(e) => updateCell(rowIdx, colIdx, { status: e.target.value })}
                                style={{ width: "100%", padding: "0.5rem", border: "1px solid #ddd", borderRadius: "4px", fontSize: "0.875rem" }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <option value="">상태 선택</option>
                                <option value="진행중">진행중</option>
                                <option value="완료">완료</option>
                                <option value="보류">보류</option>
                              </select>
                              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
                                {isMerged && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      splitCell(rowIdx, colIdx);
                                    }}
                                    style={{ 
                                      padding: "0.5rem 0.75rem", 
                                      fontSize: "0.8rem", 
                                      background: "#ffaa00", 
                                      color: "white", 
                                      border: "none", 
                                      borderRadius: "4px", 
                                      cursor: "pointer",
                                      transition: "all 0.2s",
                                      boxShadow: "0 1px 3px rgba(255,170,0,0.3)"
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = "#e69900"}
                                    onMouseLeave={(e) => e.currentTarget.style.background = "#ffaa00"}
                                  >
                                    분리
                                  </button>
                                )}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteCell(rowIdx, colIdx);
                                  }}
                                  style={{ 
                                    padding: "0.5rem 0.75rem", 
                                    fontSize: "0.8rem", 
                                    background: "#ff4444", 
                                    color: "white", 
                                    border: "none", 
                                    borderRadius: "4px", 
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    boxShadow: "0 1px 3px rgba(255,68,68,0.3)"
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.style.background = "#cc3333"}
                                  onMouseLeave={(e) => e.currentTarget.style.background = "#ff4444"}
                                >
                                  셀 삭제
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div style={{ color: "#999", fontSize: "0.875rem", textAlign: "center", padding: "1rem" }}>
                              빈 칸
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  return null;
}

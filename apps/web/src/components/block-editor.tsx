"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useState, useRef } from "react";
import { BlockRenderer } from "./block-renderer";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

type Block = {
  id: string;
  type: string;
  props: Record<string, unknown>;
  position: number;
};

type BlockEditorProps = {
  token: string | null;
  pageId: string;
  blocks: Block[];
  onBlockUpdate?: (blockId: string, props: Record<string, unknown>) => void;
  onBlockCreate?: (type: string, props: Record<string, unknown>) => void;
  onBlockDelete?: (blockId: string) => void;
  onBlocksReorder?: (blockIds: string[]) => void;
};

export function BlockEditor({ token, pageId, blocks, onBlockUpdate, onBlockCreate, onBlockDelete, onBlocksReorder }: BlockEditorProps) {
  const [mounted, setMounted] = useState(false);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ top: 0, left: 0 });
  const [slashQuery, setSlashQuery] = useState("");
  const lastPageIdRef = useRef<string | null>(null);
  const isUpdatingRef = useRef(false);
  const slashMenuRef = useRef<HTMLDivElement>(null);
  const lastSavedContentRef = useRef<string>("");
  const userIsTypingRef = useRef(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (slashMenuRef.current && !slashMenuRef.current.contains(event.target as Node)) {
        setShowSlashMenu(false);
      }
    };

    if (showSlashMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showSlashMenu]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "시작하려면 '/'를 입력하세요..."
      })
    ],
    content: "",
    onUpdate: ({ editor }) => {
      if (!token || !onBlockUpdate || isUpdatingRef.current) return;
      
      const html = editor.getHTML();
      const text = editor.getText();
      
      // 사용자가 입력 중임을 표시
      userIsTypingRef.current = true;
      
      // 이전 타이머가 있으면 취소
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      
      // 디바운싱: 800ms 후에 저장
      saveTimeoutRef.current = setTimeout(() => {
        const firstBlock = blocks.find((b) => b.type === "paragraph");
        if (firstBlock) {
          const currentHtml = editor.getHTML();
          const currentText = editor.getText();
          
          // 마지막 저장된 내용과 다를 때만 저장
          if (currentHtml !== lastSavedContentRef.current) {
            isUpdatingRef.current = true;
            lastSavedContentRef.current = currentHtml;
            
            onBlockUpdate(firstBlock.id, { text: currentText, html: currentHtml });
            
            // 저장 후 플래그 해제
            setTimeout(() => {
              userIsTypingRef.current = false;
              isUpdatingRef.current = false;
            }, 200);
          } else {
            userIsTypingRef.current = false;
          }
        }
        saveTimeoutRef.current = null;
      }, 800);
    },
    onSelectionUpdate: ({ editor }) => {
      const { from } = editor.state.selection;
      const textBefore = editor.state.doc.textBetween(Math.max(0, from - 20), from);
      const match = textBefore.match(/\/(\w*)$/);
      
      if (match) {
        const rect = editor.view.coordsAtPos(from);
        setSlashMenuPosition({ top: rect.top + 20, left: rect.left });
        setSlashQuery(match[1]);
        setShowSlashMenu(true);
      } else {
        setShowSlashMenu(false);
      }
    }
  });

  useEffect(() => {
    if (!editor || !mounted) return;

    // 페이지가 변경된 경우에만 내용 로드
    if (lastPageIdRef.current !== pageId) {
      lastPageIdRef.current = pageId;
      const firstParagraphBlock = blocks.find((b) => b.type === "paragraph");
      const content = firstParagraphBlock
        ? `<p>${String(firstParagraphBlock.props.text ?? "").trim()}</p>`
        : "<p></p>";
      
      isUpdatingRef.current = true;
      lastSavedContentRef.current = content;
      editor.commands.setContent(content);
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 100);
      return;
    }

    // 같은 페이지인 경우: 사용자가 입력 중이거나 에디터가 포커스를 가지고 있으면 절대 덮어쓰지 않음
    if (userIsTypingRef.current || editor.isFocused || isUpdatingRef.current) {
      return;
    }

    // 블록이 업데이트되었지만 사용자가 입력 중이 아닐 때만 동기화
    const firstParagraphBlock = blocks.find((b) => b.type === "paragraph");
    if (!firstParagraphBlock) return;

    const savedText = String(firstParagraphBlock.props.text ?? "").trim();
    const savedHtml = String(firstParagraphBlock.props.html ?? savedText);
    const expectedContent = savedHtml || (savedText ? `<p>${savedText}</p>` : "<p></p>");
    const currentContent = editor.getHTML();

    // 저장된 내용과 현재 내용이 다르고, 마지막 저장된 내용과도 다를 때만 동기화
    if (currentContent !== expectedContent && expectedContent !== lastSavedContentRef.current) {
      isUpdatingRef.current = true;
      lastSavedContentRef.current = expectedContent;
      editor.commands.setContent(expectedContent);
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 100);
    }
  }, [editor, blocks, pageId, mounted]);

  const handleSlashCommand = async (command: string) => {
    if (!editor || !onBlockCreate || !token) return;
    
    const commands: Record<string, { type: string; label: string; icon: string }> = {
      table: { type: "table", label: "표", icon: "📊" },
      board: { type: "board", label: "보드", icon: "📋" },
      list: { type: "list", label: "리스트", icon: "📝" },
      timeline: { type: "timeline", label: "타임라인", icon: "⏱️" },
      calendar: { type: "calendar_view", label: "캘린더", icon: "📅" },
      gallery: { type: "gallery", label: "갤러리", icon: "��️" }
    };

    const cmd = commands[command];
    if (cmd) {
      const { from } = editor.state.selection;
      const textBefore = editor.state.doc.textBetween(Math.max(0, from - 20), from);
      const match = textBefore.match(/\/(\w*)$/);
      
      if (match) {
        editor.commands.deleteRange({ from: from - match[0].length, to: from });
        onBlockCreate(cmd.type, { title: cmd.label });
      }
    }
    setShowSlashMenu(false);
  };

  const slashCommands = [
    { key: "table", label: "표", icon: "📊" },
    { key: "board", label: "보드", icon: "📋" },
    { key: "list", label: "리스트", icon: "📝" },
    { key: "timeline", label: "타임라인", icon: "⏱️" },
    { key: "calendar", label: "캘린더", icon: "📅" },
    { key: "gallery", label: "갤러리", icon: "🖼️" }
  ].filter(cmd => 
    cmd.key.includes(slashQuery.toLowerCase()) || 
    cmd.label.includes(slashQuery)
  );

  const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null);
  const [dragOverBlockId, setDragOverBlockId] = useState<string | null>(null);

  if (!mounted || !editor) {
    return <div className="editor-loading">에디터 로딩 중...</div>;
  }
  
  // 모든 블록을 position 순서대로 정렬 (높은 position이 위에)
  const allBlocks = [...blocks].sort((a, b) => b.position - a.position);
  const nonParagraphBlocks = blocks.filter(b => b.type !== "paragraph").sort((a, b) => b.position - a.position);
  const paragraphBlocks = blocks.filter(b => b.type === "paragraph").sort((a, b) => b.position - a.position);
  
  // paragraph 블록이 있는지 확인 (에디터 표시용)
  const hasParagraphBlock = paragraphBlocks.length > 0;
  const firstParagraphBlock = paragraphBlocks[0];

  const handleDragStart = (e: React.DragEvent, blockId: string) => {
    setDraggedBlockId(blockId);
    e.dataTransfer.effectAllowed = "move";
    // UUID가 표시되지 않도록 빈 이미지 사용
    const dragImage = document.createElement("div");
    dragImage.style.position = "absolute";
    dragImage.style.top = "-9999px";
    dragImage.style.width = "1px";
    dragImage.style.height = "1px";
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    setTimeout(() => document.body.removeChild(dragImage), 0);
    // 데이터는 설정하되 표시되지 않도록
    e.dataTransfer.setData("application/x-block-id", blockId);
  };

  const handleDragOver = (e: React.DragEvent, blockId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (draggedBlockId && draggedBlockId !== blockId) {
      setDragOverBlockId(blockId);
    }
  };

  const handleDragLeave = () => {
    setDragOverBlockId(null);
  };

  const handleDrop = (e: React.DragEvent, targetBlockId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const draggedId = draggedBlockId || e.dataTransfer.getData("application/x-block-id");
    if (!draggedId || !onBlocksReorder || draggedId === targetBlockId) {
      setDraggedBlockId(null);
      setDragOverBlockId(null);
      return;
    }

    // 모든 블록의 현재 순서 (paragraph 포함)
    const currentOrder = allBlocks.map(b => b.id);
    const draggedIndex = currentOrder.indexOf(draggedId);
    const targetIndex = currentOrder.indexOf(targetBlockId);

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedBlockId(null);
      setDragOverBlockId(null);
      return;
    }

    const newOrder = [...currentOrder];
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedId);

    onBlocksReorder(newOrder);
    setDraggedBlockId(null);
    setDragOverBlockId(null);
  };

  const handleDragEnd = () => {
    setDraggedBlockId(null);
    setDragOverBlockId(null);
  };

  return (
    <div className="block-editor" style={{ position: "relative" }}>
      {/* 드롭 영역 - 에디터 위에 */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (draggedBlockId && allBlocks.length > 0) {
            const firstBlock = allBlocks[0];
            if (firstBlock.id !== draggedBlockId) {
              setDragOverBlockId(firstBlock.id);
            }
          }
        }}
        onDragLeave={() => {
          if (!draggedBlockId) setDragOverBlockId(null);
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const draggedId = draggedBlockId || e.dataTransfer.getData("application/x-block-id");
          if (draggedId && onBlocksReorder && allBlocks.length > 0) {
            const currentOrder = allBlocks.map(b => b.id);
            const draggedIndex = currentOrder.indexOf(draggedId);
            if (draggedIndex !== -1 && draggedIndex !== 0) {
              const newOrder = [...currentOrder];
              newOrder.splice(draggedIndex, 1);
              newOrder.unshift(draggedId);
              onBlocksReorder(newOrder);
            }
          }
          setDraggedBlockId(null);
          setDragOverBlockId(null);
        }}
        style={{
          minHeight: dragOverBlockId === null && draggedBlockId ? "2rem" : "0",
          borderTop: dragOverBlockId === null && draggedBlockId ? "3px solid #0066cc" : "3px solid transparent",
          transition: "all 0.2s"
        }}
      />
      
      {/* 모든 블록을 position 순서대로 렌더링 */}
      {allBlocks.map((block) => {
        if (block.type === "paragraph") {
          // Paragraph 블록은 첫 번째 것만 EditorContent로 표시
          if (hasParagraphBlock && block.id === firstParagraphBlock.id) {
            return (
              <div
                key={block.id}
                draggable={hasParagraphBlock}
                onDragStart={(e) => {
                  if (hasParagraphBlock) {
                    handleDragStart(e, firstParagraphBlock.id);
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const draggedId = draggedBlockId || e.dataTransfer.getData("application/x-block-id");
                  if (draggedId && onBlocksReorder && hasParagraphBlock) {
                    const currentOrder = allBlocks.map(b => b.id);
                    const draggedIndex = currentOrder.indexOf(draggedId);
                    const targetIndex = currentOrder.indexOf(firstParagraphBlock.id);
                    if (draggedIndex !== -1 && targetIndex !== -1 && draggedIndex !== targetIndex) {
                      const newOrder = [...currentOrder];
                      newOrder.splice(draggedIndex, 1);
                      newOrder.splice(targetIndex, 0, draggedId);
                      onBlocksReorder(newOrder);
                    }
                  }
                  setDraggedBlockId(null);
                  setDragOverBlockId(null);
                }}
                style={{
                  opacity: draggedBlockId && hasParagraphBlock && draggedBlockId === firstParagraphBlock.id ? 0.5 : 1,
                  cursor: hasParagraphBlock ? "move" : "default"
                }}
              >
                <EditorContent editor={editor} />
              </div>
            );
          }
          // 다른 paragraph 블록은 렌더링하지 않음 (EditorContent에 모두 포함됨)
          return null;
        } else {
          // Non-paragraph 블록들
          return (
            <div
              key={block.id}
              draggable
              onDragStart={(e) => handleDragStart(e, block.id)}
              onDragOver={(e) => handleDragOver(e, block.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, block.id)}
              onDragEnd={handleDragEnd}
              style={{
                cursor: "move",
                opacity: draggedBlockId === block.id ? 0.5 : 1,
                borderTop: dragOverBlockId === block.id ? "3px solid #0066cc" : "3px solid transparent",
                transition: "all 0.2s",
                marginTop: dragOverBlockId === block.id ? "0.5rem" : "0"
              }}
            >
              <BlockRenderer
                block={block}
                token={token}
                onUpdate={onBlockUpdate}
                onDelete={onBlockDelete}
              />
            </div>
          );
        }
      })}
      
      {/* Paragraph 블록이 없을 때 에디터 표시 */}
      {!hasParagraphBlock && (
        <div
          draggable={false}
          style={{
            cursor: "default"
          }}
        >
          <EditorContent editor={editor} />
        </div>
      )}
      {showSlashMenu && (
        <div
          ref={slashMenuRef}
          className="slash-menu"
          style={{
            position: "fixed",
            top: `${slashMenuPosition.top}px`,
            left: `${slashMenuPosition.left}px`,
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            zIndex: 1000,
            minWidth: "200px",
            maxHeight: "300px",
            overflowY: "auto"
          }}
        >
          {slashCommands.length > 0 ? (
            slashCommands.map((cmd) => (
              <div
                key={cmd.key}
                onClick={() => handleSlashCommand(cmd.key)}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f0f0f0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "white";
                }}
              >
                <span>{cmd.icon}</span>
                <span>{cmd.label}</span>
              </div>
            ))
          ) : (
            <div style={{ padding: "8px 12px", color: "#999" }}>명령어를 찾을 수 없습니다</div>
          )}
        </div>
      )}
    </div>
  );
}

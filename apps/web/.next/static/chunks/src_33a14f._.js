(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_33a14f._.js", {

"[project]/apps/web/src/components/sidebar.tsx [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "Sidebar": ()=>Sidebar
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
"use client";
;
const API_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
function Sidebar({ token, currentPageId, onPageSelect, onCreatePage, refreshTrigger }) {
    _s();
    const [tree, setTree] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const loadTree = async ()=>{
        if (!token) return;
        try {
            const res = await fetch(`${API_URL}/pages/tree`, {
                headers: {
                    "x-user-token": token
                }
            });
            if (res.ok) {
                const data = await res.json();
                setTree(data);
                setExpanded(new Set([
                    data.id
                ]));
            }
        } catch (error) {
            console.error("Failed to load tree", error);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadTree();
    }, [
        token,
        refreshTrigger
    ]);
    const toggleExpand = (pageId)=>{
        setExpanded((prev)=>{
            const next = new Set(prev);
            if (next.has(pageId)) {
                next.delete(pageId);
            } else {
                next.add(pageId);
            }
            return next;
        });
    };
    const renderNode = (node, depth = 0)=>{
        const isExpanded = expanded.has(node.id);
        const hasChildren = node.children.length > 0;
        const isActive = currentPageId === node.id;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `page-item ${isActive ? "active" : ""}`,
                    style: {
                        paddingLeft: `${depth * 1.5 + 0.5}rem`
                    },
                    onClick: ()=>onPageSelect(node.id),
                    children: [
                        hasChildren && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "expand-btn",
                            onClick: (e)=>{
                                e.stopPropagation();
                                toggleExpand(node.id);
                            },
                            children: isExpanded ? "▼" : "▶"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/sidebar.tsx",
                            lineNumber: 71,
                            columnNumber: 13
                        }, this),
                        node.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "page-icon",
                            children: node.icon
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/sidebar.tsx",
                            lineNumber: 81,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "page-title",
                            children: node.title
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/sidebar.tsx",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/sidebar.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this),
                hasChildren && isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "page-children",
                    children: node.children.map((child)=>renderNode(child, depth + 1))
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/sidebar.tsx",
                    lineNumber: 85,
                    columnNumber: 11
                }, this)
            ]
        }, node.id, true, {
            fileName: "[project]/apps/web/src/components/sidebar.tsx",
            lineNumber: 64,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "sidebar",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sidebar-header",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "new-page-btn",
                    onClick: onCreatePage,
                    children: "+ 새 페이지"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/sidebar.tsx",
                    lineNumber: 96,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/sidebar.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "page-tree",
                children: tree && renderNode(tree)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/sidebar.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/sidebar.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
_s(Sidebar, "Xb+kgnG6O1n2J/JNr+adgy2ycis=");
_c = Sidebar;
var _c;
__turbopack_refresh__.register(_c, "Sidebar");

})()),
"[project]/apps/web/src/components/block-editor.tsx [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "BlockEditor": ()=>BlockEditor
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@tiptap/react/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@tiptap/starter-kit/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$placeholder$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@tiptap/extension-placeholder/dist/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$placeholder$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@tiptap/extension-placeholder/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$block$2d$renderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/apps/web/src/components/block-renderer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
const API_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
function BlockEditor({ token, pageId, blocks, onBlockUpdate, onBlockCreate }) {
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSlashMenu, setShowSlashMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [slashMenuPosition, setSlashMenuPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        top: 0,
        left: 0
    });
    const [slashQuery, setSlashQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const lastPageIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])("");
    const isUpdatingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
    }, []);
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEditor"])({
        immediatelyRender: false,
        extensions: [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$placeholder$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].configure({
                placeholder: "시작하려면 '/'를 입력하세요..."
            })
        ],
        content: "",
        onUpdate: ({ editor })=>{
            if (!token || !onBlockUpdate || isUpdatingRef.current) return;
            const text = editor.getText();
            const firstBlock = blocks.find((b)=>b.type === "paragraph");
            if (firstBlock) {
                onBlockUpdate(firstBlock.id, {
                    text
                });
            }
        },
        onSelectionUpdate: ({ editor })=>{
            const { from } = editor.state.selection;
            const textBefore = editor.state.doc.textBetween(Math.max(0, from - 20), from);
            const match = textBefore.match(/\/(\w*)$/);
            if (match) {
                const rect = editor.view.coordsAtPos(from);
                setSlashMenuPosition({
                    top: rect.top + 20,
                    left: rect.left
                });
                setSlashQuery(match[1]);
                setShowSlashMenu(true);
            } else {
                setShowSlashMenu(false);
            }
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!editor || !mounted) return;
        if (lastPageIdRef.current !== pageId) {
            lastPageIdRef.current = pageId;
            const content = blocks.filter((b)=>b.type === "paragraph").map((b)=>`<p>${String(b.props.text ?? "")}</p>`).join("");
            isUpdatingRef.current = true;
            editor.commands.setContent(content || "<p></p>");
            setTimeout(()=>{
                isUpdatingRef.current = false;
            }, 100);
        } else {
            const currentContent = editor.getHTML();
            const expectedContent = blocks.filter((b)=>b.type === "paragraph").map((b)=>`<p>${String(b.props.text ?? "")}</p>`).join("") || "<p></p>";
            if (currentContent !== expectedContent && !isUpdatingRef.current) {
                isUpdatingRef.current = true;
                editor.commands.setContent(expectedContent);
                setTimeout(()=>{
                    isUpdatingRef.current = false;
                }, 100);
            }
        }
    }, [
        editor,
        blocks,
        pageId,
        mounted
    ]);
    const handleSlashCommand = async (command)=>{
        if (!editor || !onBlockCreate || !token) return;
        const commands = {
            table: {
                type: "table",
                label: "표",
                icon: "📊"
            },
            board: {
                type: "board",
                label: "보드",
                icon: "📋"
            },
            list: {
                type: "list",
                label: "리스트",
                icon: "📝"
            },
            timeline: {
                type: "timeline",
                label: "타임라인",
                icon: "⏱️"
            },
            calendar: {
                type: "calendar_view",
                label: "캘린더",
                icon: "📅"
            },
            gallery: {
                type: "gallery",
                label: "갤러리",
                icon: "🖼️"
            }
        };
        const cmd = commands[command];
        if (cmd) {
            const { from } = editor.state.selection;
            const textBefore = editor.state.doc.textBetween(Math.max(0, from - 20), from);
            const match = textBefore.match(/\/(\w*)$/);
            if (match) {
                editor.commands.deleteRange({
                    from: from - match[0].length,
                    to: from
                });
                onBlockCreate(cmd.type, {
                    title: cmd.label
                });
            }
        }
        setShowSlashMenu(false);
    };
    const slashCommands = [
        {
            key: "table",
            label: "표",
            icon: "📊"
        },
        {
            key: "board",
            label: "보드",
            icon: "📋"
        },
        {
            key: "list",
            label: "리스트",
            icon: "📝"
        },
        {
            key: "timeline",
            label: "타임라인",
            icon: "⏱️"
        },
        {
            key: "calendar",
            label: "캘린더",
            icon: "📅"
        },
        {
            key: "gallery",
            label: "갤러리",
            icon: "🖼️"
        }
    ].filter((cmd)=>cmd.key.includes(slashQuery.toLowerCase()) || cmd.label.includes(slashQuery));
    if (!mounted || !editor) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "editor-loading",
            children: "에디터 로딩 중..."
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/block-editor.tsx",
            lineNumber: 142,
            columnNumber: 12
        }, this);
    }
    const nonParagraphBlocks = blocks.filter((b)=>b.type !== "paragraph");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "block-editor",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["EditorContent"], {
                editor: editor
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/block-editor.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this),
            nonParagraphBlocks.map((block)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$block$2d$renderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockRenderer"], {
                    block: block,
                    token: token
                }, block.id, false, {
                    fileName: "[project]/apps/web/src/components/block-editor.tsx",
                    lineNumber: 151,
                    columnNumber: 9
                }, this)),
            showSlashMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "slash-menu",
                style: {
                    position: "absolute",
                    top: `${slashMenuPosition.top}px`,
                    left: `${slashMenuPosition.left}px`,
                    background: "white",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    zIndex: 1000,
                    minWidth: "200px"
                },
                children: slashCommands.map((cmd)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>handleSlashCommand(cmd.key),
                        style: {
                            padding: "8px 12px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                        },
                        onMouseEnter: (e)=>{
                            e.currentTarget.style.background = "#f0f0f0";
                        },
                        onMouseLeave: (e)=>{
                            e.currentTarget.style.background = "white";
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: cmd.icon
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/block-editor.tsx",
                                lineNumber: 190,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: cmd.label
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/block-editor.tsx",
                                lineNumber: 191,
                                columnNumber: 15
                            }, this)
                        ]
                    }, cmd.key, true, {
                        fileName: "[project]/apps/web/src/components/block-editor.tsx",
                        lineNumber: 173,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/block-editor.tsx",
                lineNumber: 158,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/block-editor.tsx",
        lineNumber: 148,
        columnNumber: 5
    }, this);
}
_s(BlockEditor, "lGxfPx8A4etIDMJS3zcwPA8aLHQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEditor"]
    ];
});
_c = BlockEditor;
var _c;
__turbopack_refresh__.register(_c, "BlockEditor");

})()),
"[project]/apps/web/src/components/share-modal.tsx [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ShareModal": ()=>ShareModal
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
"use client";
;
const API_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
function ShareModal({ token, pageId, onClose }) {
    _s();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("invite");
    const handleInvite = async (e)=>{
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
                body: JSON.stringify({
                    email
                })
            });
            if (res.ok) {
                setStatus(`${email} 님을 초대했습니다. 초대된 사용자는 회원가입 후 이 페이지에 접근할 수 있습니다.`);
                setEmail("");
            } else {
                const error = await res.json().catch(()=>({
                        message: "초대에 실패했습니다."
                    }));
                setStatus(error.message ?? "초대에 실패했습니다.");
            }
        } catch (error) {
            setStatus("에러가 발생했습니다.");
        }
    };
    const handleCopyLink = ()=>{
        const link = `${window.location.origin}/workspace?page=${pageId}`;
        navigator.clipboard.writeText(link).then(()=>{
            setStatus("링크가 클립보드에 복사되었습니다.");
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "modal-overlay",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "modal",
            onClick: (e)=>e.stopPropagation(),
            style: {
                maxWidth: "500px"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    children: "페이지 공유"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/share-modal.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        gap: "1rem",
                        marginBottom: "1rem",
                        borderBottom: "1px solid #eee"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setActiveTab("invite"),
                            style: {
                                padding: "0.5rem 1rem",
                                border: "none",
                                background: activeTab === "invite" ? "#f0f0f0" : "transparent",
                                cursor: "pointer"
                            },
                            children: "이메일 초대"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/share-modal.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setActiveTab("link"),
                            style: {
                                padding: "0.5rem 1rem",
                                border: "none",
                                background: activeTab === "link" ? "#f0f0f0" : "transparent",
                                cursor: "pointer"
                            },
                            children: "링크 공유"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/share-modal.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/share-modal.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this),
                activeTab === "invite" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                marginBottom: "1rem",
                                color: "#666",
                                fontSize: "0.9rem"
                            },
                            children: "이메일로 초대하면 해당 사용자가 회원가입 후 이 페이지에 접근할 수 있습니다."
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/share-modal.tsx",
                            lineNumber: 86,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleInvite,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "email",
                                    value: email,
                                    onChange: (e)=>setEmail(e.target.value),
                                    placeholder: "이메일을 입력하세요",
                                    required: true,
                                    style: {
                                        width: "100%",
                                        padding: "0.5rem",
                                        marginBottom: "1rem"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/share-modal.tsx",
                                    lineNumber: 90,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: "button primary",
                                    style: {
                                        width: "100%"
                                    },
                                    children: "초대하기"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/share-modal.tsx",
                                    lineNumber: 98,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/share-modal.tsx",
                            lineNumber: 89,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/share-modal.tsx",
                    lineNumber: 85,
                    columnNumber: 11
                }, this),
                activeTab === "link" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                marginBottom: "1rem",
                                color: "#666",
                                fontSize: "0.9rem"
                            },
                            children: "링크를 공유하면 해당 링크를 가진 사용자가 회원가입 후 이 페이지에 접근할 수 있습니다."
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/share-modal.tsx",
                            lineNumber: 107,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: "0.5rem"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: `${window.location.origin}/workspace?page=${pageId}`,
                                    readOnly: true,
                                    style: {
                                        flex: 1,
                                        padding: "0.5rem"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/share-modal.tsx",
                                    lineNumber: 111,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleCopyLink,
                                    className: "button primary",
                                    children: "복사"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/share-modal.tsx",
                                    lineNumber: 117,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/share-modal.tsx",
                            lineNumber: 110,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/share-modal.tsx",
                    lineNumber: 106,
                    columnNumber: 11
                }, this),
                status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "status",
                    style: {
                        marginTop: "1rem",
                        padding: "0.5rem",
                        background: "#f0f0f0",
                        borderRadius: "4px"
                    },
                    children: status
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/share-modal.tsx",
                    lineNumber: 125,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "button secondary",
                    style: {
                        marginTop: "1rem",
                        width: "100%"
                    },
                    children: "닫기"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/share-modal.tsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/share-modal.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/share-modal.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_s(ShareModal, "DWKbHzKxJFK40HM7yKsv+GirKQQ=");
_c = ShareModal;
var _c;
__turbopack_refresh__.register(_c, "ShareModal");

})()),
"[project]/apps/web/src/app/workspace/page.tsx [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "default": ()=>WorkspacePage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/apps/web/src/components/sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$block$2d$editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/apps/web/src/components/block-editor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$share$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/apps/web/src/components/share-modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
const API_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
function WorkspacePage() {
    _s();
    const [token, setToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [blocks, setBlocks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showCreateModal, setShowCreateModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showShareModal, setShowShareModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newPageTitle, setNewPageTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [sidebarRefresh, setSidebarRefresh] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const stored = localStorage.getItem("auth_token");
        if (stored) {
            setToken(stored);
            loadPersonalPage(stored);
        } else {
            window.location.href = "/my-space";
        }
    }, []);
    const loadPersonalPage = async (tokenValue)=>{
        try {
            const res = await fetch(`${API_URL}/pages/me`, {
                headers: {
                    "x-user-token": tokenValue
                }
            });
            if (res.ok) {
                const data = await res.json();
                setCurrentPage(data);
                loadBlocks(data.id, tokenValue);
            }
        } catch (error) {
            console.error("Failed to load page", error);
        }
    };
    const loadPage = async (pageId)=>{
        if (!token) return;
        try {
            const res = await fetch(`${API_URL}/pages/${pageId}`, {
                headers: {
                    "x-user-token": token
                }
            });
            if (res.ok) {
                const data = await res.json();
                setCurrentPage(data);
                loadBlocks(pageId, token);
            }
        } catch (error) {
            console.error("Failed to load page", error);
        }
    };
    const loadBlocks = async (pageId, tokenValue)=>{
        try {
            const res = await fetch(`${API_URL}/pages/${pageId}/blocks`, {
                headers: {
                    "x-user-token": tokenValue
                }
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
    const handlePageSelect = (pageId)=>{
        loadPage(pageId);
    };
    const handleCreatePage = ()=>{
        setShowCreateModal(true);
    };
    const createPage = async ()=>{
        if (!token || !newPageTitle.trim()) {
            setStatus("페이지 제목을 입력해주세요.");
            return;
        }
        try {
            const res = await fetch(`${API_URL}/pages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-user-token": token
                },
                body: JSON.stringify({
                    title: newPageTitle
                })
            });
            if (res.ok) {
                const data = await res.json();
                setShowCreateModal(false);
                setNewPageTitle("");
                setStatus("페이지가 생성되었습니다.");
                setSidebarRefresh((prev)=>prev + 1);
                loadPage(data.id);
                setTimeout(()=>setStatus(null), 2000);
            } else {
                const error = await res.json().catch(()=>({
                        message: "페이지 생성에 실패했습니다."
                    }));
                setStatus(error.message ?? "페이지 생성에 실패했습니다.");
            }
        } catch (error) {
            console.error("Failed to create page", error);
            setStatus("페이지 생성에 실패했습니다.");
        }
    };
    const handleFileUpload = async (e)=>{
        if (!token || !currentPage || !e.target.files?.[0]) return;
        const file = e.target.files[0];
        setStatus("파일 업로드 중...");
        try {
            const res = await fetch(`${API_URL}/files/upload`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-user-token": token
                },
                body: JSON.stringify({
                    filename: file.name,
                    size: file.size,
                    mimeType: file.type,
                    pageId: currentPage.id
                })
            });
            if (res.ok) {
                setStatus(`${file.name} 파일이 업로드되었습니다.`);
                loadBlocks(currentPage.id, token);
                setTimeout(()=>setStatus(null), 2000);
            } else {
                const error = await res.json().catch(()=>({
                        message: "파일 업로드에 실패했습니다."
                    }));
                setStatus(error.message ?? "파일 업로드에 실패했습니다.");
            }
        } catch (error) {
            console.error("Failed to upload file", error);
            setStatus("파일 업로드에 실패했습니다.");
        }
        e.target.value = "";
    };
    const handleBlockUpdate = async (blockId, props)=>{
        if (!token) return;
        try {
            await fetch(`${API_URL}/pages/blocks/${blockId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-user-token": token
                },
                body: JSON.stringify(props)
            });
        } catch (error) {
            console.error("Failed to update block", error);
        }
    };
    if (!token || !currentPage) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "workspace-loading",
            children: "로딩 중..."
        }, void 0, false, {
            fileName: "[project]/apps/web/src/app/workspace/page.tsx",
            lineNumber: 182,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "workspace-layout",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sidebar"], {
                token: token,
                currentPageId: currentPage.id,
                onPageSelect: handlePageSelect,
                onCreatePage: handleCreatePage,
                refreshTrigger: sidebarRefresh
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "workspace-main",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "page-header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                children: currentPage.title
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                                lineNumber: 196,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "page-actions",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "file-upload-btn",
                                        children: [
                                            "📎 파일 업로드",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "file",
                                                onChange: handleFileUpload,
                                                style: {
                                                    display: "none"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                                                lineNumber: 200,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                                        lineNumber: 198,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "button secondary",
                                        onClick: ()=>setShowShareModal(true),
                                        children: "공유"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                                        lineNumber: 202,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                                lineNumber: 197,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                        lineNumber: 195,
                        columnNumber: 9
                    }, this),
                    status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "status-message",
                        children: status
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                        lineNumber: 207,
                        columnNumber: 20
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "page-content",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$block$2d$editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockEditor"], {
                            token: token,
                            pageId: currentPage.id,
                            blocks: blocks,
                            onBlockUpdate: handleBlockUpdate
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                            lineNumber: 209,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                        lineNumber: 208,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                lineNumber: 194,
                columnNumber: 7
            }, this),
            showCreateModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-overlay",
                onClick: ()=>setShowCreateModal(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: "새 페이지"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                            lineNumber: 220,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: newPageTitle,
                            onChange: (e)=>setNewPageTitle(e.target.value),
                            placeholder: "페이지 제목",
                            autoFocus: true,
                            onKeyDown: (e)=>{
                                if (e.key === "Enter") {
                                    createPage();
                                }
                            }
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                            lineNumber: 221,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "modal-actions",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: createPage,
                                    children: "생성"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                                    lineNumber: 234,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowCreateModal(false),
                                    children: "취소"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                                    lineNumber: 235,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                            lineNumber: 233,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                    lineNumber: 219,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                lineNumber: 218,
                columnNumber: 9
            }, this),
            showShareModal && currentPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$share$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShareModal"], {
                token: token,
                pageId: currentPage.id,
                onClose: ()=>setShowShareModal(false)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                lineNumber: 241,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/app/workspace/page.tsx",
        lineNumber: 186,
        columnNumber: 5
    }, this);
}
_s(WorkspacePage, "vg7C0n7sgBNrDbWYU+vZr+x/BKM=");
_c = WorkspacePage;
var _c;
__turbopack_refresh__.register(_c, "WorkspacePage");

})()),
"[project]/apps/web/src/app/workspace/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {


})()),
}]);

//# sourceMappingURL=src_33a14f._.js.map
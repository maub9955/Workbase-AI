module.exports = {

"[project]/apps/web/src/components/sidebar.tsx [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "Sidebar": ()=>Sidebar
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
"use client";
;
;
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
function Sidebar({ token, currentPageId, onPageSelect, onCreatePage, onCreateSubPage, onDeletePage, onUpdatePageTitle, refreshTrigger }) {
    const [tree, setTree] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
    function PageNode({ node, depth, isExpanded, isActive, expanded, currentPageId, onToggleExpand, onPageSelect, onCreateSubPage, onDeletePage, onUpdatePageTitle }) {
        const [isEditingTitle, setIsEditingTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
        const [editedTitle, setEditedTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(node.title);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
            setEditedTitle(node.title);
        }, [
            node.title
        ]);
        const handleTitleSave = ()=>{
            if (onUpdatePageTitle && editedTitle.trim()) {
                onUpdatePageTitle(node.id, editedTitle.trim());
                setIsEditingTitle(false);
            }
        };
        const hasChildren = node.children.length > 0;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `page-item ${isActive ? "active" : ""}`,
                    style: {
                        paddingLeft: `${depth * 1.5 + 0.5}rem`,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem"
                    },
                    children: [
                        hasChildren && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "expand-btn",
                            onClick: (e)=>{
                                e.stopPropagation();
                                onToggleExpand(node.id);
                            },
                            style: {
                                border: "none",
                                background: "transparent",
                                cursor: "pointer"
                            },
                            children: isExpanded ? "▼" : "▶"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/sidebar.tsx",
                            lineNumber: 116,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem"
                            },
                            onClick: ()=>!isEditingTitle && onPageSelect(node.id),
                            children: [
                                node.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "page-icon",
                                    children: node.icon
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/sidebar.tsx",
                                    lineNumber: 131,
                                    columnNumber: 27
                                }, this),
                                isEditingTitle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: editedTitle,
                                    onChange: (e)=>setEditedTitle(e.target.value),
                                    onKeyDown: (e)=>{
                                        if (e.key === "Enter") {
                                            handleTitleSave();
                                        } else if (e.key === "Escape") {
                                            setEditedTitle(node.title);
                                            setIsEditingTitle(false);
                                        }
                                    },
                                    onBlur: handleTitleSave,
                                    style: {
                                        flex: 1,
                                        padding: "0.25rem 0.5rem",
                                        border: "1px solid #0066cc",
                                        borderRadius: "4px",
                                        fontSize: "0.875rem",
                                        background: "white"
                                    },
                                    autoFocus: true,
                                    onClick: (e)=>e.stopPropagation()
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/sidebar.tsx",
                                    lineNumber: 133,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "page-title",
                                    onDoubleClick: (e)=>{
                                        e.stopPropagation();
                                        setIsEditingTitle(true);
                                    },
                                    style: {
                                        cursor: "text",
                                        flex: 1
                                    },
                                    title: "더블클릭하여 이름 수정",
                                    children: node.title
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/sidebar.tsx",
                                    lineNumber: 158,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/sidebar.tsx",
                            lineNumber: 127,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: "0.25rem",
                                alignItems: "center"
                            },
                            children: [
                                onCreateSubPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: (e)=>{
                                        e.stopPropagation();
                                        onCreateSubPage(node.id);
                                    },
                                    style: {
                                        border: "none",
                                        background: "transparent",
                                        cursor: "pointer",
                                        padding: "0.25rem",
                                        fontSize: "0.875rem",
                                        color: "#666"
                                    },
                                    title: "하위 페이지 추가",
                                    onMouseEnter: (e)=>e.currentTarget.style.color = "#333",
                                    onMouseLeave: (e)=>e.currentTarget.style.color = "#666",
                                    children: "+"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/sidebar.tsx",
                                    lineNumber: 173,
                                    columnNumber: 15
                                }, this),
                                onDeletePage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: (e)=>{
                                        e.stopPropagation();
                                        if (confirm(`"${node.title}" 페이지를 삭제하시겠습니까?`)) {
                                            onDeletePage(node.id);
                                        }
                                    },
                                    style: {
                                        border: "none",
                                        background: "transparent",
                                        cursor: "pointer",
                                        padding: "0.25rem",
                                        fontSize: "0.875rem",
                                        color: "#ff4444"
                                    },
                                    title: "페이지 삭제",
                                    onMouseEnter: (e)=>e.currentTarget.style.color = "#cc3333",
                                    onMouseLeave: (e)=>e.currentTarget.style.color = "#ff4444",
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/sidebar.tsx",
                                    lineNumber: 194,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/sidebar.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/sidebar.tsx",
                    lineNumber: 106,
                    columnNumber: 9
                }, this),
                hasChildren && isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "page-children",
                    children: node.children.map((child)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PageNode, {
                            node: child,
                            depth: depth + 1,
                            isExpanded: expanded.has(child.id),
                            isActive: currentPageId === child.id,
                            expanded: expanded,
                            currentPageId: currentPageId,
                            onToggleExpand: onToggleExpand,
                            onPageSelect: onPageSelect,
                            onCreateSubPage: onCreateSubPage,
                            onDeletePage: onDeletePage,
                            onUpdatePageTitle: onUpdatePageTitle
                        }, child.id, false, {
                            fileName: "[project]/apps/web/src/components/sidebar.tsx",
                            lineNumber: 221,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/sidebar.tsx",
                    lineNumber: 219,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/sidebar.tsx",
            lineNumber: 105,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "sidebar",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sidebar-header",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "new-page-btn",
                    onClick: onCreatePage,
                    children: "+ 새 페이지"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/sidebar.tsx",
                    lineNumber: 245,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/sidebar.tsx",
                lineNumber: 244,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "page-tree",
                children: tree && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PageNode, {
                    node: tree,
                    depth: 0,
                    isExpanded: expanded.has(tree.id),
                    isActive: currentPageId === tree.id,
                    expanded: expanded,
                    currentPageId: currentPageId,
                    onToggleExpand: toggleExpand,
                    onPageSelect: onPageSelect,
                    onCreateSubPage: onCreateSubPage,
                    onDeletePage: onDeletePage,
                    onUpdatePageTitle: onUpdatePageTitle
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/sidebar.tsx",
                    lineNumber: 251,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/sidebar.tsx",
                lineNumber: 249,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/sidebar.tsx",
        lineNumber: 243,
        columnNumber: 5
    }, this);
}

})()),
"[project]/apps/web/src/components/block-renderer.tsx [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "BlockRenderer": ()=>BlockRenderer
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
"use client";
;
;
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
function BlockRenderer({ block, token, onUpdate, onDelete }) {
    const [fileData, setFileData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (block.type === "file" && token) {
            const fileId = block.props.fileId;
            if (fileId) {
                fetch(`${API_URL}/files/${fileId}`, {
                    headers: {
                        "x-user-token": token
                    }
                }).then((res)=>res.json()).then((data)=>setFileData(data)).catch(console.error);
            }
        }
    }, [
        block,
        token
    ]);
    const handleUpdate = (newProps)=>{
        if (onUpdate) {
            // 전체 props를 병합하여 업데이트
            const updatedProps = {
                ...block.props,
                ...newProps
            };
            onUpdate(block.id, updatedProps);
        }
    };
    if (block.type === "file") {
        const mimeType = block.props.mimeType || fileData?.mimeType || "";
        const filename = block.props.filename || fileData?.title || "파일";
        const fileId = block.props.fileId;
        if (mimeType.startsWith("image/")) {
            const imageUrl = `${API_URL}/files/${fileId}/download${token ? `?token=${encodeURIComponent(token)}` : ""}`;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "file-block image-block",
                style: {
                    margin: "1rem 0"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: imageUrl,
                    alt: filename,
                    style: {
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: "4px"
                    },
                    onError: (e)=>{
                        console.error("이미지 로드 실패:", imageUrl);
                        e.currentTarget.style.display = "none";
                    }
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                    lineNumber: 57,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                lineNumber: 56,
                columnNumber: 9
            }, this);
        }
        if (mimeType.startsWith("video/")) {
            const videoUrl = `${API_URL}/files/${fileId}/download${token ? `?token=${encodeURIComponent(token)}` : ""}`;
            const videoRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "file-block video-block",
                style: {
                    margin: "1rem 0",
                    position: "relative"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                        ref: videoRef,
                        controls: true,
                        onDoubleClick: (e)=>{
                            const video = e.currentTarget;
                            const rect = video.getBoundingClientRect();
                            const clickX = e.clientX - rect.left;
                            const width = rect.width;
                            if (clickX < width / 2) {
                                video.currentTime = Math.max(0, video.currentTime - 10);
                            } else {
                                video.currentTime = Math.min(video.duration, video.currentTime + 10);
                            }
                        },
                        style: {
                            maxWidth: "100%",
                            height: "auto",
                            borderRadius: "8px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                        },
                        title: "더블클릭: 왼쪽 10초 뒤로, 오른쪽 10초 앞으로",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                                src: videoUrl,
                                type: mimeType
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this),
                            "비디오를 재생할 수 없습니다."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this),
                    onDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onDelete(block.id),
                        style: {
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
                        },
                        title: "삭제",
                        children: "×"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                        lineNumber: 97,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                lineNumber: 75,
                columnNumber: 9
            }, this);
        }
        if (mimeType.startsWith("audio/")) {
            const audioUrl = `${API_URL}/files/${fileId}/download${token ? `?token=${encodeURIComponent(token)}` : ""}`;
            const [isEditingTitle, setIsEditingTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
            const [editedTitle, setEditedTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(filename);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
                setEditedTitle(filename);
            }, [
                filename
            ]);
            const handleTitleSave = ()=>{
                if (onUpdate && editedTitle.trim()) {
                    handleUpdate({
                        filename: editedTitle.trim()
                    });
                    setIsEditingTitle(false);
                }
            };
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "file-block audio-block",
                style: {
                    margin: "1rem 0",
                    padding: "1rem",
                    background: "white",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    position: "relative"
                },
                children: [
                    onDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onDelete(block.id),
                        style: {
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
                        },
                        title: "삭제",
                        children: "×"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                        lineNumber: 144,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: "0.75rem"
                        },
                        children: isEditingTitle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: "0.5rem",
                                alignItems: "center"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: editedTitle,
                                    onChange: (e)=>setEditedTitle(e.target.value),
                                    onKeyDown: (e)=>{
                                        if (e.key === "Enter") {
                                            handleTitleSave();
                                        } else if (e.key === "Escape") {
                                            setEditedTitle(filename);
                                            setIsEditingTitle(false);
                                        }
                                    },
                                    style: {
                                        flex: 1,
                                        padding: "0.5rem",
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        fontSize: "1rem",
                                        fontWeight: "600"
                                    },
                                    autoFocus: true
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 171,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleTitleSave,
                                    style: {
                                        padding: "0.5rem 1rem",
                                        background: "#00aa44",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        fontSize: "0.875rem"
                                    },
                                    children: "저장"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 186,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setEditedTitle(filename);
                                        setIsEditingTitle(false);
                                    },
                                    style: {
                                        padding: "0.5rem 1rem",
                                        background: "#999",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        fontSize: "0.875rem"
                                    },
                                    children: "취소"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 192,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                            lineNumber: 170,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: "0.5rem",
                                alignItems: "center"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    style: {
                                        margin: 0,
                                        fontSize: "1.1rem",
                                        fontWeight: "600",
                                        color: "#333",
                                        flex: 1
                                    },
                                    children: [
                                        "🎵 ",
                                        filename
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 204,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsEditingTitle(true),
                                    style: {
                                        padding: "0.25rem 0.5rem",
                                        background: "#f5f5f5",
                                        border: "1px solid #ddd",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        fontSize: "0.875rem"
                                    },
                                    children: "제목 수정"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 205,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                            lineNumber: 203,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                        lineNumber: 168,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                        controls: true,
                        style: {
                            width: "100%",
                            marginTop: "0.5rem"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                                src: audioUrl,
                                type: mimeType
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                lineNumber: 218,
                                columnNumber: 13
                            }, this),
                            "오디오를 재생할 수 없습니다."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                        lineNumber: 214,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                lineNumber: 142,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "file-block",
            style: {
                margin: "1rem 0",
                padding: "0.5rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                position: "relative"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: `${API_URL}/files/${fileId}/download${token ? `?token=${token}` : ""}`,
                    download: true,
                    style: {
                        textDecoration: "none",
                        color: "#0066cc"
                    },
                    children: [
                        "📎 ",
                        filename
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                    lineNumber: 227,
                    columnNumber: 9
                }, this),
                onDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>onDelete(block.id),
                    style: {
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
                    },
                    title: "삭제",
                    children: "×"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                    lineNumber: 235,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
            lineNumber: 226,
            columnNumber: 7
        }, this);
    }
    if (block.type === "table") {
        const rows = block.props.rows || [];
        const columns = block.props.columns || [
            "열 1",
            "열 2",
            "열 3"
        ];
        const addRow = ()=>{
            const newRows = [
                ...rows,
                columns.map(()=>"")
            ];
            handleUpdate({
                ...block.props,
                rows: newRows
            });
        };
        const addColumn = ()=>{
            const newColumns = [
                ...columns,
                ""
            ];
            const newRows = rows.map((row)=>[
                    ...row,
                    ""
                ]);
            handleUpdate({
                ...block.props,
                columns: newColumns,
                rows: newRows
            });
        };
        const updateColumn = (colIdx, value)=>{
            const newColumns = [
                ...columns
            ];
            newColumns[colIdx] = value;
            handleUpdate({
                ...block.props,
                columns: newColumns
            });
        };
        const updateCell = (rowIdx, colIdx, value)=>{
            const newRows = [
                ...rows
            ];
            if (!newRows[rowIdx]) {
                newRows[rowIdx] = columns.map(()=>"");
            }
            newRows[rowIdx][colIdx] = value;
            handleUpdate({
                ...block.props,
                rows: newRows
            });
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "table-block",
            style: {
                margin: "1.5rem 0",
                padding: "1.5rem",
                background: "white",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                position: "relative"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1rem"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                margin: 0,
                                fontSize: "1.1rem",
                                fontWeight: "600",
                                color: "#333"
                            },
                            children: "📊 표"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                            lineNumber: 295,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: "0.5rem",
                                alignItems: "center"
                            },
                            children: [
                                onDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onDelete(block.id),
                                    style: {
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
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.background = "#cc3333",
                                    onMouseLeave: (e)=>e.currentTarget.style.background = "#ff4444",
                                    title: "블록 삭제",
                                    children: "삭제"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 298,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: addColumn,
                                    style: {
                                        padding: "0.5rem 1rem",
                                        fontSize: "0.875rem",
                                        cursor: "pointer",
                                        background: "#f5f5f5",
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        color: "#333",
                                        transition: "all 0.2s"
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.background = "#e8e8e8",
                                    onMouseLeave: (e)=>e.currentTarget.style.background = "#f5f5f5",
                                    children: "+ 열 추가"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 319,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: addRow,
                                    style: {
                                        padding: "0.5rem 1rem",
                                        fontSize: "0.875rem",
                                        cursor: "pointer",
                                        background: "#f5f5f5",
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        color: "#333",
                                        transition: "all 0.2s"
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.background = "#e8e8e8",
                                    onMouseLeave: (e)=>e.currentTarget.style.background = "#f5f5f5",
                                    children: "+ 행 추가"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 336,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                            lineNumber: 296,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                    lineNumber: 294,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        overflowX: "auto"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        style: {
                            width: "100%",
                            borderCollapse: "collapse",
                            background: "white"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: columns.map((col, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            style: {
                                                border: "1px solid #e0e0e0",
                                                padding: "0.75rem",
                                                textAlign: "left",
                                                background: "#f8f9fa",
                                                fontWeight: "600"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: col,
                                                onChange: (e)=>updateColumn(idx, e.target.value),
                                                style: {
                                                    width: "100%",
                                                    border: "none",
                                                    outline: "none",
                                                    background: "transparent",
                                                    fontWeight: "600",
                                                    color: "#333"
                                                },
                                                placeholder: "열 이름"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                lineNumber: 361,
                                                columnNumber: 21
                                            }, this)
                                        }, idx, false, {
                                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                            lineNumber: 360,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 358,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                lineNumber: 357,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: rows.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        colSpan: columns.length,
                                        style: {
                                            border: "1px solid #e0e0e0",
                                            padding: "2rem",
                                            textAlign: "center",
                                            color: "#999"
                                        },
                                        children: "행을 추가하세요"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                        lineNumber: 375,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 374,
                                    columnNumber: 17
                                }, this) : rows.map((row, rowIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        style: {
                                            transition: "background 0.2s"
                                        },
                                        onMouseEnter: (e)=>e.currentTarget.style.background = "#f8f9fa",
                                        onMouseLeave: (e)=>e.currentTarget.style.background = "white",
                                        children: columns.map((_, colIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                style: {
                                                    border: "1px solid #e0e0e0",
                                                    padding: "0.75rem"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: row[colIdx] || "",
                                                    onChange: (e)=>updateCell(rowIdx, colIdx, e.target.value),
                                                    style: {
                                                        width: "100%",
                                                        border: "none",
                                                        outline: "none",
                                                        background: "transparent",
                                                        color: "#333"
                                                    },
                                                    placeholder: ""
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                    lineNumber: 384,
                                                    columnNumber: 25
                                                }, this)
                                            }, colIdx, false, {
                                                fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                lineNumber: 383,
                                                columnNumber: 23
                                            }, this))
                                    }, rowIdx, false, {
                                        fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                        lineNumber: 381,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                lineNumber: 372,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                        lineNumber: 356,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                    lineNumber: 355,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
            lineNumber: 293,
            columnNumber: 7
        }, this);
    }
    if (block.type === "board") {
        const columns = block.props.columns || [
            {
                id: "todo",
                title: "할 일",
                items: []
            },
            {
                id: "in-progress",
                title: "진행 중",
                items: []
            },
            {
                id: "done",
                title: "완료",
                items: []
            }
        ];
        const addItem = (columnId)=>{
            const newColumns = columns.map((col)=>{
                if (col.id === columnId) {
                    return {
                        ...col,
                        items: [
                            ...col.items || [],
                            {
                                id: Date.now().toString(),
                                title: "새 항목",
                                description: ""
                            }
                        ]
                    };
                }
                return col;
            });
            handleUpdate({
                ...block.props,
                columns: newColumns
            });
        };
        const updateItem = (columnId, itemId, updates)=>{
            const newColumns = columns.map((col)=>{
                if (col.id === columnId) {
                    return {
                        ...col,
                        items: (col.items || []).map((item)=>item.id === itemId ? {
                                ...item,
                                ...updates
                            } : item)
                    };
                }
                return col;
            });
            handleUpdate({
                ...block.props,
                columns: newColumns
            });
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "board-block",
            style: {
                margin: "1.5rem 0",
                padding: "1.5rem",
                background: "white",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                position: "relative"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1.5rem"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                margin: 0,
                                fontSize: "1.1rem",
                                fontWeight: "600",
                                color: "#333"
                            },
                            children: "📋 보드"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                            lineNumber: 441,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: "0.5rem",
                                alignItems: "center"
                            },
                            children: onDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onDelete(block.id),
                                style: {
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
                                },
                                onMouseEnter: (e)=>e.currentTarget.style.background = "#cc3333",
                                onMouseLeave: (e)=>e.currentTarget.style.background = "#ff4444",
                                title: "블록 삭제",
                                children: "삭제"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                lineNumber: 444,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                            lineNumber: 442,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                    lineNumber: 440,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        gap: "1rem",
                        overflowX: "auto",
                        paddingBottom: "0.5rem"
                    },
                    children: columns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                minWidth: "280px",
                                background: "#f8f9fa",
                                borderRadius: "8px",
                                padding: "1rem",
                                boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    style: {
                                        margin: "0 0 1rem 0",
                                        fontSize: "0.95rem",
                                        fontWeight: "600",
                                        color: "#333",
                                        paddingBottom: "0.5rem",
                                        borderBottom: "2px solid #e0e0e0"
                                    },
                                    children: col.title
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 470,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        minHeight: "150px"
                                    },
                                    children: [
                                        col.items && col.items.length > 0 ? col.items.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: "white",
                                                    padding: "0.75rem",
                                                    marginBottom: "0.75rem",
                                                    borderRadius: "6px",
                                                    border: "1px solid #e0e0e0",
                                                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                                                    transition: "all 0.2s"
                                                },
                                                onMouseEnter: (e)=>e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)",
                                                onMouseLeave: (e)=>e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.05)",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: item.title || "",
                                                        onChange: (e)=>updateItem(col.id, item.id, {
                                                                title: e.target.value
                                                            }),
                                                        style: {
                                                            width: "100%",
                                                            border: "none",
                                                            outline: "none",
                                                            background: "transparent",
                                                            fontWeight: "600",
                                                            marginBottom: "0.5rem",
                                                            fontSize: "0.9rem",
                                                            color: "#333"
                                                        },
                                                        placeholder: "제목"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                        lineNumber: 475,
                                                        columnNumber: 23
                                                    }, this),
                                                    item.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: "0.875rem",
                                                            color: "#666",
                                                            lineHeight: "1.4"
                                                        },
                                                        children: item.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                        lineNumber: 483,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, item.id || idx, true, {
                                                fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                lineNumber: 474,
                                                columnNumber: 21
                                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: "#999",
                                                fontSize: "0.875rem",
                                                textAlign: "center",
                                                padding: "2rem"
                                            },
                                            children: "항목이 없습니다"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                            lineNumber: 488,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>addItem(col.id),
                                            style: {
                                                width: "100%",
                                                padding: "0.75rem",
                                                marginTop: "0.5rem",
                                                border: "2px dashed #ddd",
                                                background: "white",
                                                cursor: "pointer",
                                                borderRadius: "6px",
                                                color: "#666",
                                                fontSize: "0.875rem",
                                                transition: "all 0.2s"
                                            },
                                            onMouseEnter: (e)=>{
                                                e.currentTarget.style.borderColor = "#0066cc";
                                                e.currentTarget.style.color = "#0066cc";
                                            },
                                            onMouseLeave: (e)=>{
                                                e.currentTarget.style.borderColor = "#ddd";
                                                e.currentTarget.style.color = "#666";
                                            },
                                            children: "+ 항목 추가"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                            lineNumber: 492,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 471,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, col.id, true, {
                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                            lineNumber: 469,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                    lineNumber: 467,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
            lineNumber: 439,
            columnNumber: 7
        }, this);
    }
    if (block.type === "list") {
        const items = block.props.items || [];
        const addItem = ()=>{
            const newItems = [
                ...items,
                {
                    id: Date.now().toString(),
                    text: "",
                    checked: false
                }
            ];
            handleUpdate({
                ...block.props,
                items: newItems
            });
        };
        const updateItem = (itemId, updates)=>{
            const newItems = items.map((item)=>item.id === itemId ? {
                    ...item,
                    ...updates
                } : item);
            handleUpdate({
                ...block.props,
                items: newItems
            });
        };
        const deleteItem = (itemId)=>{
            const newItems = items.filter((item)=>item.id !== itemId);
            handleUpdate({
                ...block.props,
                items: newItems
            });
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "list-block",
            style: {
                margin: "1.5rem 0",
                padding: "1.5rem",
                background: "white",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                position: "relative"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1rem"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                margin: 0,
                                fontSize: "1.1rem",
                                fontWeight: "600",
                                color: "#333"
                            },
                            children: "📝 리스트"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                            lineNumber: 537,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: "0.5rem",
                                alignItems: "center"
                            },
                            children: [
                                onDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onDelete(block.id),
                                    style: {
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
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.background = "#cc3333",
                                    onMouseLeave: (e)=>e.currentTarget.style.background = "#ff4444",
                                    title: "블록 삭제",
                                    children: "삭제"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 540,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: addItem,
                                    style: {
                                        padding: "0.5rem 1rem",
                                        fontSize: "0.875rem",
                                        cursor: "pointer",
                                        background: "#f5f5f5",
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        color: "#333",
                                        transition: "all 0.2s"
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.background = "#e8e8e8",
                                    onMouseLeave: (e)=>e.currentTarget.style.background = "#f5f5f5",
                                    children: "+ 항목 추가"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 561,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                            lineNumber: 538,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                    lineNumber: 536,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    style: {
                        listStyle: "none",
                        padding: 0,
                        margin: 0
                    },
                    children: items.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        style: {
                            color: "#999",
                            padding: "1.5rem",
                            textAlign: "center"
                        },
                        children: "항목을 추가하세요"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                        lineNumber: 582,
                        columnNumber: 13
                    }, this) : items.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            style: {
                                padding: "0.75rem",
                                borderBottom: "1px solid #f0f0f0",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75rem",
                                transition: "background 0.2s"
                            },
                            onMouseEnter: (e)=>e.currentTarget.style.background = "#f8f9fa",
                            onMouseLeave: (e)=>e.currentTarget.style.background = "white",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "checkbox",
                                    checked: item.checked || false,
                                    onChange: (e)=>updateItem(item.id, {
                                            checked: e.target.checked
                                        }),
                                    style: {
                                        width: "18px",
                                        height: "18px",
                                        cursor: "pointer"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 598,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: item.text || "",
                                    onChange: (e)=>updateItem(item.id, {
                                            text: e.target.value
                                        }),
                                    style: {
                                        flex: 1,
                                        border: "none",
                                        outline: "none",
                                        background: "transparent",
                                        textDecoration: item.checked ? "line-through" : "none",
                                        color: item.checked ? "#999" : "#333",
                                        fontSize: "0.95rem"
                                    },
                                    placeholder: "항목 입력..."
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 604,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>deleteItem(item.id),
                                    style: {
                                        border: "none",
                                        background: "transparent",
                                        cursor: "pointer",
                                        color: "#999",
                                        fontSize: "1.2rem",
                                        padding: "0.25rem",
                                        transition: "color 0.2s"
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.color = "#ff4444",
                                    onMouseLeave: (e)=>e.currentTarget.style.color = "#999",
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 611,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, item.id || idx, true, {
                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                            lineNumber: 585,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                    lineNumber: 580,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
            lineNumber: 535,
            columnNumber: 7
        }, this);
    }
    if (block.type === "timeline") {
        const events = block.props.events || [];
        const addEvent = ()=>{
            const newEvents = [
                ...events,
                {
                    id: Date.now().toString(),
                    date: new Date().toISOString().split("T")[0],
                    title: "",
                    description: ""
                }
            ];
            handleUpdate({
                ...block.props,
                events: newEvents
            });
        };
        const updateEvent = (eventId, updates)=>{
            const newEvents = events.map((event)=>event.id === eventId ? {
                    ...event,
                    ...updates
                } : event);
            handleUpdate({
                ...block.props,
                events: newEvents
            });
        };
        const deleteEvent = (eventId)=>{
            const newEvents = events.filter((event)=>event.id !== eventId);
            handleUpdate({
                ...block.props,
                events: newEvents
            });
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "timeline-block",
            style: {
                margin: "1.5rem 0",
                padding: "1.5rem",
                background: "white",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                position: "relative"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1.5rem"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                margin: 0,
                                fontSize: "1.1rem",
                                fontWeight: "600",
                                color: "#333"
                            },
                            children: "⏱️ 타임라인"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                            lineNumber: 650,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: "0.5rem",
                                alignItems: "center"
                            },
                            children: [
                                onDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onDelete(block.id),
                                    style: {
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
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.background = "#cc3333",
                                    onMouseLeave: (e)=>e.currentTarget.style.background = "#ff4444",
                                    title: "블록 삭제",
                                    children: "삭제"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 653,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: addEvent,
                                    style: {
                                        padding: "0.5rem 1rem",
                                        fontSize: "0.875rem",
                                        cursor: "pointer",
                                        background: "#f5f5f5",
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        color: "#333",
                                        transition: "all 0.2s"
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.background = "#e8e8e8",
                                    onMouseLeave: (e)=>e.currentTarget.style.background = "#f5f5f5",
                                    children: "+ 이벤트 추가"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 674,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                            lineNumber: 651,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                    lineNumber: 649,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "relative",
                        paddingLeft: "2.5rem"
                    },
                    children: events.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            color: "#999",
                            padding: "2rem",
                            textAlign: "center"
                        },
                        children: "이벤트를 추가하세요"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                        lineNumber: 695,
                        columnNumber: 13
                    }, this) : events.map((event, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: "1.5rem",
                                position: "relative"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
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
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 699,
                                    columnNumber: 17
                                }, this),
                                idx < events.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        position: "absolute",
                                        left: "-1.75rem",
                                        top: "1.5rem",
                                        width: "2px",
                                        height: "calc(100% + 0.5rem)",
                                        background: "#e0e0e0"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 712,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        paddingLeft: "1rem",
                                        background: "#f8f9fa",
                                        padding: "1rem",
                                        borderRadius: "6px",
                                        border: "1px solid #e0e0e0"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                gap: "0.75rem",
                                                alignItems: "center",
                                                marginBottom: "0.75rem",
                                                flexWrap: "wrap"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "date",
                                                    value: event.date || "",
                                                    onChange: (e)=>updateEvent(event.id, {
                                                            date: e.target.value
                                                        }),
                                                    style: {
                                                        border: "1px solid #ddd",
                                                        padding: "0.5rem",
                                                        borderRadius: "6px",
                                                        fontSize: "0.875rem"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                    lineNumber: 723,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: event.title || "",
                                                    onChange: (e)=>updateEvent(event.id, {
                                                            title: e.target.value
                                                        }),
                                                    style: {
                                                        flex: 1,
                                                        minWidth: "200px",
                                                        border: "1px solid #ddd",
                                                        padding: "0.5rem",
                                                        borderRadius: "6px",
                                                        fontSize: "0.95rem",
                                                        fontWeight: "600"
                                                    },
                                                    placeholder: "이벤트 제목"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                    lineNumber: 729,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>deleteEvent(event.id),
                                                    style: {
                                                        border: "none",
                                                        background: "transparent",
                                                        cursor: "pointer",
                                                        color: "#999",
                                                        fontSize: "1.2rem",
                                                        padding: "0.25rem",
                                                        transition: "color 0.2s"
                                                    },
                                                    onMouseEnter: (e)=>e.currentTarget.style.color = "#ff4444",
                                                    onMouseLeave: (e)=>e.currentTarget.style.color = "#999",
                                                    children: "×"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                    lineNumber: 736,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                            lineNumber: 722,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: event.description || "",
                                            onChange: (e)=>updateEvent(event.id, {
                                                    description: e.target.value
                                                }),
                                            style: {
                                                width: "100%",
                                                border: "1px solid #ddd",
                                                padding: "0.75rem",
                                                borderRadius: "6px",
                                                fontSize: "0.875rem",
                                                resize: "vertical",
                                                background: "white"
                                            },
                                            placeholder: "설명...",
                                            rows: 3
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                            lineNumber: 745,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 721,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, event.id || idx, true, {
                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                            lineNumber: 698,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                    lineNumber: 693,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
            lineNumber: 648,
            columnNumber: 7
        }, this);
    }
    if (block.type === "calendar_view") {
        const today = new Date();
        const [currentMonth, setCurrentMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(today.getMonth());
        const [currentYear, setCurrentYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(today.getFullYear());
        const events = block.props.events || {};
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const days = [];
        for(let i = 0; i < firstDay; i++){
            days.push(null);
        }
        for(let i = 1; i <= daysInMonth; i++){
            days.push(i);
        }
        const monthNames = [
            "1월",
            "2월",
            "3월",
            "4월",
            "5월",
            "6월",
            "7월",
            "8월",
            "9월",
            "10월",
            "11월",
            "12월"
        ];
        const dayNames = [
            "일",
            "월",
            "화",
            "수",
            "목",
            "금",
            "토"
        ];
        const [eventModal, setEventModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
        const addEvent = (date)=>{
            const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
            const dayEvents = events[dateKey] || [];
            setEventModal({
                date: dateKey,
                events: dayEvents
            });
        };
        const saveEvent = (eventId, updates)=>{
            if (!eventModal) return;
            const newEvents = {
                ...events,
                [eventModal.date]: eventModal.events.map((e)=>e.id === eventId ? {
                        ...e,
                        ...updates
                    } : e)
            };
            handleUpdate({
                ...block.props,
                events: newEvents
            });
            setEventModal({
                ...eventModal,
                events: newEvents[eventModal.date]
            });
        };
        const addNewEvent = ()=>{
            if (!eventModal) return;
            const newEvent = {
                id: Date.now().toString(),
                title: "새 이벤트",
                hour: 9,
                minute: 0,
                ampm: "오전",
                description: "",
                color: "#0066cc"
            };
            const newEvents = {
                ...events,
                [eventModal.date]: [
                    ...eventModal.events,
                    newEvent
                ]
            };
            handleUpdate({
                ...block.props,
                events: newEvents
            });
            setEventModal({
                ...eventModal,
                events: newEvents[eventModal.date]
            });
        };
        const deleteEvent = (eventId)=>{
            if (!eventModal) return;
            const newEvents = {
                ...events,
                [eventModal.date]: eventModal.events.filter((e)=>e.id !== eventId)
            };
            handleUpdate({
                ...block.props,
                events: newEvents
            });
            setEventModal({
                ...eventModal,
                events: newEvents[eventModal.date]
            });
        };
        const getDayEvents = (day)=>{
            if (!day) return [];
            const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            return events[dateKey] || [];
        };
        const colorOptions = [
            {
                name: "파랑",
                value: "#0066cc"
            },
            {
                name: "빨강",
                value: "#ff4444"
            },
            {
                name: "초록",
                value: "#00aa44"
            },
            {
                name: "노랑",
                value: "#ffaa00"
            },
            {
                name: "보라",
                value: "#8844ff"
            },
            {
                name: "분홍",
                value: "#ff44aa"
            }
        ];
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "calendar-block",
            style: {
                margin: "2rem 0",
                padding: "2rem",
                background: "white",
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                position: "relative"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "2rem",
                        position: "relative"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                margin: 0,
                                fontSize: "1.5rem",
                                fontWeight: "600",
                                color: "#333"
                            },
                            children: [
                                "📅 캘린더 - ",
                                currentYear,
                                "년 ",
                                monthNames[currentMonth]
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                            lineNumber: 840,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: "0.5rem",
                                alignItems: "center"
                            },
                            children: [
                                onDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onDelete(block.id),
                                    style: {
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
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.background = "#cc3333",
                                    onMouseLeave: (e)=>e.currentTarget.style.background = "#ff4444",
                                    title: "블록 삭제",
                                    children: "삭제"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 843,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        if (currentMonth === 0) {
                                            setCurrentMonth(11);
                                            setCurrentYear(currentYear - 1);
                                        } else {
                                            setCurrentMonth(currentMonth - 1);
                                        }
                                    },
                                    style: {
                                        padding: "0.5rem 1rem",
                                        cursor: "pointer",
                                        background: "#f5f5f5",
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        fontSize: "1rem",
                                        transition: "all 0.2s"
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.background = "#e8e8e8",
                                    onMouseLeave: (e)=>e.currentTarget.style.background = "#f5f5f5",
                                    children: "←"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 864,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        if (currentMonth === 11) {
                                            setCurrentMonth(0);
                                            setCurrentYear(currentYear + 1);
                                        } else {
                                            setCurrentMonth(currentMonth + 1);
                                        }
                                    },
                                    style: {
                                        padding: "0.5rem 1rem",
                                        cursor: "pointer",
                                        background: "#f5f5f5",
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        fontSize: "1rem",
                                        transition: "all 0.2s"
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.background = "#e8e8e8",
                                    onMouseLeave: (e)=>e.currentTarget.style.background = "#f5f5f5",
                                    children: "→"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 887,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                            lineNumber: 841,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                    lineNumber: 839,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "grid",
                        gridTemplateColumns: "repeat(7, 1fr)",
                        gap: "0.75rem"
                    },
                    children: [
                        dayNames.map((day)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: "1rem",
                                    textAlign: "center",
                                    fontWeight: "600",
                                    background: "#f8f9fa",
                                    borderRadius: "8px",
                                    fontSize: "1rem",
                                    color: "#333"
                                },
                                children: day
                            }, day, false, {
                                fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                lineNumber: 914,
                                columnNumber: 13
                            }, this)),
                        days.map((day, idx)=>{
                            const dayEvents = getDayEvents(day);
                            const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>day && addEvent(String(day)),
                                style: {
                                    minHeight: "140px",
                                    padding: "0.75rem",
                                    border: isToday ? "2px solid #0066cc" : "1px solid #e0e0e0",
                                    background: isToday ? "#e3f2fd" : "white",
                                    fontSize: "0.95rem",
                                    cursor: day ? "pointer" : "default",
                                    borderRadius: "8px",
                                    transition: "all 0.2s"
                                },
                                onMouseEnter: (e)=>{
                                    if (day) {
                                        e.currentTarget.style.background = isToday ? "#d1e7ff" : "#f8f9fa";
                                        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
                                    }
                                },
                                onMouseLeave: (e)=>{
                                    e.currentTarget.style.background = isToday ? "#e3f2fd" : "white";
                                    e.currentTarget.style.boxShadow = "none";
                                },
                                children: day && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontWeight: "bold",
                                                marginBottom: "0.25rem",
                                                fontSize: "0.9rem"
                                            },
                                            children: day
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                            lineNumber: 948,
                                            columnNumber: 21
                                        }, this),
                                        dayEvents.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: "0.7rem"
                                            },
                                            children: [
                                                dayEvents.slice(0, 3).map((event, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            marginBottom: "0.15rem",
                                                            padding: "0.15rem 0.3rem",
                                                            background: event.color || "#0066cc",
                                                            color: "white",
                                                            borderRadius: "3px",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            whiteSpace: "nowrap",
                                                            fontSize: "0.65rem"
                                                        },
                                                        title: event.title || "이벤트",
                                                        children: event.title || "이벤트"
                                                    }, idx, false, {
                                                        fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                        lineNumber: 952,
                                                        columnNumber: 27
                                                    }, this)),
                                                dayEvents.length > 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: "0.65rem",
                                                        color: "#666",
                                                        marginTop: "0.15rem"
                                                    },
                                                    children: [
                                                        "+",
                                                        dayEvents.length - 3,
                                                        "개 더"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                    lineNumber: 971,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                            lineNumber: 950,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, idx, false, {
                                fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                lineNumber: 922,
                                columnNumber: 15
                            }, this);
                        })
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                    lineNumber: 912,
                    columnNumber: 9
                }, this),
                eventModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
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
                    },
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "1.5rem",
                                paddingBottom: "1rem",
                                borderBottom: "2px solid #e0e0e0"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        margin: 0,
                                        fontSize: "1.3rem",
                                        fontWeight: "600",
                                        color: "#333"
                                    },
                                    children: [
                                        "📅 ",
                                        eventModal.date,
                                        " 이벤트"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 1004,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setEventModal(null),
                                    style: {
                                        border: "none",
                                        background: "transparent",
                                        cursor: "pointer",
                                        fontSize: "1.5rem",
                                        color: "#999",
                                        padding: "0.25rem",
                                        transition: "color 0.2s"
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.color = "#ff4444",
                                    onMouseLeave: (e)=>e.currentTarget.style.color = "#999",
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 1005,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                            lineNumber: 1003,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: "1rem"
                            },
                            children: eventModal.events.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    color: "#999",
                                    textAlign: "center",
                                    padding: "1rem"
                                },
                                children: "이벤트가 없습니다"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                lineNumber: 1016,
                                columnNumber: 17
                            }, this) : eventModal.events.map((event)=>{
                                const hour = event.hour ?? 9;
                                const minute = event.minute ?? 0;
                                const ampm = event.ampm ?? "오전";
                                const color = event.color || "#0066cc";
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: "1rem",
                                        padding: "1rem",
                                        border: `2px solid ${color}`,
                                        borderRadius: "8px",
                                        background: `${color}10`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: event.title || "",
                                            onChange: (e)=>saveEvent(event.id, {
                                                    title: e.target.value
                                                }),
                                            placeholder: "이벤트 제목",
                                            style: {
                                                width: "100%",
                                                marginBottom: "0.75rem",
                                                padding: "0.75rem",
                                                border: "1px solid #ddd",
                                                borderRadius: "6px",
                                                fontSize: "1rem",
                                                fontWeight: "600"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                            lineNumber: 1026,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                gap: "0.5rem",
                                                marginBottom: "0.75rem",
                                                alignItems: "center"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: ampm,
                                                    onChange: (e)=>{
                                                        const newAmpm = e.target.value;
                                                        let newHour = hour;
                                                        if (newAmpm === "오후" && hour < 12) {
                                                            newHour = hour + 12;
                                                        } else if (newAmpm === "오전" && hour >= 12) {
                                                            newHour = hour - 12;
                                                        }
                                                        saveEvent(event.id, {
                                                            ampm: newAmpm,
                                                            hour: newHour
                                                        });
                                                    },
                                                    style: {
                                                        padding: "0.5rem",
                                                        border: "1px solid #ddd",
                                                        borderRadius: "6px"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "오전",
                                                            children: "오전"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                            lineNumber: 1048,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "오후",
                                                            children: "오후"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                            lineNumber: 1049,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                    lineNumber: 1034,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    min: "0",
                                                    max: "23",
                                                    value: hour >= 12 ? hour - 12 : hour,
                                                    onChange: (e)=>{
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
                                                        const newHour = newAmpm === "오후" ? displayHour === 12 ? 12 : displayHour + 12 : displayHour === 0 ? 0 : displayHour;
                                                        saveEvent(event.id, {
                                                            hour: newHour,
                                                            ampm: newAmpm
                                                        });
                                                    },
                                                    style: {
                                                        width: "80px",
                                                        padding: "0.5rem",
                                                        border: "1px solid #ddd",
                                                        borderRadius: "6px"
                                                    },
                                                    placeholder: "시"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                    lineNumber: 1051,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: ":"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                    lineNumber: 1082,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    min: "0",
                                                    max: "59",
                                                    value: minute,
                                                    onChange: (e)=>{
                                                        const newMinute = Math.min(59, Math.max(0, parseInt(e.target.value) || 0));
                                                        saveEvent(event.id, {
                                                            minute: newMinute
                                                        });
                                                    },
                                                    style: {
                                                        width: "80px",
                                                        padding: "0.5rem",
                                                        border: "1px solid #ddd",
                                                        borderRadius: "6px"
                                                    },
                                                    placeholder: "분"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                    lineNumber: 1083,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                            lineNumber: 1033,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginBottom: "0.75rem"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: {
                                                        display: "block",
                                                        marginBottom: "0.25rem",
                                                        fontSize: "0.875rem",
                                                        fontWeight: "600"
                                                    },
                                                    children: "색상:"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                    lineNumber: 1097,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        gap: "0.5rem",
                                                        flexWrap: "wrap"
                                                    },
                                                    children: colorOptions.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>saveEvent(event.id, {
                                                                    color: opt.value
                                                                }),
                                                            style: {
                                                                width: "40px",
                                                                height: "40px",
                                                                borderRadius: "6px",
                                                                border: color === opt.value ? "3px solid #333" : "2px solid #ddd",
                                                                background: opt.value,
                                                                cursor: "pointer",
                                                                boxShadow: color === opt.value ? "0 2px 4px rgba(0,0,0,0.2)" : "none"
                                                            },
                                                            title: opt.name
                                                        }, opt.value, false, {
                                                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                            lineNumber: 1100,
                                                            columnNumber: 29
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                    lineNumber: 1098,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                            lineNumber: 1096,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: event.description || "",
                                            onChange: (e)=>saveEvent(event.id, {
                                                    description: e.target.value
                                                }),
                                            placeholder: "메모 입력...",
                                            rows: 3,
                                            style: {
                                                width: "100%",
                                                padding: "0.75rem",
                                                border: "1px solid #ddd",
                                                borderRadius: "6px",
                                                resize: "vertical",
                                                marginBottom: "0.75rem"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                            lineNumber: 1117,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                gap: "0.5rem"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        handleUpdate({
                                                            ...block.props,
                                                            events: events
                                                        });
                                                        setEventModal(null);
                                                    },
                                                    style: {
                                                        flex: 1,
                                                        padding: "0.75rem 1rem",
                                                        background: "#00aa44",
                                                        color: "white",
                                                        border: "none",
                                                        borderRadius: "6px",
                                                        cursor: "pointer",
                                                        fontSize: "0.95rem",
                                                        fontWeight: "600",
                                                        transition: "all 0.2s"
                                                    },
                                                    onMouseEnter: (e)=>e.currentTarget.style.background = "#008833",
                                                    onMouseLeave: (e)=>e.currentTarget.style.background = "#00aa44",
                                                    children: "저장"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                    lineNumber: 1125,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>deleteEvent(event.id),
                                                    style: {
                                                        padding: "0.75rem 1rem",
                                                        background: "#ff4444",
                                                        color: "white",
                                                        border: "none",
                                                        borderRadius: "6px",
                                                        cursor: "pointer",
                                                        fontSize: "0.875rem",
                                                        transition: "all 0.2s"
                                                    },
                                                    onMouseEnter: (e)=>e.currentTarget.style.background = "#cc3333",
                                                    onMouseLeave: (e)=>e.currentTarget.style.background = "#ff4444",
                                                    children: "삭제"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                    lineNumber: 1136,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                            lineNumber: 1124,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, event.id, true, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 1025,
                                    columnNumber: 21
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                            lineNumber: 1014,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: addNewEvent,
                            style: {
                                width: "100%",
                                padding: "0.875rem",
                                background: "#0066cc",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontSize: "0.95rem",
                                fontWeight: "600",
                                transition: "all 0.2s"
                            },
                            onMouseEnter: (e)=>e.currentTarget.style.background = "#0052a3",
                            onMouseLeave: (e)=>e.currentTarget.style.background = "#0066cc",
                            children: "+ 이벤트 추가"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                            lineNumber: 1150,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                    lineNumber: 984,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
            lineNumber: 838,
            columnNumber: 7
        }, this);
    }
    if (block.type === "gallery") {
        const rows = block.props.rows || [];
        const columns = block.props.columns || 3;
        const [selectedCells, setSelectedCells] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
        const addRow = ()=>{
            const newRows = [
                ...rows,
                Array(columns).fill(null).map(()=>({
                        id: Date.now().toString() + Math.random(),
                        title: "",
                        description: "",
                        status: ""
                    }))
            ];
            handleUpdate({
                ...block.props,
                rows: newRows
            });
        };
        const updateCell = (rowIdx, colIdx, updates)=>{
            const newRows = rows.map((row, rIdx)=>{
                if (rIdx === rowIdx) {
                    const newRow = [
                        ...row
                    ];
                    if (!newRow[colIdx]) {
                        newRow[colIdx] = {
                            id: Date.now().toString() + Math.random(),
                            title: "",
                            description: "",
                            status: ""
                        };
                    }
                    newRow[colIdx] = {
                        ...newRow[colIdx],
                        ...updates
                    };
                    return newRow;
                }
                return row;
            });
            handleUpdate({
                ...block.props,
                rows: newRows
            });
        };
        const deleteCell = (rowIdx, colIdx)=>{
            const newRows = rows.map((row, rIdx)=>{
                if (rIdx === rowIdx) {
                    const newRow = [
                        ...row
                    ];
                    newRow[colIdx] = null;
                    return newRow;
                }
                return row;
            });
            handleUpdate({
                ...block.props,
                rows: newRows
            });
        };
        const mergeCells = ()=>{
            if (selectedCells.size < 2) return;
            const cellIds = Array.from(selectedCells);
            const positions = cellIds.map((id)=>{
                const [r, c] = id.split("-").map(Number);
                return {
                    row: r,
                    col: c
                };
            });
            const minRow = Math.min(...positions.map((p)=>p.row));
            const maxRow = Math.max(...positions.map((p)=>p.row));
            const minCol = Math.min(...positions.map((p)=>p.col));
            const maxCol = Math.max(...positions.map((p)=>p.col));
            const newRows = rows.map((row, rIdx)=>{
                if (rIdx < minRow || rIdx > maxRow) return row;
                return row.map((cell, cIdx)=>{
                    if (cIdx < minCol || cIdx > maxCol) return cell;
                    if (rIdx === minRow && cIdx === minCol) {
                        return {
                            ...cell,
                            merged: true,
                            rowSpan: maxRow - minRow + 1,
                            colSpan: maxCol - minCol + 1
                        };
                    }
                    return null;
                });
            });
            handleUpdate({
                ...block.props,
                rows: newRows
            });
            setSelectedCells(new Set());
        };
        const splitCell = (rowIdx, colIdx)=>{
            const cell = rows[rowIdx]?.[colIdx];
            if (!cell || !cell.merged) return;
            const rowSpan = cell.rowSpan || 1;
            const colSpan = cell.colSpan || 1;
            const newRows = rows.map((row, rIdx)=>{
                if (rIdx < rowIdx || rIdx >= rowIdx + rowSpan) return row;
                return row.map((c, cIdx)=>{
                    if (cIdx < colIdx || cIdx >= colIdx + colSpan) return c;
                    if (rIdx === rowIdx && cIdx === colIdx) {
                        return {
                            ...cell,
                            merged: false,
                            rowSpan: undefined,
                            colSpan: undefined
                        };
                    }
                    return {
                        id: Date.now().toString() + Math.random(),
                        title: "",
                        description: "",
                        status: ""
                    };
                });
            });
            handleUpdate({
                ...block.props,
                rows: newRows
            });
        };
        const toggleCellSelection = (rowIdx, colIdx)=>{
            const cellId = `${rowIdx}-${colIdx}`;
            const newSelected = new Set(selectedCells);
            if (newSelected.has(cellId)) {
                newSelected.delete(cellId);
            } else {
                newSelected.add(cellId);
            }
            setSelectedCells(newSelected);
        };
        const addColumn = ()=>{
            handleUpdate({
                ...block.props,
                columns: columns + 1
            });
        };
        const removeColumn = ()=>{
            if (columns > 1) {
                handleUpdate({
                    ...block.props,
                    columns: columns - 1
                });
            }
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "gallery-block",
            style: {
                margin: "1.5rem 0",
                padding: "1.5rem",
                background: "white",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                position: "relative"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1rem",
                        flexWrap: "wrap",
                        gap: "0.5rem"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                margin: 0,
                                fontSize: "1.1rem",
                                fontWeight: "600",
                                color: "#333",
                                flex: "1 1 auto"
                            },
                            children: "🖼️ 갤러리 (데이터베이스)"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                            lineNumber: 1270,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: "0.5rem",
                                flexWrap: "wrap",
                                alignItems: "center"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: removeColumn,
                                    style: {
                                        padding: "0.5rem 1rem",
                                        fontSize: "0.875rem",
                                        cursor: "pointer",
                                        background: "#f5f5f5",
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        color: "#333",
                                        transition: "all 0.2s",
                                        whiteSpace: "nowrap"
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.background = "#e8e8e8",
                                    onMouseLeave: (e)=>e.currentTarget.style.background = "#f5f5f5",
                                    children: "- 열 제거"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 1272,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: addColumn,
                                    style: {
                                        padding: "0.5rem 1rem",
                                        fontSize: "0.875rem",
                                        cursor: "pointer",
                                        background: "#f5f5f5",
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        color: "#333",
                                        transition: "all 0.2s",
                                        whiteSpace: "nowrap"
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.background = "#e8e8e8",
                                    onMouseLeave: (e)=>e.currentTarget.style.background = "#f5f5f5",
                                    children: "+ 열 추가"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 1290,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: addRow,
                                    style: {
                                        padding: "0.5rem 1rem",
                                        fontSize: "0.875rem",
                                        cursor: "pointer",
                                        background: "#f5f5f5",
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        color: "#333",
                                        transition: "all 0.2s",
                                        whiteSpace: "nowrap"
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.background = "#e8e8e8",
                                    onMouseLeave: (e)=>e.currentTarget.style.background = "#f5f5f5",
                                    children: "+ 행 추가"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 1308,
                                    columnNumber: 13
                                }, this),
                                selectedCells.size >= 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: mergeCells,
                                    style: {
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
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.background = "#0052a3",
                                    onMouseLeave: (e)=>e.currentTarget.style.background = "#0066cc",
                                    children: "병합"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 1327,
                                    columnNumber: 15
                                }, this),
                                onDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onDelete(block.id),
                                    style: {
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
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.background = "#cc3333",
                                    onMouseLeave: (e)=>e.currentTarget.style.background = "#ff4444",
                                    title: "블록 삭제",
                                    children: "삭제"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 1348,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                            lineNumber: 1271,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                    lineNumber: 1269,
                    columnNumber: 9
                }, this),
                rows.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        color: "#999",
                        textAlign: "center",
                        padding: "2rem"
                    },
                    children: "행을 추가하세요"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                    lineNumber: 1373,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        overflowX: "auto"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        style: {
                            width: "100%",
                            borderCollapse: "collapse",
                            background: "white"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: rows.map((row, rowIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: Array(columns).fill(null).map((_, colIdx)=>{
                                        // 병합된 셀의 경우, 첫 번째 셀만 렌더링
                                        let shouldRender = true;
                                        for(let r = 0; r < rowIdx; r++){
                                            const prevCell = rows[r]?.[colIdx];
                                            if (prevCell?.merged && prevCell.rowSpan && r + prevCell.rowSpan > rowIdx) {
                                                shouldRender = false;
                                                break;
                                            }
                                        }
                                        for(let c = 0; c < colIdx; c++){
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
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            rowSpan: isMerged ? rowSpan : undefined,
                                            colSpan: isMerged ? colSpan : undefined,
                                            onClick: ()=>toggleCellSelection(rowIdx, colIdx),
                                            style: {
                                                border: "1px solid #e0e0e0",
                                                padding: "0.75rem",
                                                background: isSelected ? "#e3f2fd" : "white",
                                                cursor: "pointer",
                                                minWidth: "150px",
                                                verticalAlign: "top"
                                            },
                                            children: cell ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: cell.title || "",
                                                        onChange: (e)=>updateCell(rowIdx, colIdx, {
                                                                title: e.target.value
                                                            }),
                                                        placeholder: "제목",
                                                        style: {
                                                            width: "100%",
                                                            marginBottom: "0.5rem",
                                                            padding: "0.5rem",
                                                            border: "1px solid #ddd",
                                                            borderRadius: "4px",
                                                            fontWeight: "600"
                                                        },
                                                        onClick: (e)=>e.stopPropagation()
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                        lineNumber: 1428,
                                                        columnNumber: 31
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        value: cell.description || "",
                                                        onChange: (e)=>updateCell(rowIdx, colIdx, {
                                                                description: e.target.value
                                                            }),
                                                        placeholder: "설명",
                                                        rows: 3,
                                                        style: {
                                                            width: "100%",
                                                            marginBottom: "0.5rem",
                                                            padding: "0.5rem",
                                                            border: "1px solid #ddd",
                                                            borderRadius: "4px",
                                                            resize: "vertical",
                                                            fontSize: "0.875rem"
                                                        },
                                                        onClick: (e)=>e.stopPropagation()
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                        lineNumber: 1436,
                                                        columnNumber: 31
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: cell.status || "",
                                                        onChange: (e)=>updateCell(rowIdx, colIdx, {
                                                                status: e.target.value
                                                            }),
                                                        style: {
                                                            width: "100%",
                                                            padding: "0.5rem",
                                                            border: "1px solid #ddd",
                                                            borderRadius: "4px",
                                                            fontSize: "0.875rem"
                                                        },
                                                        onClick: (e)=>e.stopPropagation(),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "",
                                                                children: "상태 선택"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                                lineNumber: 1450,
                                                                columnNumber: 33
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "진행중",
                                                                children: "진행중"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                                lineNumber: 1451,
                                                                columnNumber: 33
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "완료",
                                                                children: "완료"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                                lineNumber: 1452,
                                                                columnNumber: 33
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "보류",
                                                                children: "보류"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                                lineNumber: 1453,
                                                                columnNumber: 33
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                        lineNumber: 1444,
                                                        columnNumber: 31
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            gap: "0.5rem",
                                                            marginTop: "0.75rem",
                                                            flexWrap: "wrap"
                                                        },
                                                        children: [
                                                            isMerged && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: (e)=>{
                                                                    e.stopPropagation();
                                                                    splitCell(rowIdx, colIdx);
                                                                },
                                                                style: {
                                                                    padding: "0.5rem 0.75rem",
                                                                    fontSize: "0.8rem",
                                                                    background: "#ffaa00",
                                                                    color: "white",
                                                                    border: "none",
                                                                    borderRadius: "4px",
                                                                    cursor: "pointer",
                                                                    transition: "all 0.2s",
                                                                    boxShadow: "0 1px 3px rgba(255,170,0,0.3)"
                                                                },
                                                                onMouseEnter: (e)=>e.currentTarget.style.background = "#e69900",
                                                                onMouseLeave: (e)=>e.currentTarget.style.background = "#ffaa00",
                                                                children: "분리"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                                lineNumber: 1457,
                                                                columnNumber: 35
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: (e)=>{
                                                                    e.stopPropagation();
                                                                    deleteCell(rowIdx, colIdx);
                                                                },
                                                                style: {
                                                                    padding: "0.5rem 0.75rem",
                                                                    fontSize: "0.8rem",
                                                                    background: "#ff4444",
                                                                    color: "white",
                                                                    border: "none",
                                                                    borderRadius: "4px",
                                                                    cursor: "pointer",
                                                                    transition: "all 0.2s",
                                                                    boxShadow: "0 1px 3px rgba(255,68,68,0.3)"
                                                                },
                                                                onMouseEnter: (e)=>e.currentTarget.style.background = "#cc3333",
                                                                onMouseLeave: (e)=>e.currentTarget.style.background = "#ff4444",
                                                                children: "셀 삭제"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                                lineNumber: 1479,
                                                                columnNumber: 33
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                        lineNumber: 1455,
                                                        columnNumber: 31
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                lineNumber: 1427,
                                                columnNumber: 29
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    color: "#999",
                                                    fontSize: "0.875rem",
                                                    textAlign: "center",
                                                    padding: "1rem"
                                                },
                                                children: "빈 칸"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                                lineNumber: 1503,
                                                columnNumber: 29
                                            }, this)
                                        }, colIdx, false, {
                                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                            lineNumber: 1412,
                                            columnNumber: 25
                                        }, this);
                                    })
                                }, rowIdx, false, {
                                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                                    lineNumber: 1381,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                            lineNumber: 1379,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                        lineNumber: 1378,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/block-renderer.tsx",
                    lineNumber: 1377,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/block-renderer.tsx",
            lineNumber: 1268,
            columnNumber: 7
        }, this);
    }
    return null;
}

})()),
"[project]/apps/web/src/components/block-editor.tsx [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "BlockEditor": ()=>BlockEditor
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@tiptap/react/dist/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@tiptap/starter-kit/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$placeholder$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@tiptap/extension-placeholder/dist/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$placeholder$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@tiptap/extension-placeholder/dist/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$block$2d$renderer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/apps/web/src/components/block-renderer.tsx [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
"use client";
;
;
;
;
;
;
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
function BlockEditor({ token, pageId, blocks, onBlockUpdate, onBlockCreate, onBlockDelete, onBlocksReorder }) {
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSlashMenu, setShowSlashMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [slashMenuPosition, setSlashMenuPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        top: 0,
        left: 0
    });
    const [slashQuery, setSlashQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const lastPageIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])("");
    const isUpdatingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const slashMenuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (event)=>{
            if (slashMenuRef.current && !slashMenuRef.current.contains(event.target)) {
                setShowSlashMenu(false);
            }
        };
        if (showSlashMenu) {
            document.addEventListener("mousedown", handleClickOutside);
            return ()=>document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [
        showSlashMenu
    ]);
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEditor"])({
        immediatelyRender: false,
        extensions: [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$extension$2d$placeholder$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].configure({
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!editor || !mounted) return;
        if (lastPageIdRef.current !== pageId) {
            lastPageIdRef.current = pageId;
            const paragraphBlocks = blocks.filter((b)=>b.type === "paragraph");
            const content = paragraphBlocks.length > 0 ? paragraphBlocks.map((b)=>`<p>${String(b.props.text ?? "").trim()}</p>`).join("") : "<p></p>";
            isUpdatingRef.current = true;
            editor.commands.setContent(content);
            setTimeout(()=>{
                isUpdatingRef.current = false;
            }, 100);
        } else {
            const paragraphBlocks = blocks.filter((b)=>b.type === "paragraph");
            const expectedContent = paragraphBlocks.length > 0 ? paragraphBlocks.map((b)=>`<p>${String(b.props.text ?? "").trim()}</p>`).join("") : "<p></p>";
            const currentContent = editor.getHTML();
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
                icon: "��️"
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
    const [draggedBlockId, setDraggedBlockId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dragOverBlockId, setDragOverBlockId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    if (!mounted || !editor) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "editor-loading",
            children: "에디터 로딩 중..."
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/block-editor.tsx",
            lineNumber: 161,
            columnNumber: 12
        }, this);
    }
    // 모든 블록을 position 순서대로 정렬 (높은 position이 위에)
    const allBlocks = [
        ...blocks
    ].sort((a, b)=>b.position - a.position);
    const nonParagraphBlocks = blocks.filter((b)=>b.type !== "paragraph").sort((a, b)=>b.position - a.position);
    const paragraphBlocks = blocks.filter((b)=>b.type === "paragraph").sort((a, b)=>b.position - a.position);
    // paragraph 블록이 있는지 확인 (에디터 표시용)
    const hasParagraphBlock = paragraphBlocks.length > 0;
    const firstParagraphBlock = paragraphBlocks[0];
    const handleDragStart = (e, blockId)=>{
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
        setTimeout(()=>document.body.removeChild(dragImage), 0);
        // 데이터는 설정하되 표시되지 않도록
        e.dataTransfer.setData("application/x-block-id", blockId);
    };
    const handleDragOver = (e, blockId)=>{
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        if (draggedBlockId && draggedBlockId !== blockId) {
            setDragOverBlockId(blockId);
        }
    };
    const handleDragLeave = ()=>{
        setDragOverBlockId(null);
    };
    const handleDrop = (e, targetBlockId)=>{
        e.preventDefault();
        e.stopPropagation();
        const draggedId = draggedBlockId || e.dataTransfer.getData("application/x-block-id");
        if (!draggedId || !onBlocksReorder || draggedId === targetBlockId) {
            setDraggedBlockId(null);
            setDragOverBlockId(null);
            return;
        }
        // 모든 블록의 현재 순서 (paragraph 포함)
        const currentOrder = allBlocks.map((b)=>b.id);
        const draggedIndex = currentOrder.indexOf(draggedId);
        const targetIndex = currentOrder.indexOf(targetBlockId);
        if (draggedIndex === -1 || targetIndex === -1) {
            setDraggedBlockId(null);
            setDragOverBlockId(null);
            return;
        }
        const newOrder = [
            ...currentOrder
        ];
        newOrder.splice(draggedIndex, 1);
        newOrder.splice(targetIndex, 0, draggedId);
        onBlocksReorder(newOrder);
        setDraggedBlockId(null);
        setDragOverBlockId(null);
    };
    const handleDragEnd = ()=>{
        setDraggedBlockId(null);
        setDragOverBlockId(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "block-editor",
        style: {
            position: "relative"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onDragOver: (e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    if (draggedBlockId && allBlocks.length > 0) {
                        const firstBlock = allBlocks[0];
                        if (firstBlock.id !== draggedBlockId) {
                            setDragOverBlockId(firstBlock.id);
                        }
                    }
                },
                onDragLeave: ()=>{
                    if (!draggedBlockId) setDragOverBlockId(null);
                },
                onDrop: (e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    const draggedId = draggedBlockId || e.dataTransfer.getData("application/x-block-id");
                    if (draggedId && onBlocksReorder && allBlocks.length > 0) {
                        const currentOrder = allBlocks.map((b)=>b.id);
                        const draggedIndex = currentOrder.indexOf(draggedId);
                        if (draggedIndex !== -1 && draggedIndex !== 0) {
                            const newOrder = [
                                ...currentOrder
                            ];
                            newOrder.splice(draggedIndex, 1);
                            newOrder.unshift(draggedId);
                            onBlocksReorder(newOrder);
                        }
                    }
                    setDraggedBlockId(null);
                    setDragOverBlockId(null);
                },
                style: {
                    minHeight: dragOverBlockId === null && draggedBlockId ? "2rem" : "0",
                    borderTop: dragOverBlockId === null && draggedBlockId ? "3px solid #0066cc" : "3px solid transparent",
                    transition: "all 0.2s"
                }
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/block-editor.tsx",
                lineNumber: 240,
                columnNumber: 7
            }, this),
            allBlocks.map((block)=>{
                if (block.type === "paragraph") {
                    // Paragraph 블록은 첫 번째 것만 EditorContent로 표시
                    if (hasParagraphBlock && block.id === firstParagraphBlock.id) {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            draggable: hasParagraphBlock,
                            onDragStart: (e)=>{
                                if (hasParagraphBlock) {
                                    handleDragStart(e, firstParagraphBlock.id);
                                }
                            },
                            onDragOver: (e)=>{
                                e.preventDefault();
                                e.stopPropagation();
                            },
                            onDrop: (e)=>{
                                e.preventDefault();
                                e.stopPropagation();
                                const draggedId = draggedBlockId || e.dataTransfer.getData("application/x-block-id");
                                if (draggedId && onBlocksReorder && hasParagraphBlock) {
                                    const currentOrder = allBlocks.map((b)=>b.id);
                                    const draggedIndex = currentOrder.indexOf(draggedId);
                                    const targetIndex = currentOrder.indexOf(firstParagraphBlock.id);
                                    if (draggedIndex !== -1 && targetIndex !== -1 && draggedIndex !== targetIndex) {
                                        const newOrder = [
                                            ...currentOrder
                                        ];
                                        newOrder.splice(draggedIndex, 1);
                                        newOrder.splice(targetIndex, 0, draggedId);
                                        onBlocksReorder(newOrder);
                                    }
                                }
                                setDraggedBlockId(null);
                                setDragOverBlockId(null);
                            },
                            style: {
                                opacity: draggedBlockId && hasParagraphBlock && draggedBlockId === firstParagraphBlock.id ? 0.5 : 1,
                                cursor: hasParagraphBlock ? "move" : "default"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["EditorContent"], {
                                editor: editor
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/block-editor.tsx",
                                lineNumber: 319,
                                columnNumber: 17
                            }, this)
                        }, block.id, false, {
                            fileName: "[project]/apps/web/src/components/block-editor.tsx",
                            lineNumber: 284,
                            columnNumber: 15
                        }, this);
                    }
                    // 다른 paragraph 블록은 렌더링하지 않음 (EditorContent에 모두 포함됨)
                    return null;
                } else {
                    // Non-paragraph 블록들
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        draggable: true,
                        onDragStart: (e)=>handleDragStart(e, block.id),
                        onDragOver: (e)=>handleDragOver(e, block.id),
                        onDragLeave: handleDragLeave,
                        onDrop: (e)=>handleDrop(e, block.id),
                        onDragEnd: handleDragEnd,
                        style: {
                            cursor: "move",
                            opacity: draggedBlockId === block.id ? 0.5 : 1,
                            borderTop: dragOverBlockId === block.id ? "3px solid #0066cc" : "3px solid transparent",
                            transition: "all 0.2s",
                            marginTop: dragOverBlockId === block.id ? "0.5rem" : "0"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$block$2d$renderer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BlockRenderer"], {
                            block: block,
                            token: token,
                            onUpdate: onBlockUpdate,
                            onDelete: onBlockDelete
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/block-editor.tsx",
                            lineNumber: 344,
                            columnNumber: 15
                        }, this)
                    }, block.id, false, {
                        fileName: "[project]/apps/web/src/components/block-editor.tsx",
                        lineNumber: 328,
                        columnNumber: 13
                    }, this);
                }
            }),
            !hasParagraphBlock && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                draggable: false,
                style: {
                    cursor: "default"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["EditorContent"], {
                    editor: editor
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/block-editor.tsx",
                    lineNumber: 363,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/block-editor.tsx",
                lineNumber: 357,
                columnNumber: 9
            }, this),
            showSlashMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: slashMenuRef,
                className: "slash-menu",
                style: {
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
                },
                children: slashCommands.length > 0 ? slashCommands.map((cmd)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: cmd.icon
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/block-editor.tsx",
                                lineNumber: 403,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: cmd.label
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/block-editor.tsx",
                                lineNumber: 404,
                                columnNumber: 17
                            }, this)
                        ]
                    }, cmd.key, true, {
                        fileName: "[project]/apps/web/src/components/block-editor.tsx",
                        lineNumber: 386,
                        columnNumber: 15
                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: "8px 12px",
                        color: "#999"
                    },
                    children: "명령어를 찾을 수 없습니다"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/block-editor.tsx",
                    lineNumber: 408,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/block-editor.tsx",
                lineNumber: 367,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/block-editor.tsx",
        lineNumber: 238,
        columnNumber: 5
    }, this);
}

})()),
"[project]/apps/web/src/components/share-modal.tsx [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ShareModal": ()=>ShareModal
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
"use client";
;
;
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
function ShareModal({ token, pageId, onClose }) {
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("invite");
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
                setStatus(`${email} 님을 초대했습니다. 초대된 사용자는 회원가입 후 이 페이지에 접근할 수 있습니다.\n\n참고: 실제 이메일 전송 기능은 아직 구현되지 않았습니다. 서버 콘솔에 이메일 내용이 출력됩니다.`);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "modal-overlay",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "modal",
            onClick: (e)=>e.stopPropagation(),
            style: {
                maxWidth: "500px"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    children: "페이지 공유"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/share-modal.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        gap: "1rem",
                        marginBottom: "1rem",
                        borderBottom: "1px solid #eee"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                activeTab === "invite" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                marginBottom: "1rem",
                                color: "#666",
                                fontSize: "0.9rem"
                            },
                            children: "회원가입된 사용자의 이메일을 입력하세요. 해당 사용자가 이 페이지에 접근할 수 있습니다."
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/share-modal.tsx",
                            lineNumber: 86,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleInvite,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                activeTab === "link" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: "0.5rem"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "status",
                    style: {
                        marginTop: "1rem",
                        padding: "0.5rem",
                        background: "#f0f0f0",
                        borderRadius: "4px",
                        whiteSpace: "pre-line"
                    },
                    children: status
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/share-modal.tsx",
                    lineNumber: 125,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "button secondary",
                    style: {
                        marginTop: "1rem",
                        width: "100%"
                    },
                    children: "닫기"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/share-modal.tsx",
                    lineNumber: 135,
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

})()),
"[project]/apps/web/src/app/workspace/page.tsx [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "default": ()=>WorkspacePage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/apps/web/src/components/sidebar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$block$2d$editor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/apps/web/src/components/block-editor.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$share$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/apps/web/src/components/share-modal.tsx [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
"use client";
;
;
;
;
;
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
function WorkspacePage() {
    const [token, setToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [blocks, setBlocks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showCreateModal, setShowCreateModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showShareModal, setShowShareModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newPageTitle, setNewPageTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [newPageParentId, setNewPageParentId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sidebarRefresh, setSidebarRefresh] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingPageTitle, setEditingPageTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingPageTitleValue, setEditingPageTitleValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
                setEditingPageTitleValue(data.title);
                setEditingPageTitle(false);
                loadBlocks(data.id, tokenValue);
            } else {
                const status = res.status;
                const errorText = await res.text().catch(()=>"알 수 없는 오류");
                console.error("Failed to load personal page:", status, errorText);
                // 401 Unauthorized 또는 403 Forbidden인 경우에만 리다이렉트
                if (status === 401 || status === 403) {
                    setStatus("인증이 만료되었습니다. 다시 로그인해주세요.");
                    setTimeout(()=>{
                        localStorage.removeItem("auth_token");
                        window.location.href = "/my-space";
                    }, 2000);
                } else if (status === 404) {
                    // 개인 페이지가 없는 경우 - 서버에서 자동 생성하므로 재시도
                    setStatus("개인 페이지를 생성하는 중...");
                    // 잠시 후 재시도
                    setTimeout(()=>{
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
    const loadPage = async (pageId, tokenValue)=>{
        const tokenToUse = tokenValue || token;
        if (!tokenToUse) return;
        try {
            const res = await fetch(`${API_URL}/pages/${pageId}`, {
                headers: {
                    "x-user-token": tokenToUse
                }
            });
            if (res.ok) {
                const data = await res.json();
                setCurrentPage(data);
                setEditingPageTitleValue(data.title);
                setEditingPageTitle(false);
                loadBlocks(pageId, tokenToUse);
            } else {
                const status = res.status;
                const errorText = await res.text().catch(()=>"알 수 없는 오류");
                console.error("Failed to load page:", status, errorText);
                // 401 Unauthorized 또는 403 Forbidden인 경우
                if (status === 401 || status === 403) {
                    setStatus("인증이 만료되었습니다. 다시 로그인해주세요.");
                    setTimeout(()=>{
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
        if (token) {
            loadPage(pageId, token);
        }
    };
    const handleCreatePage = (parentId)=>{
        // parentId가 null이면 상위 페이지 생성 (개인 워크스페이스와 같은 레벨)
        // parentId가 있으면 하위 페이지 생성
        setNewPageParentId(parentId ?? null);
        setShowCreateModal(true);
    };
    const createPage = async ()=>{
        if (!token || !newPageTitle.trim()) {
            setStatus("페이지 제목을 입력해주세요.");
            return;
        }
        try {
            const payload = {
                title: newPageTitle
            };
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
                setTimeout(()=>setStatus(null), 3000);
            } else {
                const errorText = await res.text();
                console.error("File upload error:", errorText);
                try {
                    const errorJson = JSON.parse(errorText);
                    setStatus("파일 업로드에 실패했습니다: " + (errorJson.message || errorText));
                } catch  {
                    setStatus("파일 업로드에 실패했습니다: " + errorText);
                }
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
            const res = await fetch(`${API_URL}/pages/blocks/${blockId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-user-token": token
                },
                body: JSON.stringify(props)
            });
            if (res.ok) {
                // 블록 업데이트 후 블록 목록 다시 로드
                if (currentPage) {
                    loadBlocks(currentPage.id, token);
                }
            } else {
                console.error("Failed to update block", await res.text());
            }
        } catch (error) {
            console.error("Failed to update block", error);
        }
    };
    const handleBlockCreate = async (type, props)=>{
        if (!token || !currentPage) return;
        try {
            const res = await fetch(`${API_URL}/pages/${currentPage.id}/blocks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-user-token": token
                },
                body: JSON.stringify({
                    type,
                    props
                })
            });
            if (res.ok) {
                loadBlocks(currentPage.id, token);
            }
        } catch (error) {
            console.error("Failed to create block", error);
        }
    };
    const handleBlocksReorder = async (blockIds)=>{
        if (!token || !currentPage) return;
        try {
            const res = await fetch(`${API_URL}/pages/${currentPage.id}/blocks/reorder`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-user-token": token
                },
                body: JSON.stringify({
                    blockIds
                })
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
    const handleBlockDelete = async (blockId)=>{
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
                setTimeout(()=>setStatus(null), 2000);
            } else {
                setStatus("블록 삭제에 실패했습니다.");
                setTimeout(()=>setStatus(null), 2000);
            }
        } catch (error) {
            console.error("Failed to delete block", error);
            setStatus("블록 삭제에 실패했습니다.");
            setTimeout(()=>setStatus(null), 2000);
        }
    };
    const handleUpdatePageTitle = async (pageId, newTitle)=>{
        if (!token || !newTitle.trim()) return;
        try {
            const res = await fetch(`${API_URL}/pages/${pageId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-user-token": token
                },
                body: JSON.stringify({
                    title: newTitle
                })
            });
            if (res.ok) {
                setSidebarRefresh((prev)=>prev + 1);
                // 현재 페이지인 경우 제목 업데이트
                if (currentPage && currentPage.id === pageId) {
                    setCurrentPage({
                        ...currentPage,
                        title: newTitle
                    });
                    setEditingPageTitleValue(newTitle);
                }
            } else {
                const error = await res.json().catch(()=>({
                        message: "페이지 제목 수정에 실패했습니다."
                    }));
                setStatus(error.message ?? "페이지 제목 수정에 실패했습니다.");
                setTimeout(()=>setStatus(null), 2000);
            }
        } catch (error) {
            console.error("Failed to update page title", error);
            setStatus("페이지 제목 수정에 실패했습니다.");
            setTimeout(()=>setStatus(null), 2000);
        }
    };
    const handleDeletePage = async (pageId)=>{
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
                        headers: {
                            "x-user-token": token
                        }
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
                setTimeout(()=>{
                    setSidebarRefresh((prev)=>prev + 1);
                }, 100);
                setTimeout(()=>setStatus(null), 2000);
            } else {
                const error = await res.json().catch(()=>({
                        message: "페이지 삭제에 실패했습니다."
                    }));
                setStatus(error.message ?? "페이지 삭제에 실패했습니다.");
                setTimeout(()=>setStatus(null), 2000);
            }
        } catch (error) {
            console.error("Failed to delete page", error);
            setStatus("페이지 삭제에 실패했습니다.");
            setTimeout(()=>setStatus(null), 2000);
        }
    };
    if (!token) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "workspace-loading",
            children: "로딩 중..."
        }, void 0, false, {
            fileName: "[project]/apps/web/src/app/workspace/page.tsx",
            lineNumber: 419,
            columnNumber: 12
        }, this);
    }
    if (!currentPage) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "workspace-loading",
            style: {
                padding: "2rem",
                textAlign: "center"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: "로딩 중..."
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                    lineNumber: 425,
                    columnNumber: 9
                }, this),
                status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: "1rem",
                        color: "#666",
                        fontSize: "0.9rem"
                    },
                    children: status
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                    lineNumber: 427,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/app/workspace/page.tsx",
            lineNumber: 424,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "workspace-layout",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sidebar"], {
                token: token,
                currentPageId: currentPage.id,
                onPageSelect: handlePageSelect,
                onCreatePage: ()=>handleCreatePage(null),
                onCreateSubPage: (parentId)=>handleCreatePage(parentId),
                onDeletePage: handleDeletePage,
                onUpdatePageTitle: handleUpdatePageTitle,
                refreshTrigger: sidebarRefresh
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                lineNumber: 437,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "workspace-main",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "page-header",
                        children: [
                            editingPageTitle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: editingPageTitleValue,
                                onChange: (e)=>setEditingPageTitleValue(e.target.value),
                                onKeyDown: (e)=>{
                                    if (e.key === "Enter") {
                                        handleUpdatePageTitle(currentPage.id, editingPageTitleValue);
                                        setEditingPageTitle(false);
                                    } else if (e.key === "Escape") {
                                        setEditingPageTitleValue(currentPage.title);
                                        setEditingPageTitle(false);
                                    }
                                },
                                onBlur: ()=>{
                                    handleUpdatePageTitle(currentPage.id, editingPageTitleValue);
                                    setEditingPageTitle(false);
                                },
                                style: {
                                    fontSize: "1.5rem",
                                    fontWeight: "600",
                                    padding: "0.5rem",
                                    border: "2px solid #0066cc",
                                    borderRadius: "4px",
                                    width: "100%",
                                    maxWidth: "600px"
                                },
                                autoFocus: true
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                                lineNumber: 450,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                onDoubleClick: ()=>{
                                    setEditingPageTitleValue(currentPage.title);
                                    setEditingPageTitle(true);
                                },
                                style: {
                                    cursor: "text"
                                },
                                title: "더블클릭하여 이름 수정",
                                children: currentPage.title
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                                lineNumber: 479,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "page-actions",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "file-upload-btn",
                                        children: [
                                            "📎 파일 업로드",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "file",
                                                onChange: handleFileUpload,
                                                style: {
                                                    display: "none"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                                                lineNumber: 493,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                                        lineNumber: 491,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "button secondary",
                                        onClick: ()=>setShowShareModal(true),
                                        children: "공유"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                                        lineNumber: 495,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                                lineNumber: 490,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                        lineNumber: 448,
                        columnNumber: 9
                    }, this),
                    status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "status-message",
                        style: {
                            padding: "0.5rem 1rem",
                            margin: "0.5rem 0",
                            background: status.includes("실패") ? "#ffebee" : "#e8f5e9",
                            borderRadius: "4px",
                            color: status.includes("실패") ? "#c62828" : "#2e7d32"
                        },
                        children: status
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                        lineNumber: 501,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "page-content",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$block$2d$editor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BlockEditor"], {
                            token: token,
                            pageId: currentPage.id,
                            blocks: blocks,
                            onBlockUpdate: handleBlockUpdate,
                            onBlockCreate: handleBlockCreate,
                            onBlockDelete: handleBlockDelete,
                            onBlocksReorder: handleBlocksReorder
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                            lineNumber: 512,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                        lineNumber: 511,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                lineNumber: 447,
                columnNumber: 7
            }, this),
            showCreateModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-overlay",
                onClick: ()=>setShowCreateModal(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: "새 페이지"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                            lineNumber: 526,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                            lineNumber: 527,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "modal-actions",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: createPage,
                                    children: "생성"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                                    lineNumber: 540,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowCreateModal(false),
                                    children: "취소"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                                    lineNumber: 541,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                            lineNumber: 539,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                    lineNumber: 525,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                lineNumber: 524,
                columnNumber: 9
            }, this),
            showShareModal && currentPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$share$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShareModal"], {
                token: token,
                pageId: currentPage.id,
                onClose: ()=>setShowShareModal(false)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/workspace/page.tsx",
                lineNumber: 547,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/app/workspace/page.tsx",
        lineNumber: 436,
        columnNumber: 5
    }, this);
}

})()),
"[project]/apps/web/src/app/workspace/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules ssr)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {


})()),

};

//# sourceMappingURL=src_451023._.js.map
const CHUNK_PUBLIC_PATH = "server/app/workspace/page.js";
const runtime = require("../../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/08b5e_896e77._.js");
runtime.loadChunk("server/chunks/ssr/[project]_apps_web_65a53c._.js");
runtime.getOrInstantiateRuntimeModule("[project]/apps/web/.next-internal/server/app/workspace/page/actions.js [app-rsc] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/app-page.js?page=/workspace/page { COMPONENT_0 => \"[project]/apps/web/src/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)\", COMPONENT_1 => \"[project]/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)\", COMPONENT_2 => \"[project]/apps/web/src/app/workspace/page.tsx [app-rsc] (ecmascript, Next.js server component)\" } [app-rsc] (ecmascript) <facade>", CHUNK_PUBLIC_PATH).exports;

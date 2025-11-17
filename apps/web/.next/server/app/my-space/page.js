const CHUNK_PUBLIC_PATH = "server/app/my-space/page.js";
const runtime = require("../../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/08b5e_ccfbb1._.js");
runtime.loadChunk("server/chunks/ssr/[project]_apps_web_ebb819._.js");
runtime.getOrInstantiateRuntimeModule("[project]/apps/web/.next-internal/server/app/my-space/page/actions.js [app-rsc] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/app-page.js?page=/my-space/page { COMPONENT_0 => \"[project]/apps/web/src/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)\", COMPONENT_1 => \"[project]/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)\", COMPONENT_2 => \"[project]/apps/web/src/app/my-space/page.tsx [app-rsc] (ecmascript, Next.js server component)\" } [app-rsc] (ecmascript) <facade>", CHUNK_PUBLIC_PATH).exports;

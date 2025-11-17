const roadmap = [
  {
    phase: "Phase 0",
    title: "Foundation",
    items: ["Monorepo & DevStack", "Web/API Skeleton", "Realtime/Worker Stub"]
  },
  {
    phase: "Phase 1",
    title: "Core Product",
    items: ["페이지/블록 편집", "캘린더/업무", "파일 허브"]
  },
  {
    phase: "Phase 2",
    title: "Collaboration",
    items: ["실시간 커서/댓글", "고급 권한", "검색 & 알림"]
  }
];

export function RoadmapTimeline() {
  return (
    <section className="roadmap">
      <h2>로드맵</h2>
      <div className="timeline">
        {roadmap.map((step) => (
          <div key={step.phase} className="timeline-card">
            <small>{step.phase}</small>
            <h3>{step.title}</h3>
            <ul>
              {step.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

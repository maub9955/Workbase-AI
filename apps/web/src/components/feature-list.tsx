const features = [
  {
    title: "블록 기반 페이지",
    description: "Notion과 동일한 블록 모델로 문서, 데이터베이스, 임베드를 자유롭게 조합합니다.",
    badge: "문서"
  },
  {
    title: "캘린더 · 업무 연결",
    description: "드래그 앤 드롭으로 일정과 업무를 계획하고 관련 문서를 바로 연결하세요.",
    badge: "캘린더"
  },
  {
    title: "대용량 파일 허브",
    description: "5GB 이상 파일도 멀티파트 업로드, 링크 공유, 접근 로그까지 지원합니다.",
    badge: "파일"
  },
  {
    title: "권한 & 감사 로그",
    description: "워크스페이스/페이지 ACL과 공유 링크 보호, 감사 로그로 보안을 강화합니다.",
    badge: "보안"
  }
];

export function FeatureList() {
  return (
    <section className="feature-grid">
      {features.map((feature) => (
        <article key={feature.title} className="feature-card">
          <span className="badge">{feature.badge}</span>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </article>
      ))}
    </section>
  );
}

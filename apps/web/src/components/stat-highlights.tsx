const stats = [
  { label: "문서 템플릿", value: "25+", sub: "회의록 · 업무보고 · 온보딩" },
  { label: "연동 예정", value: "SSO", sub: "사내 계정/LDAP" },
  { label: "스토리지", value: "무제한*", sub: "사내 S3/MinIO 기반" }
];

export function StatHighlights() {
  return (
    <section className="stats">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-card">
          <span>{stat.label}</span>
          <strong>{stat.value}</strong>
          <p>{stat.sub}</p>
        </div>
      ))}
      <p className="footnote">*사내 인프라 용량 한도 내에서 확장</p>
    </section>
  );
}

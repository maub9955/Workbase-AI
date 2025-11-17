import { FeatureList } from "../components/feature-list";
import { RoadmapTimeline } from "../components/roadmap-timeline";
import { StatHighlights } from "../components/stat-highlights";

export default function HomePage() {
  return (
    <main className="page">
      <nav className="nav">
        <strong>Workbase-AI</strong>
        <div>
          <a href="#features">기능</a>
          <span style={{ margin: "0 0.5rem" }}>·</span>
          <a href="#roadmap">로드맵</a>
          <span style={{ margin: "0 0.5rem" }}>·</span>
          <a href="/my-space">내 페이지</a>
        </div>
      </nav>

      <section className="hero">
        <h1>문서·업무·파일을 한 공간에서</h1>
        <p>
          팀원이 동시에 편집하고, 일정과 업무를 연결하고, 대용량 파일까지 안전하게 공유할 수 있는
          사내 전용 Notion 스타일 협업 허브를 만들고 있어요.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="/my-space">
            프로토타입 사용하기
          </a>
          <a className="button secondary" href="#roadmap">
            로드맵 보기
          </a>
        </div>
      </section>

      <div id="features">
        <h2>핵심 기능</h2>
        <FeatureList />
      </div>

      <StatHighlights />

      <div id="roadmap">
        <RoadmapTimeline />
      </div>
    </main>
  );
}

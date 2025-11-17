import { MySpace } from "../../components/my-space";

export const metadata = {
  title: "나만의 개인 페이지",
  description: "회원가입만 하면 즉시 개인 워크스페이스가 생성됩니다."
};

export default function MySpacePage() {
  return (
    <main className="page">
      <MySpace />
    </main>
  );
}

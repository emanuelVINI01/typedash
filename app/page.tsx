import { Header } from "@/src/components/main/Header";
import { TypeDashHome } from "@/src/components/main/TypeDashHome";

export default function TypeDashPage() {
  return (
    <div className="min-h-screen bg-background pb-24 text-foreground lg:pb-0">
      <Header />
      <TypeDashHome />
    </div>
  );
}

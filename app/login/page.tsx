import Link from "next/link";
import { Keyboard } from "lucide-react";
import { signIn } from "@/src/auth";

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative"
      style={{ background: "#282a36", color: "#f8f8f2" }}
    >
      {/* Back button / Logo */}
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 group transition-all"
      >
        <Keyboard className="w-6 h-6 group-hover:scale-110 transition-transform" style={{ color: "#bd93f9" }} />
        <span
          className="text-xl font-bold tracking-tight"
          style={{ color: "#bd93f9" }}
        >
          TypeDash
        </span>
      </Link>

      {/* Login Box */}
      <div 
        className="w-full max-w-sm rounded-3xl p-8 flex flex-col items-center shadow-2xl backdrop-blur-sm border border-white/5"
        style={{ background: "#21222c" }}
      >
        <h1 className="text-2xl font-bold mb-2">Entrar</h1>
        <p className="text-sm text-center mb-8" style={{ color: "#6272a4" }}>
          Faça login para salvar suas métricas e participar do ranking (em breve).
        </p>

        <div className="w-full flex flex-col gap-4">

          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "#44475a", color: "#f8f8f2" }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12" />
              </svg>
              Continuar com GitHub
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

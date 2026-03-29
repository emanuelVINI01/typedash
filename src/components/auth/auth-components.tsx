import { signIn, signOut } from "@/src/auth";


export function LoginGithub() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <button type="submit" className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition">
        Entrar com GitHub
      </button>
    </form>
  );
}

export function Logout() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
        Sair
      </button>
    </form>
  );
}

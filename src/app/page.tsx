import {routes} from "@/lib/constants";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-full max-w-[800px] flex items-center justify-center mx-auto">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-semibold mb-4 text-brand-foreground">
          🚀 Speedy Image Editor
        </h1>
        <h3 className="mb-6">Edit your images blazingly fast ✨</h3>
        <Link
          href={routes.auth.LOGIN}
          className="px-4 py-2 bg-brand-foreground text-primary-foreground rounded-md self-center"
        >
          Get started
        </Link>
      </div>
    </main>
  );
}

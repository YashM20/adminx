import { redirect } from "next/navigation";

export default function Home() {
  redirect('/dashboard');
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">

    </div>
  );
}

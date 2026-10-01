import { notFound } from "next/navigation";
import { getSession, sessions } from "@/content/sessions";
import SessionView from "./SessionView";

export function generateStaticParams() {
  return sessions.map((session) => ({ number: String(session.number) }));
}

export default async function SessionPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const session = getSession(Number(number));
  if (!session) notFound();

  return <SessionView sessionNumber={session.number} />;
}

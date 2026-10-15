import Image from "next/image";

/**
 * The app's crest: a navy university shield where an owl and a giraffe study an open book together.
 * The artwork lives in public/crest.svg (full logo with wordmark: public/logo.svg).
 */
export default function Logo({ className = "h-11 w-auto" }: { className?: string }) {
  return <Image src="/crest.svg" alt="" width={120} height={140} unoptimized priority className={className} />;
}

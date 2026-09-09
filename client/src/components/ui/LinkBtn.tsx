import Link from "next/link";

interface LinkBtnProps {
  label: string;
  path: string;
  styling: string;
}

export function LinkBtn({ label, path, styling }: LinkBtnProps) {
  return (
    <Link href={path} className={styling}>
      {label}
    </Link>
  );
}

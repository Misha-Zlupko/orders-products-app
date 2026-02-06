import Link from "next/link";

interface AuthButtonProps {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}

export function AuthButton({
  href,
  children,
  primary = false,
}: AuthButtonProps) {
  const styles = primary
    ? { backgroundColor: "#10b981", color: "white" }
    : { color: "#10b981", borderColor: "#10b981" };

  return (
    <Link
      href={href}
      className="btn btn-sm w-100 text-decoration-none text-center"
      style={styles}
    >
      {children}
    </Link>
  );
}

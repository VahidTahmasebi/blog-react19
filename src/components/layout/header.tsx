"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import ThemeToggle from "../theme/theme-toggle";
import { Button } from "../ui/button";
import UserMenu from "../auth/user-menu";

function Header() {
  const router = useRouter();

  const navItem = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Create Post",
      href: "post/create",
    },
  ];

  const { data: session, isPending } = useSession();

  return (
    <div className="sticky top-0 z-10 border-b bg-background">
      <div className="container h-16 flex items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold">
            Next 15 Blog
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItem.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">{/* Search */}</div>

          <ThemeToggle />

          <div className="flex items-center gap-2">
            {isPending ? null : session?.user ? (
              <UserMenu user={session?.user} />
            ) : (
              <Button
                asChild
                variant="default"
                className="cursor-pointer"
                onClick={() => {
                  router.push("/auth");
                }}
              >
                <Link href="/auth">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;

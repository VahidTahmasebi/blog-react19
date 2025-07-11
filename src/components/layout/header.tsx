"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

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

          <div className="flex items-center gap-2">
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
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;

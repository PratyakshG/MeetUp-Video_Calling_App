"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-[14vh] text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "group flex gap-4 items-center p-4 rounded-lg justify-start",
                {
                  "bg-blue-2": isActive,
                  "hover:bg-blue-2/40": !isActive,
                },
              )}
            >
              <Image
                src={link.igmUrl}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>

      <Button
        onClick={signOut}
        variant="destructive"
        className="gap-2"
      >
        <LogOut size={16} />
        Logout
      </Button>
    </section>
  );
};

export default Sidebar;

"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";

const MobileNav = () => {
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
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            alt="hamburger icon"
            height={36}
            width={36}
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="border-none bg-dark-1"
        >
          <Link
            href="/"
            className="flex items-center gap-1"
          >
            <Image
              src="/icons/logo-dark.svg"
              alt="MeetUp Logo"
              width={32}
              height={32}
              className="max-sm:size-10"
            />
            <p className="text-[26px] font-extrabold text-white">MeetUp</p>
          </Link>

          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <section className="flex flex-col h-full gap-6 pt-16 text-white">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.route;

                return (
                  <SheetClose key={link.route}>
                    <Link
                      href={link.route}
                      key={link.label}
                      className={cn(
                        "flex gap-4 items-center p-4 rounded-lg w-full max-w-60",
                        {
                          "bg-blue-2": isActive,
                        },
                      )}
                    >
                      <Image
                        src={link.igmUrl}
                        alt={link.label}
                        width={20}
                        height={20}
                      />
                      <p className="font-semibold">{link.label}</p>
                    </Link>
                  </SheetClose>
                );
              })}
            </section>
            <Button
              onClick={signOut}
              variant="destructive"
              className="gap-2 text-white"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;

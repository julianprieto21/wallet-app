"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppleWallet,
  GraphUp,
  Home,
  Notes,
  Reports,
  Settings,
} from "iconoir-react";

export default function NavLinks({
  isLogIn,
  dict,
}: {
  isLogIn: boolean;
  dict: any;
}) {
  const pathName = usePathname();
  const mainLinks = [
    { name: dict.menu.home, href: "/", icon: Home },
    {
      name: dict.menu.transactions,
      href: "/transactions",
      icon: Notes,
    },
    {
      name: dict.menu.investments,
      href: "/investments",
      icon: GraphUp,
      disabled: true,
    },
    {
      name: dict.menu.dashboard,
      href: "/dashboard",
      icon: Reports,
      disabled: true,
    },
    { name: dict.menu.accounts, href: "/accounts", icon: AppleWallet },
    { name: dict.menu.settings, href: "/settings", icon: Settings },
  ];
  return (
    <>
      {mainLinks.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-20 sm:h-12 grow items-center justify-start gap-2 text-palette-100 p-4 text-md hover> font-normal hover:bg-palette-250 hover:text-palette-500 sm:flex-none sm:justify-center lg:justify-start md:p-2 md:px-3 
                ${
                  pathName === link.href
                    ? "bg-palette-250 text-palette-500"
                    : ""
                } ${isLogIn ? "cursor-pointer" : " cursor-not-allowed"}
                ${link.disabled ? "pointer-events-none" : ""}`}
          >
            <LinkIcon className="size-10 xl:size-6 2xl:size-7" />
            <h1 className="text-xl xl:text-sm 2xl:text-base text-palette-100 relative">
              {link.name}
              <p
                className={`${
                  link.disabled
                    ? "text-xs font-thin text-palette-500"
                    : "hidden"
                }`}
              >
                Proximamente
              </p>
            </h1>
          </Link>
        );
      })}
    </>
  );
}

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "./ui/icon";
import { LucideIcon } from "lucide-react";

interface NavLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  children: React.ReactNode;
  icon?: LucideIcon;
  isActive?: boolean;
}

export function NavLink({ children, href, icon: LucideIconComponent, isActive = false, className, ...props }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary-foreground hover:text-primary",
        isActive ? "bg-primary-foreground text-primary" : "text-primary-foreground",
        className
      )}
      {...props}
    >
      {LucideIconComponent && <Icon icon={LucideIconComponent} size={18} />}
      <span>{children}</span>
    </Link>
  );
}
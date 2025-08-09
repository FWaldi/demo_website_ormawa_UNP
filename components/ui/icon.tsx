import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconProps extends React.HTMLAttributes<SVGElement> {
  icon: LucideIcon;
  size?: number;
}

const Icon = ({ icon: LucideIconComponent, size = 24, className, ...props }: IconProps) => {
  return (
    <LucideIconComponent size={size} className={cn("text-foreground", className)} {...props} />
  );
};

export { Icon };
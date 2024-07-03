import { Link as RadixLink } from "@radix-ui/react-navigation-menu";
import {
  Link as RouterLink,
  type LinkProps,
  useLocation,
} from "react-router-dom";

export const NavLink = ({
  to,
  children,
  ...props
}: LinkProps & React.RefAttributes<HTMLAnchorElement>) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <RadixLink asChild active={isActive}>
      <RouterLink to={to} {...props}>
        {children}
      </RouterLink>
    </RadixLink>
  );
};

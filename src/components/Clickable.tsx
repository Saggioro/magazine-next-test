"use client";

import { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";

interface IClickableProps {
  href: string;
  onClick?: () => void;
}

const Clickable: React.FC<PropsWithChildren<IClickableProps>> = ({
  children,
  href,
  onClick,
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        onClick?.();
        router.push(href);
      }}
    >
      {children}
    </div>
  );
};

export default Clickable;

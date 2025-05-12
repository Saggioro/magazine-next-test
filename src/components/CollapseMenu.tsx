"use client";

import { PropsWithChildren, useState } from "react";
import { ThemedText } from "./ThemedText";
import Image from "next/image";

interface IColapseMenuProps {
  Title: React.ComponentType<any>;
  titleProps: any;
  description?: string;
}

const ColapseMenu: React.FC<PropsWithChildren<IColapseMenuProps>> = ({
  Title,
  titleProps,
  description,
  children,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b-footer-background border-b-4 p-2">
      <div
        className="flex flex-row items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <div className="w-4/5">
          <Title {...titleProps} />

          {description && (
            <ThemedText type="semiBold" size="small" color="subtitle">
              {description}
            </ThemedText>
          )}
        </div>
        <div>
          {open ? (
            <Image src={"/arrowup.svg"} alt="Abrir" width={12} height={12} />
          ) : (
            <Image src={"/arrowdown.svg"} alt="Fechar" width={12} height={12} />
          )}
        </div>
      </div>
      {open && <div className="p-2">{children}</div>}
    </div>
  );
};

export default ColapseMenu;

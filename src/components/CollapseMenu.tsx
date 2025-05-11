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
    <div className="mb-1 p-2" onClick={() => setOpen(!open)}>
      <div className="flex flex-row items-center justify-between">
        <div className="w-4/5">
          <Title {...titleProps} />

          {description && (
            <ThemedText type="subtitle">{description}</ThemedText>
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
      {open && <div className="p-4">{children}</div>}
    </div>
  );
};

export default ColapseMenu;

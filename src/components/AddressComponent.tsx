"use client";

import { useUserStore } from "@/stores/useUserStore";
import { ThemedText } from "./ThemedText";
import { useEffect } from "react";
import Image from "next/image";

const AddressComponent: React.FC = () => {
  const address = useUserStore((state) => state.user?.address);
  const fetc = useUserStore((state) => state.fetchUser);
  useEffect(() => {
    fetc();
  }, []);
  return (
    <div className="pb flex flex-row">
      <ThemedText type="semiBold" size="small" color="headerPrimary">
        {address ? address : "Carregando endereço..."}
      </ThemedText>
      <Image
        src={"/arrowright.svg"}
        alt="Fechar"
        width={6}
        height={6}
        className="ml-2"
      />
    </div>
  );
};

export default AddressComponent;

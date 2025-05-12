"use client";

import { useUserStore } from "@/stores/useUserStore";
import { ThemedText } from "./ThemedText";
import { useEffect } from "react";
import Image from "next/image";

const AddressComponent: React.FC = () => {
  const { fetchUser, user } = useUserStore((state) => state);
  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);
  return (
    <div className="pb flex flex-row">
      <ThemedText type="semiBold" size="small" color="headerPrimary">
        {user?.address ? user.address : "Carregando endereço..."}
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

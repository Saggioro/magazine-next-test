"use client";

import { useUserStore } from "@/stores/useUserStore";
import { ThemedText } from "./ThemedText";
import { useEffect } from "react";

const AddressComponent: React.FC = () => {
  const address = useUserStore((state) => state.user?.address);
  const fetc = useUserStore((state) => state.fetchUser);
  useEffect(() => {
    fetc();
  }, []);
  return (
    <ThemedText type="lightBold">
      {address ? address + " >" : "Carregando endereço..."}
    </ThemedText>
  );
};

export default AddressComponent;

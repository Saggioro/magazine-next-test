"use client";
import Image from "next/image";

import { useViewSize } from "@/hooks/useViewSize";

const PromoBanner: React.FC = () => {
  const { width } = useViewSize();
  return (
    <Image
      src={"/promobanner.png"}
      alt="Promoção"
      height={100}
      width={width}
      className="object-cover"
    />
  );
};

export default PromoBanner;

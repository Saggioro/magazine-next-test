"use client";
import Image from "next/image";

import { useViewportSize } from "@/hooks/useViewSize";

const PromoBanner: React.FC = () => {
  const { width } = useViewportSize();
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

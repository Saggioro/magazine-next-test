"use client";

import Image from "next/image";
import { ThemedText } from "./ThemedText";
import { useCartStore } from "@/stores/useCartStore";
interface IQuantityEditProps {
  orderId: number;
  addToCart: () => void;
}
const QuantityEdit: React.FC<IQuantityEditProps> = ({ addToCart, orderId }) => {
  const { deleteFromCart, add, cart } = useCartStore((state) => state);

  return (
    <div className="flex flex-row items-center gap-4">
      <Image
        alt="lixo"
        src={
          cart?.items.find((cartItem) => cartItem.id === orderId)?.quantity ===
          1
            ? "/trash.svg"
            : "/minus.svg"
        }
        width={32}
        height={32}
        loading="lazy"
        onClick={() => deleteFromCart(orderId)}
      />
      <ThemedText>
        {cart?.items.find((cartItem) => cartItem.id === orderId)?.quantity}
      </ThemedText>
      <Image
        alt="lixo"
        src={"/plus.svg"}
        width={32}
        height={32}
        loading="lazy"
        onClick={addToCart}
      />{" "}
    </div>
  );
};

export default QuantityEdit;

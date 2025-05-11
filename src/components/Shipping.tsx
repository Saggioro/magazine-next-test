import Image from "next/image";

import { ThemedText } from "./ThemedText";
interface IShippingProps {
  restaurant: IRestaurant;
}
const Shipping: React.FC<IShippingProps> = ({ restaurant }) => {
  return (
    <div className="flex flex-row items-center">
      <Image
        src={
          restaurant?.shippingPrice === 0
            ? "/frete-gratis.svg"
            : "/frete-pago.svg"
        }
        alt="Frete"
        width={24}
        height={24}
        className="mr-1.5"
      />
      <ThemedText
        className={
          restaurant?.shippingPrice === 0
            ? "text-free-shipping"
            : "text-paid-shipping"
        }
      >
        {restaurant?.shippingPrice === 0
          ? "grátis"
          : `R$ ${restaurant?.shippingPrice.toFixed(2)}`}
      </ThemedText>
    </div>
  );
};

export default Shipping;

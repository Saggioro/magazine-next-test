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
        width={22}
        height={22}
        className="mr-1.5"
      />
      <ThemedText
        type="bold"
        color={
          restaurant?.shippingPrice === 0 ? "freeShipping" : "secondaryTitle"
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

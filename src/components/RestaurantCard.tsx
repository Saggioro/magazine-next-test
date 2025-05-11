import { ListChildComponentProps } from "react-window";
import { ThemedText } from "./ThemedText";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RestaurantCard: React.FC<
  ListChildComponentProps<{
    items: IRestaurant[];
    onClickAction: (id: number) => void;
  }>
> = ({ data, index, style }) => {
  const restaurant = data.items[index];
  return (
    <div
      onClick={() => {
        try {
          data.onClickAction(restaurant?.id);
        } catch (error) {
          console.error("Erro ao buscar restaurante:", error);
        }
      }}
      style={style}
      className="2 bf-card-background mt-1 mb-1 flex flex-row items-center"
    >
      <Image
        src={restaurant?.logo ?? "/logo.svg"}
        alt={restaurant?.name}
        width={72}
        height={72}
        className="mr-4 rounded-tl-md rounded-bl-md"
      />
      <div>
        <ThemedText type="bold">{restaurant?.name}</ThemedText>
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
          <Image
            src={"/estrela.svg"}
            alt="Avaliação"
            width={24}
            height={24}
            className="mr-1 ml-2"
          />
          <ThemedText type="bold">{restaurant?.review.toFixed(1)}</ThemedText>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;

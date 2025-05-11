import { ListChildComponentProps } from "react-window";
import { ThemedText } from "./ThemedText";
import Image from "next/image";
import Shipping from "./Shipping";

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
        data.onClickAction?.(restaurant?.id);
      }}
      style={style}
      className="bg-card-background mt-1 mb-4 flex h-3/4 flex-row items-center"
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
          <Shipping restaurant={restaurant} />
          <Image
            src={"/estrela.svg"}
            alt="Avaliação"
            width={24}
            height={24}
            className="mr-1 ml-2"
          />
          <ThemedText type="bold" color="subtitle">
            {restaurant?.review.toFixed(1)}
          </ThemedText>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;

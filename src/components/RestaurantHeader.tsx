import Image from "next/image";
import { ThemedText } from "./ThemedText";
import Shipping from "./Shipping";

interface IRestaurantHeaderProps {
  restaurant: IRestaurant;
}
const RestaurantHeader: React.FC<IRestaurantHeaderProps> = ({ restaurant }) => {
  return (
    <div className="p-2">
      <div className="flex items-center gap-2">
        <Image
          src={restaurant?.logo}
          alt="restaurante"
          width={48}
          height={48}
          loading="lazy"
        />
        <ThemedText type="bold" extraClasses="">
          {restaurant?.name}
        </ThemedText>
      </div>
      <div className="my-2 flex flex-row items-start justify-between">
        <div className="flex flex-row gap-4">
          <Image
            src={"/share.svg"}
            alt="restaurante"
            width={36}
            height={36}
            loading="lazy"
          />
          <Image
            src={"/like.svg"}
            alt="restaurante"
            width={36}
            height={36}
            loading="lazy"
          />
        </div>
        <ThemedText type="bold" size="small" color="freeShipping">
          mais infos {">"}{" "}
        </ThemedText>
      </div>
      <div className="my-2 flex flex-row items-center">
        <Shipping restaurant={restaurant} />
        {restaurant?.open && (
          <>
            <Image
              src={"/arrowrightgray.svg"}
              alt=">"
              width={14}
              height={14}
              loading="lazy"
              className="mr-1 ml-1 invert"
            />
            <ThemedText type="bold" color="subtitle" size="small">
              • hoje, {restaurant.deliveryTimeAvg - 5}-
              {restaurant.deliveryTimeAvg + 5} • 5.2km
            </ThemedText>
          </>
        )}
      </div>
      <div className="flex flex-row items-center">
        <Image
          src={"/estrela.svg"}
          alt="Avaliação"
          width={24}
          height={24}
          className="mr-1"
        />
        <ThemedText type="bold" color="subtitle">
          {restaurant?.review.toFixed(1)}
        </ThemedText>
        <Image
          src={"/arrowrightgray.svg"}
          alt=">"
          width={14}
          height={14}
          loading="lazy"
          className="mr-1 ml-1 invert"
        />
        <ThemedText
          type="bold"
          color="subtitle"
          size="small"
          extraClasses="mr-2"
        >
          •
        </ThemedText>
        <ThemedText type="bold" color="discount" size="small">
          fecha às {restaurant?.closingHour} horas
        </ThemedText>
      </div>
      {restaurant.shippingPrice > 0 && restaurant?.freeShippingLimit > 0 && (
        <ThemedText type="bold" size="small" color="freeShipping">
          entrega grátis acima de R$ {restaurant?.freeShippingLimit}
        </ThemedText>
      )}
      {restaurant.minimumOrder && (
        <ThemedText type="bold" size="small" color="subtitle">
          pedido mínimo: R$ {restaurant?.minimumOrder}
        </ThemedText>
      )}
    </div>
  );
};

export default RestaurantHeader;

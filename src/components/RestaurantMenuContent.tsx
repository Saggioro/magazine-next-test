import Image from "next/image";
import { ThemedText } from "./ThemedText";
import Clickable from "./Clickable";
import {
  checkDiscountItem,
  getMinimumItemPrice,
  getMinimumPriceWithNoDiscount,
} from "@/utils/priceUtils";
import { useRestaurantMenuItemStore } from "@/stores/useRestaurantMenuItemStore";
import { useRestaurantStore } from "@/stores/useRestaurantStore";

interface IRestaurantMenuContentProps {
  menu: IMenu;
}

const RestaurantMenuContent: React.FC<IRestaurantMenuContentProps> = ({
  menu,
}) => {
  const { restaurant } = useRestaurantStore((state) => state);

  return (
    <div className="flex flex-col">
      {menu.items.map((item) => (
        <Clickable
          href={`/restaurant/${restaurant?.id}/item/${menu.id}/${item.id}`}
          key={item.name}
        >
          <div className="mb-2 flex flex-row justify-between">
            <div className="w-3/5" onClick={() => getMinimumItemPrice(item)}>
              <ThemedText type="semiBold">{item.name}</ThemedText>
              <ThemedText size="small" color="subtitle">
                {item.description}
              </ThemedText>
            </div>
            <div className="flex flex-col items-end">
              {checkDiscountItem(item) ? (
                <div className="flex flex-col items-end">
                  <ThemedText
                    type="bold"
                    size="small"
                    color="subtitle"
                    extraClasses="line-through w-max"
                  >
                    R$ {getMinimumPriceWithNoDiscount(item)?.toFixed(2)}
                  </ThemedText>
                  <div className="flex flex-row items-center">
                    <Image
                      alt="Desconto"
                      src={"/discount.svg"}
                      width={16}
                      height={16}
                      className="mr-2"
                      loading="lazy"
                    />
                    <ThemedText
                      type="bold"
                      color="discount"
                      extraClasses="w-max"
                    >
                      R$ {getMinimumItemPrice(item)?.toFixed(2)}
                    </ThemedText>
                  </div>
                </div>
              ) : (
                <ThemedText type="bold" color="secondaryTitle">
                  R$ {getMinimumItemPrice(item)?.toFixed(2)}
                </ThemedText>
              )}
            </div>
          </div>
        </Clickable>
      ))}
    </div>
  );
};

export default RestaurantMenuContent;

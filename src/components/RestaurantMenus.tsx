import Image from "next/image";
import { ThemedText } from "./ThemedText";
import dynamic from "next/dynamic";
import RestaurantMenuContent from "./RestaurantMenuContent";
import { checkDiscountMenu } from "@/utils/priceUtils";
const ColapseMenu = dynamic(() => import("./CollapseMenu"), { ssr: false });

interface IRestaurantMenusProps {
  restaurant: IRestaurant;
}
const RestaurantMenus: React.FC<IRestaurantMenusProps> = ({ restaurant }) => {
  const Title: React.FC<{ discount: boolean; title: string }> = ({
    discount,
    title,
  }) => (
    <div className="flex flex-row items-center">
      <ThemedText type="bold">{title}</ThemedText>
      {discount && (
        <Image
          alt="Desconto"
          src={"/discount.svg"}
          width={20}
          height={20}
          className="ml-2"
          loading="lazy"
        />
      )}
    </div>
  );

  return (
    <div className="flex w-full flex-row items-center gap-2">
      <div className="flex w-full flex-col">
        {restaurant.menus.map((menu) => (
          <ColapseMenu
            Title={Title}
            titleProps={{
              discount: checkDiscountMenu(menu),
              title: menu.name,
            }}
            description={menu.description}
            key={menu.name}
          >
            <RestaurantMenuContent menu={menu} />
          </ColapseMenu>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenus;

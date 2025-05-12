"use client";

import { useEffect } from "react";
import FlatList from "./FlatList";
import { useViewSize } from "@/hooks/useViewSize";
import { useRestaurantsStore } from "@/stores/useRestaurantsStore";
import { ThemedText } from "./ThemedText";
import { useRouter } from "next/navigation";
import RestaurantCard from "./RestaurantCard";

const RestaurantsList: React.FC = () => {
  const { height, width } = useViewSize();
  const cardSize = 98;
  const restaurants = useRestaurantsStore((state) => state.restaurants) ?? [];
  const fetch = useRestaurantsStore((state) => state.fetchRestaurants);
  useEffect(() => {
    fetch();
  }, []);
  const router = useRouter();
  const getHeight = (length: number) => {
    if (height > length * cardSize) {
      return length * (cardSize + 3);
    }
    return height;
  };
  const getRestaurantsByStatus = (open: boolean) => {
    return restaurants.filter((restaurant) => restaurant.open === open);
  };
  return (
    <div className="mt-4 pl-2">
      {restaurants.find((restaurant) => restaurant.open === true) ? (
        <>
          <ThemedText type="bold" color="secondaryTitle" extraClasses="mb-2">
            abertos
          </ThemedText>

          <FlatList
            height={getHeight(getRestaurantsByStatus(true).length)}
            itemCount={getRestaurantsByStatus(true).length}
            itemSize={cardSize}
            width={width * 0.97}
            Row={RestaurantCard}
            itemData={{
              items: getRestaurantsByStatus(true),
              onClickAction: (id) => router.push(`/restaurant/${id}`),
            }}
          />
        </>
      ) : (
        <ThemedText>Carregando restaurantes...</ThemedText>
      )}

      {restaurants.find((restaurant) => restaurant.open === false) && (
        <>
          <ThemedText type="bold" color="secondaryTitle" extraClasses="mb-2">
            fechados
          </ThemedText>
          <FlatList
            height={getHeight(getRestaurantsByStatus(false).length)}
            itemCount={getRestaurantsByStatus(false).length}
            itemSize={cardSize}
            width={width * 0.97}
            Row={RestaurantCard}
            itemData={{
              items: getRestaurantsByStatus(false),
            }}
          />
        </>
      )}
    </div>
  );
};

export default RestaurantsList;

"use client";

import RestaurantHeader from "@/components/RestaurantHeader";
import RestaurantMenus from "@/components/RestaurantMenus";
import Shipping from "@/components/Shipping";
import { ThemedText } from "@/components/ThemedText";
import { useRestaurantMenuItemStore } from "@/stores/useRestaurantMenuItemStore";
import { useRestaurantStore } from "@/stores/useRestaurantStore";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const Restaurant: React.FC = () => {
  const { id } = useParams();
  const { fetchRestaurant, restaurant } = useRestaurantStore((state) => state);

  useEffect(() => {
    fetchRestaurant(Number(id));
  }, [id]);

  return (
    <div>
      {restaurant ? (
        <>
          <RestaurantHeader restaurant={restaurant} />
          <RestaurantMenus restaurant={restaurant} />
        </>
      ) : (
        <ThemedText>Carregando...</ThemedText>
      )}
    </div>
  );
};

export default Restaurant;

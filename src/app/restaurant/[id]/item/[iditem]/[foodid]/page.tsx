"use client";

import Button from "@/components/Button";
import ItemOption from "@/components/ItemOption";
import SelectInput from "@/components/SelectInput";
import { ThemedText } from "@/components/ThemedText";
import { useViewSize } from "@/hooks/useViewSize";
import { useCartStore } from "@/stores/useCartStore";
import { useRestaurantMenuItemStore } from "@/stores/useRestaurantMenuItemStore";
import { useRestaurantStore } from "@/stores/useRestaurantStore";
import { getMinimumItemPrice, getTotalPrice } from "@/utils/priceUtils";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ISelectOptions {
  extra: string;
  options: IOption[];
}

const RestaurantItem: React.FC = () => {
  const { width } = useViewSize();
  const { id, iditem, foodid } = useParams();
  const router = useRouter();
  const { item, setMenuItem } = useRestaurantMenuItemStore((state) => state);
  const { restaurant, fetchRestaurant } = useRestaurantStore((state) => state);
  const { deleteFromCart, add, cart } = useCartStore((state) => state);
  const [selectedOptions, setSelectedOptions] = useState<ISelectOptions[]>([]);
  const [orderId, setOrderId] = useState<number | undefined>();
  const [errors, setErrors] = useState<string[]>([]);
  const validate = () => {
    let validated = true;
    item?.extras?.forEach((itemValidate) => {
      if (itemValidate.minimumChoice > 0) {
        const findRequired = selectedOptions.find(
          (opt) => opt.extra === itemValidate.name,
        );
        if (!findRequired) {
          setErrors((pstate) => [...pstate, itemValidate.name]);
          validated = false;
        } else {
          if (findRequired.options.length < itemValidate.minimumChoice) {
            setErrors((pstate) => [...pstate, itemValidate.name]);
            validated = false;
          }
        }
      }
    });
    return validated;
  };
  const handleSelect = (extra: IExtra, option: IOption) => {
    const isMultiSelect = extra.limitChoice !== 1;

    if (!isMultiSelect) {
      const newSelectOptions = selectedOptions.filter(
        (option) => option.extra !== extra.name,
      );
      const newOption: ISelectOptions = {
        extra: extra.name,
        options: [option],
      };
      setSelectedOptions([...newSelectOptions, newOption]);
    } else if (isMultiSelect) {
      const findExtra = selectedOptions.find(
        (option) => option.extra === extra.name,
      );
      if (!findExtra) {
        setSelectedOptions([
          ...selectedOptions,
          { extra: extra.name, options: [option] },
        ]);
      } else {
        const findOption = findExtra?.options.find(
          (opt) => opt.name === option.name,
        );
        const newSelectOptions = selectedOptions.filter(
          (option) => option.extra !== extra.name,
        );
        if (findOption) {
          const newOptions = findExtra.options.filter(
            (opt) => opt.name !== option.name,
          );
          setSelectedOptions([
            ...newSelectOptions,
            { extra: findExtra.extra, options: newOptions },
          ]);
        } else {
          setSelectedOptions([
            ...newSelectOptions,
            { extra: findExtra.extra, options: [...findExtra.options, option] },
          ]);
        }
      }
    }
  };

  const getCount = () => {
    return cart?.count ? cart.count + 1 : 1;
  };
  const addToCart = () => {
    setErrors([]);
    if (!validate() || !restaurant) {
      return;
    }
    if (!orderId) {
      add(
        { id: restaurant.id, name: restaurant.name, image: restaurant.logo },
        {
          id: getCount(),
          itemId: item?.id as number,
          quantity: 1,
          name: item?.name as string,
          selectedExtras: selectedOptions,
        },
        getCount(),
      );
      setOrderId(getCount());
    } else {
      add(
        { id: restaurant.id, name: restaurant.name, image: restaurant.logo },
        {
          id: orderId,
          itemId: item?.id as number,
          quantity: 1,
          name: item?.name as string,
          selectedExtras: selectedOptions,
        },
        orderId,
      );
    }
  };
  const checkSelected = (extra: IExtra, option: IOption) => {
    return !!selectedOptions
      .find((selectedOption) => selectedOption.extra === extra.name)
      ?.options.find((opt) => opt.name === option.name);
  };
  const getItemFromRestaurant = () => {
    return restaurant?.menus
      .find((menu) => menu.id === Number(iditem))
      ?.items.find((item) => item.id === Number(foodid));
  };
  const getRestaurantAndItem = async () => {
    if (!restaurant) {
      await fetchRestaurant(Number(id));
    }
    const itemFound = getItemFromRestaurant();
    if (itemFound) {
      setMenuItem(itemFound);
    }
  };
  useEffect(() => {
    getRestaurantAndItem();
  }, [restaurant, item]);
  return (
    <div>
      {item ? (
        <>
          <Image src={"/food.png"} alt="Comida" width={width} height={1} />
          <div className="p-4">
            <ThemedText type="bold" size="large">
              {item?.name}
            </ThemedText>
            <div className="flex flex-row items-center">
              <ThemedText type="bold" size="large" color="subtitle">
                a partir de
              </ThemedText>
              <ThemedText
                type="bold"
                size="large"
                color="footer"
                extraClasses="ml-2"
              >
                R$ {getMinimumItemPrice(item)?.toFixed(2)}
              </ThemedText>
            </div>
            <ThemedText type="semiBold" color="subtitle">
              {item.description}
            </ThemedText>
          </div>
          <div className="border-b-footer-background flex justify-between border-b-4 p-4">
            <div className="">
              <ThemedText type="bold" size="large">
                quantos?
              </ThemedText>
              <div className="flex flex-row">
                <ThemedText size="small" color="subtitle" extraClasses="mr-1">
                  total
                </ThemedText>

                <ThemedText type="bold" size="small">
                  R${" "}
                  {getTotalPrice(
                    selectedOptions,
                    cart?.items.find((cartItem) => cartItem.id === orderId)
                      ?.quantity || 1,
                  ).toFixed(2)}
                </ThemedText>
              </div>
            </div>
            {orderId &&
            cart?.items.find((cartItem) => cartItem.id === orderId) ? (
              <div className="flex flex-row items-center gap-4">
                <Image
                  alt="lixo"
                  src={
                    cart?.items.find((cartItem) => cartItem.id === orderId)
                      ?.quantity === 1
                      ? "/trash.svg"
                      : "/minus.svg"
                  }
                  width={32}
                  height={32}
                  loading="lazy"
                  onClick={() => deleteFromCart(orderId)}
                />
                <ThemedText>
                  {
                    cart?.items.find((cartItem) => cartItem.id === orderId)
                      ?.quantity
                  }
                </ThemedText>
                <Image
                  alt="lixo"
                  src={"/plus.svg"}
                  width={32}
                  height={32}
                  loading="lazy"
                  onClick={addToCart}
                />
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => {
                    router.push("/cart");
                  }}
                >
                  <ThemedText size="small" color="headerPrimary">
                    Ver ticket
                  </ThemedText>
                </Button>
              </div>
            ) : (
              <Button
                size="lg"
                onClick={() => {
                  addToCart();
                }}
              >
                <ThemedText size="small" color="headerPrimary">
                  adicionar
                </ThemedText>
              </Button>
            )}
          </div>
          {item.extras?.map((extra) => {
            return (
              <div
                className="border-b-footer-background border-b-4 p-4"
                key={extra.name}
              >
                <div className="flex flex-row justify-between">
                  <div>
                    <ThemedText type="bold" size="large">
                      {extra.name}
                    </ThemedText>

                    <ThemedText type="bold" size="small" color="subtitle">
                      escolha
                      {extra.minimumChoice === 0 && " até "}
                      {extra.limitChoice > 1 && extra.minimumChoice > 0
                        ? ` de ${extra.minimumChoice} a `
                        : ""}
                      {" " + extra.limitChoice}
                    </ThemedText>
                  </div>
                  {extra.minimumChoice > 0 && (
                    <div
                      className={`flex h-10 items-center rounded-md bg-black px-4 font-semibold ${errors.find((err) => err === extra.name) && "outline-2 outline-red-500"}`}
                    >
                      <ThemedText color="headerPrimary">obrigatório</ThemedText>
                    </div>
                  )}
                </div>
                {extra.options.map((option) => {
                  return (
                    <ItemOption
                      extra={extra}
                      option={option}
                      handleClick={() => handleSelect(extra, option)}
                      selected={checkSelected(extra, option)}
                      key={option.name}
                    />
                  );
                })}
              </div>
            );
          })}
        </>
      ) : (
        <div>Carregando...</div>
      )}
    </div>
  );
};

export default RestaurantItem;

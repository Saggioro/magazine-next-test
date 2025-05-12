interface ISelectOptions {
  extra: string;
  options: IOption[];
}

export const checkDiscountMenu = (menu: IMenu) => {
  const hasDiscountOnProduct = menu.items.find(
    (item) => !!item.discountedPrice,
  );
  if (hasDiscountOnProduct) {
    return true;
  }
  const hasDiscountOnExtra = menu.items.find(
    (item) =>
      !!item.extras?.find((extra) =>
        extra.options.find((option) => !!option.discountedPrice),
      ),
  );
  return !!hasDiscountOnExtra;
};

export const checkDiscountItem = (item: IMenuItem) => {
  if (!!item.discountedPrice) {
    return true;
  }

  if (
    !!item.extras?.find((extra) =>
      extra.options.find((option) => !!option.discountedPrice),
    )
  ) {
    return true;
  }
};
export const getMinimumPriceWithNoDiscount = (item: IMenuItem) => {
  if (!item.extras) {
    return item.price;
  }
  const itemWithMinumumExtras = item.extras?.reduce<number>((acc, extra) => {
    if (extra.minimumChoice === 0) {
      return acc;
    }
    const extraSortedChepeast = extra.options.sort((a, b) => a.price - b.price);

    const minimumExtras = extraSortedChepeast.slice(0, extra.minimumChoice);

    const minimumValue = minimumExtras.reduce<number>((sum, option) => {
      return sum + option.price;
    }, 0);
    return acc + minimumValue;
  }, 0);
  return itemWithMinumumExtras;
};

export const getMinimumItemPrice = (item: IMenuItem) => {
  if (!item.extras) {
    return item.discountedPrice ?? item.price;
  }
  const itemWithMinumumExtras = item.extras?.reduce<number>((acc, extra) => {
    if (extra.minimumChoice === 0) {
      return acc;
    }
    const extraSortedChepeast = extra.options.sort((a, b) => {
      const aPrice = a.discountedPrice ?? a.price;
      const bPrice = b.discountedPrice ?? b.price;
      return aPrice - bPrice;
    });

    const minimumExtras = extraSortedChepeast.slice(0, extra.minimumChoice);

    const minimumValue = minimumExtras.reduce<number>((sum, option) => {
      const price = option.discountedPrice ?? option.price;
      return sum + price;
    }, 0);
    return acc + minimumValue;
  }, 0);
  return itemWithMinumumExtras;
};

export const getTotalPrice = (
  selectedOptions: ISelectOptions[],
  quantity: number,
): number => {
  const totalExtras = selectedOptions.reduce<number>((acc, cur) => {
    const totalOption = cur.options.reduce<number>((acc, cur) => {
      const price = cur.discountedPrice ? cur.discountedPrice : cur.price;
      return acc + price;
    }, 0);
    return acc + totalOption;
  }, 0);

  return totalExtras * quantity;
};

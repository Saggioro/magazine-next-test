export const getUser = async () => {
  try {
    const data = await fetch("/data.json");

    const { user }: { user: IUser } = (await data.json()) as any;
    return new Promise<IUser>((resolve) => {
      setTimeout(() => {
        resolve(user);
      }, 2000);
    });
  } catch (e) {
    console.error("Erro ao buscar usuário:", e);
  }
};

export const getRestaurants = async () => {
  const data = await fetch("/data.json");
  // sem cache, porque em um app real o resultado pode mudar por geolocalização
  const { restaurants }: { restaurants: IRestaurant[] } =
    (await data.json()) as any;
  return new Promise<IRestaurant[]>((resolve) => {
    setTimeout(() => {
      resolve(restaurants);
    }, 2000);
  });
};

export const getRestaurant = async (id: number) => {
  const data = await fetch("/data.json");
  const { restaurants }: { restaurants: IRestaurant[] } =
    (await data.json()) as any;

  const restaurant = restaurants.find((restaurant) => restaurant.id === id);

  return new Promise<IRestaurant | undefined>((resolve) => {
    setTimeout(() => {
      resolve(restaurant);
    }, 2000);
  });
};

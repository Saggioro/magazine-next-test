interface IOption {
  name: string;
  price: number;
  discountedPrice?: number;
}

interface IExtra {
  name: string;
  limitChoice: number;
  minimumChoice: number;
  options: IOption[];
}

interface IMenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  extras?: IExtra[];
  flags?: string[];
}

interface IMenu {
  id: number;
  name: string;
  description?: string;
  items: IMenuItem[];
}

interface IRestaurant {
  id: number;
  name: string;
  address: string;
  phone: string;
  cuisine: string;
  open: boolean;
  logo: string;
  review: number;
  shippingPrice: number;
  openingHour: string;
  closingHour: string;
  freeShippingLimit: number;
  minimumOrder: number;
  deliveryTimeAvg: number;
  menus: IMenu[];
}

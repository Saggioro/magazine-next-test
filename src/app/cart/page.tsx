"use client";

import Button from "@/components/Button";
import QuantityEdit from "@/components/QuantityEdit";
import { ThemedText } from "@/components/ThemedText";
import { useCartStore } from "@/stores/useCartStore";

import { getTotalPrice } from "@/utils/priceUtils";
import Image from "next/image";
import { useParams } from "next/navigation";

const Cart: React.FC = () => {
  const { id } = useParams();
  const { cart } = useCartStore((state) => state);
  const getSubTotal = () => {
    return cart?.items.reduce<number>(
      (acc, cur) => acc + getTotalPrice(cur.selectedExtras, cur.quantity),
      0,
    );
  };
  return (
    <div className="p-4">
      {cart && (
        <div className="flex flex-row">
          <Image
            src={cart?.restaurant.image}
            alt="Restaurante"
            width={34}
            height={34}
            loading="lazy"
          />
          <div>
            <ThemedText type="bold" color="subtitle">
              seus itens em
            </ThemedText>
            <ThemedText type="bold">{cart.restaurant.name}</ThemedText>
          </div>
        </div>
      )}
      <>
        {cart?.items.map((item) => {
          return (
            <div
              key={item.id}
              className="border-b-footer-background border-b-4 p-2"
            >
              <div className="flex flex-row justify-between">
                <ThemedText type="bold" size="large">
                  {item.name}
                </ThemedText>
                <div className="flex flex-col items-center">
                  <ThemedText type="bold" size="large" color="secondaryTitle">
                    R${" "}
                    {getTotalPrice(item.selectedExtras, item.quantity).toFixed(
                      2,
                    )}
                  </ThemedText>
                  <QuantityEdit addToCart={() => {}} orderId={item.id} />
                </div>
              </div>

              {item.selectedExtras.map((extra) => {
                return (
                  <div className="mt-2" key={extra.extra}>
                    <ThemedText color="subtitle" type="bold">
                      • {extra.extra}
                    </ThemedText>
                    {extra.options.map((opt) => (
                      <div className="flex flex-row" key={opt.name}>
                        <ThemedText extraClasses="ml-4">{opt.name}</ThemedText>
                        {opt.price !== 0 && (
                          <ThemedText
                            extraClasses="ml-4"
                            color="freeShipping"
                            type="bold"
                          >
                            + R${" "}
                            {opt.discountedPrice
                              ? opt.discountedPrice.toFixed(2)
                              : opt.price.toFixed(2)}
                          </ThemedText>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          );
        })}
        {cart && (
          <div className="flex flex-row items-center justify-between">
            <div>
              <ThemedText type="bold">Subtotal</ThemedText>
              <ThemedText type="bold" color="secondaryTitle" size="large">
                R$ {getSubTotal()?.toFixed(2)}
              </ThemedText>
            </div>
            <div>
              <Button variant="secondary" size="lg">
                <ThemedText color="headerPrimary" size="large">
                  ir para pagamento
                </ThemedText>
              </Button>
            </div>
          </div>
        )}

        {!cart && "Carrinho vazio"}
      </>
    </div>
  );
};

export default Cart;

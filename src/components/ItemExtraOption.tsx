import Image from "next/image";
import SelectInput from "./SelectInput";
import { ThemedText } from "./ThemedText";

interface IItemExtraOptionProps {
  option: IOption;
  extra: IExtra;
  selected: boolean;
  handleClick: (extra: IExtra, option: IOption) => void;
}

const ItemExtraOption: React.FC<IItemExtraOptionProps> = ({
  option,
  extra,
  handleClick,
  selected,
}) => {
  return (
    <div
      className="mt-6 mb-2 flex flex-row items-center justify-between"
      key={option.name}
    >
      <div
        className="flex flex-row items-center"
        onClick={() => handleClick(extra, option)}
      >
        <SelectInput
          selected={selected}
          type={extra.limitChoice > 1 ? "square" : "circle"}
        />
        {option.discountedPrice && (
          <Image
            alt="Desconto"
            src={"/discount.svg"}
            width={16}
            height={16}
            className="ml-4"
            loading="lazy"
          />
        )}
        <ThemedText
          color="subtitle"
          extraClasses={option.discountedPrice ? "ml-2" : "ml-4"}
        >
          {option.name}
        </ThemedText>
      </div>
      {option.price > 0 && (
        <div>
          {option.discountedPrice ? (
            <div className="flex flex-row items-end">
              <ThemedText
                type="bold"
                color="subtitle"
                size="small"
                extraClasses="mr-1"
              >
                de R$ {option.price.toFixed(2)} por
              </ThemedText>
              <ThemedText type="bold" color="discount">
                R$ {option.discountedPrice.toFixed(2)}
              </ThemedText>
            </div>
          ) : (
            <ThemedText type="bold" color="secondaryTitle" extraClasses="ml-4">
              + R$ {option.price.toFixed(2)}
            </ThemedText>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemExtraOption;

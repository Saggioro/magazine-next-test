type VariantType = "default" | "semiBold" | "bold";

type VariantColor =
  | "primary"
  | "headerPrimary"
  | "headerSecondary"
  | "subtitle"
  | "footer"
  | "secondaryTitle"
  | "discount";

type VariantSize = "default" | "small" | "large";

interface ThemedVariantColor {
  colors: Record<VariantColor, string>;
}
interface ThemedVariantSize {
  sizes: Record<VariantSize, string>;
}
interface ThemedVariant {
  type: Record<VariantType, string>;
}

export type ThemedTextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  type?: VariantType;
  size?: VariantSize;
  color?: VariantColor;
  extraClasses?: string;
};

const variantClasses: ThemedVariant = {
  type: {
    default: "",
    semiBold: "font-semibold",
    bold: "font-bold",
  },
};
const variantSizes: ThemedVariantSize = {
  sizes: {
    default: "text-base",
    large: "text-xl",
    small: "text-sm",
  },
};

const variantColors: ThemedVariantColor = {
  colors: {
    primary: "text-font-primary",
    headerPrimary: "text-header-primary",
    headerSecondary: "text-light-subtitle",
    subtitle: "text-subtitle",
    footer: "text-font-footer",
    secondaryTitle: "text-status-title",
    discount: "text-free-shipping",
  },
};

export function ThemedText({
  style,
  extraClasses,
  size = "default",
  type = "default",
  color = "primary",
  children,
  ...rest
}: ThemedTextProps) {
  return (
    <p
      className={
        variantClasses["type"][type] +
        " " +
        variantSizes["sizes"][size] +
        " " +
        variantColors["colors"][color] +
        " " +
        extraClasses
      }
      {...rest}
    >
      {children}
    </p>
  );
}

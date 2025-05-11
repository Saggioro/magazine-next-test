type VariantType =
  | "default"
  | "title"
  | "subtitle"
  | "footer"
  | "bold"
  | "lightBold"
  | "lightSubtitle";
interface ThemedVariant {
  light: Record<VariantType, string>;
}

export type ThemedTextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  type?: VariantType;
  extraClasses?: string;
};

const variantClasses: ThemedVariant = {
  light: {
    default: "text-base text-font-primary",
    lightBold: "text-base font-bold text-header-primary",
    lightSubtitle: "text-subtitle text-base font-semibold",
    bold: "text-sm font-bold text-font-primary",
    title: "text-base font-bold text-font-primary",
    subtitle: "text-subtitle text-base font-semibold",
    footer: "text-base font-bold text-font-footer",
  },
};

export function ThemedText({
  style,
  extraClasses,
  type = "default",
  children,
  ...rest
}: ThemedTextProps) {
  return (
    <p className={variantClasses["light"][type] + " " + extraClasses} {...rest}>
      {children}
    </p>
  );
}

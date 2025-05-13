import { InputHTMLAttributes, forwardRef } from "react";

interface TextInputInputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string;
  label?: string;
  error?: string;
  inputSize?: VariantSize;
}
type VariantSize = "lg" | "sm" | "md";

interface InputVariantSize {
  sizes: Record<VariantSize, string>;
}
const variantSizes: InputVariantSize = {
  sizes: {
    lg: "h-22",
    sm: "h-10",
    md: "h-12",
  },
};

const TextInput = forwardRef<HTMLTextAreaElement, TextInputInputProps>(
  ({ placeholder, error, label, inputSize = "sm", ...props }, ref) => {
    const getClasses = () => {
      return `${variantSizes["sizes"][inputSize]} rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${error ? "border-red-500" : "border-gray-300"}`;
    };
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
        <textarea
          placeholder={placeholder}
          ref={ref}
          className={getClasses()}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  },
);

export default TextInput;

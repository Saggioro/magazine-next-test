import React from "react";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button: React.FC<CustomButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  ...props
}) => {
  const baseStyles = "rounded-md font-semibold transition-colors";

  const sizeStyles = {
    sm: "px-3 py-1.5",
    md: "px-4 py-2",
    lg: "px-6 py-2",
  };

  const variantStyles = {
    primary: "bg-button-primary text-white hover:bg-button-primary-shade",
    secondary: "bg-button-secondary text-white hover:bg-button-secondary-shade",
  };

  return (
    <button
      className={` ${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className} "opacity-50 cursor-not-allowed": loading || disabled,`}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? "Carregando..." : children}
    </button>
  );
};

export default Button;

interface ISelectInputProps {
  selected?: boolean;
  type: "square" | "circle";
}

const SelectInput: React.FC<ISelectInputProps> = ({
  selected,
  type = "circle",
}) => {
  const getClasses = () => {
    if (type === "circle") {
      return "cursor-pointer w-5 h-5 border-1 border-subtitle rounded-full flex items-center justify-center";
    } else {
      return "cursor-pointer w-5 h-5 border-1 border-subtitle rounded-sm flex items-center justify-center";
    }
  };
  const getFillClasses = () => {
    if (!selected) return "";
    if (type === "circle") {
      return "bg-header-background h-3 w-3 rounded-full";
    } else {
      return "bg-header-background h-3 w-3 rounded-sm";
    }
  };
  return (
    <div className={getClasses()}>
      <div className={getFillClasses()}></div>
    </div>
  );
};

export default SelectInput;

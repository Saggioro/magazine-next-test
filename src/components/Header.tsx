import Image from "next/image";
import { ThemedText } from "./ThemedText";
import AddressComponent from "./AddressComponent";

const Header: React.FC = () => {
  return (
    <div className="bg-header-background flex h-16 w-full flex-row items-center justify-around">
      <Image src={"/logo.svg"} alt="Logo" width={32} height={32} />
      <div className="flex flex-row items-center">
        <Image src={"/pin.svg"} alt="Pin" width={32} height={32} />
        <div>
          <ThemedText color="headerSecondary" size="small">
            entregando em
          </ThemedText>
          <AddressComponent />
        </div>
      </div>
      <Image src={"/user.svg"} alt="User" width={32} height={32} />
    </div>
  );
};

export default Header;

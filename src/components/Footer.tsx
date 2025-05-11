import { ThemedText } from "./ThemedText";

const Footer: React.FC = () => {
  return (
    <div className="bg-footer-background flex w-full flex-col items-center justify-center self-end p-10">
      <ThemedText type="footer" extraClasses="text-sm">
        Feito com 💜 em maringá-PR
      </ThemedText>
      <ThemedText type="footer" extraClasses="text-font-footer text-center">
        aiqfome.com © 2007-2023 aiqfome LTDA . CNPJ: 09.186.786/0001-58
      </ThemedText>
    </div>
  );
};

export default Footer;

interface ITextInputProps {
  value: string;
  onChange: (text: string) => void;
}

const TextInput: React.FC<ITextInputProps> = ({ onChange, value }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextInput;

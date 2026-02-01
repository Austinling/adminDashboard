type PaymentDropDownProp = {
  mode: string;
  setMode: (mode: string) => void;
};

export function PaymentLineDropDown({ mode, setMode }: PaymentDropDownProp) {
  return (
    <select value={mode} onChange={(e) => setMode(e.target.value)}>
      <option value="Tuition Fee">Tuition Fee</option>
      <option value="Number of Payments">Number of Payments</option>
    </select>
  );
}

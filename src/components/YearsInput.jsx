import SmoothDropdown from "./admin/SmoothDropdown";

export default function YearsInput({ label, isRequired, text='', onSelect }) {
  const currentYear = new Date().getFullYear();
  // Membuat list tahun dari sekarang mundur ke 20 tahun lalu
  const yearOptions = Array.from({ length: 21 }, (_, i) =>
    (currentYear - i).toString(),
  );
  return (
    <>
      <SmoothDropdown
        label={label}
        options={yearOptions}
        placeholder="Pilih tahun"
        isRequired={isRequired}
        message={text}
        onSelect={onSelect}
      />
    </>
  );
}

type InputFieldProps = {
  value: string
  onChange: (value: string) => void
}

export default function InputField({ value, onChange }: InputFieldProps) {
  return (
    <input
      className="p-2 bg-slate-200 text-black"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

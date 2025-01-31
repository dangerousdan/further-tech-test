type SelectProps = {
  value: string
  onChange: (value: string) => void
  options: string[]
}

export default function SelectField({ value, onChange, options }: SelectProps) {
  return (
    <select
      className="p-2 bg-slate-200 text-black"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

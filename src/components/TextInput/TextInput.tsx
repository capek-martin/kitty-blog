import { Controller } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  control: any;
  rules: any;
  errors: any;
  placeholder: string;
  autoFocus?: boolean;
  autoComplete?: string;
  type?: string;
}

export const TextInput = ({
  name,
  label,
  control,
  rules,
  errors,
  placeholder = "",
  autoFocus,
  autoComplete,
  type = "text",
}: Props) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            id={name}
            type={type}
            placeholder={placeholder}
            style={{ width: "100%" }}
            {...field}
          />
        )}
        rules={rules}
      />
      {errors && <span className="error">{errors.message}</span>}
    </div>
  );
};

import { Controller } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  control: any;
  rules: any;
  errors: any;
  placeholder: string;
}

export const TextInput = ({
  name,
  label,
  control,
  rules,
  errors,
  placeholder = "",
}: Props) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input id={name} type="text" placeholder={placeholder} {...field} />
        )}
        rules={rules}
      />
      {errors && <span className="error">{errors.message}</span>}
    </div>
  );
};

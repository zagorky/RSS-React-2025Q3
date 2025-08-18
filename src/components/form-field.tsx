type FormFieldProps = {
  label: string;
  id: string;
  name: string;
  value: string;
  required: boolean;
  type: string;
  placeholder: string;
};

export const FormField = ({ type, id, name }: FormFieldProps) => {
  return (
    <label htmlFor={id}>
      {name}
      <input id={id} type={type} />
    </label>
  );
};
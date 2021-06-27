import { Controller } from "react-hook-form";

export const FormInputField = ({ control,label,name,placeholder,defaultValue,type,error }) => (
    <div className="form-group">
        <label>{label}</label>
        <Controller
            render={({ field }) => <input
                type={type || "text"}
                className={`form-control ${error ? "is-invalid" : ""}`}
                placeholder={placeholder || label}
                {...field}
            />}
            name={name}
            control={control}
            defaultValue={defaultValue}
        />
        <div className="invalid-feedback">
            {error?.message}
        </div>
    </div>
)
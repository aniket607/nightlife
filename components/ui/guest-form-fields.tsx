import { FormInput } from './form-input';

interface GuestField {
  id: string;
  label: string;
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
  min?: string;
  max?: string;
}

interface GuestFormFieldsProps {
  index: number;
  title: string;
  fields: GuestField[];
  layout?: 'single' | 'double';
}

export function GuestFormFields({ 
  index, 
  title, 
  fields,
  layout = 'double'
}: GuestFormFieldsProps) {
  return (
    <div className="space-y-4 p-6 bg-white/5 rounded-xl">
      <h3 className="text-white font-futura underline font-medium">
        {title} {index + 1}
      </h3>
      
      <div className="grid grid-cols-1 gap-4">
        {layout === 'double' ? (
          // Group fields in pairs for double layout
          Array.from({ length: Math.ceil(fields.length / 2) }).map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-2 gap-4">
              {fields.slice(rowIndex * 2, rowIndex * 2 + 2).map((field) => (
                <FormInput
                  key={field.id}
                  id={`${field.id}${index}`}
                  label={field.label}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  min={field.min}
                  max={field.max}
                />
              ))}
            </div>
          ))
        ) : (
          // Single column layout
          fields.map((field) => (
            <FormInput
              key={field.id}
              id={`${field.id}${index}`}
              label={field.label}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              min={field.min}
              max={field.max}
            />
          ))
        )}
      </div>
    </div>
  );
}

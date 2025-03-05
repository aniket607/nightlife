import { GuestFormFields } from './guest-form-fields';
import { Plus, Trash } from 'lucide-react';
import { FormField } from '@/types/form';

interface StagFormProps {
  guestCount: number;
  maxGuests: number;
  stagFields: FormField[];
  formErrors: Record<string, string>;
  isPending: boolean;
  handleFieldChange: (name: string, value: string, type: string, required?: boolean) => void;
  handleAddGuest: () => void;
  handleRemoveGuest: () => void;
}

/**
 * StagForm component for handling single guest registration
 * Extracted from the main page to improve code organization
 */
export function StagForm({
  guestCount,
  maxGuests,
  stagFields,
  formErrors,
  isPending,
  handleFieldChange,
  handleAddGuest,
  handleRemoveGuest
}: StagFormProps) {
  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {/* Map through the number of guests and render form fields for each */}
      {[...Array(guestCount)].map((_, index) => (
        <GuestFormFields
          key={index}
          index={index}
          title="Guest"
          fields={stagFields.map(field => ({
            ...field,
            name: field.name(index),
            type: field.type
          }))}
          errors={formErrors}
          onFieldChange={handleFieldChange}
          layout="single"
        />
      ))}
      
      {/* Guest Controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {guestCount > 1 && (
            <button
              type="button"
              onClick={handleRemoveGuest}
              className="flex items-center gap-1 px-3 py-1 text-sm text-red-500/80 hover:text-red-600/80 bg-white/5 rounded-lg transition-colors"
            >
              <Trash size={16} />
              <span className="hidden sm:inline">Remove Guest</span>
            </button>
          )}
          {guestCount < maxGuests && (
            <button
              type="button"
              onClick={handleAddGuest}
              className="flex items-center gap-1 px-3 py-1 text-sm text-white/70 hover:text-white bg-white/5 rounded-lg transition-colors"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Add Guest</span>
            </button>
          )}
        </div>
        <span className="text-sm text-white/50">
          {guestCount} of {maxGuests} guests
        </span>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="bg-[#E5FF10] hover:bg-[#E5FF10]/80 text-black font-helvetica px-6 py-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
}

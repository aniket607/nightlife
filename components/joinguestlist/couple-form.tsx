import { GuestFormFields } from './guest-form-fields';
import { Plus, Trash } from 'lucide-react';
import { FormField } from '@/types/form';

interface CoupleFormProps {
  guestCount: number;
  maxGuests: number;
  coupleFields: FormField[];
  formErrors: Record<string, string>;
  isPending: boolean;
  handleFieldChange: (name: string, value: string, type: string, required?: boolean) => void;
  handleAddGuest: () => void;
  handleRemoveGuest: () => void;
}

/**
 * CoupleForm component for handling couple registration
 * Extracted from the main page to improve code organization
 */
export function CoupleForm({
  guestCount,
  maxGuests,
  coupleFields,
  formErrors,
  isPending,
  handleFieldChange,
  handleAddGuest,
  handleRemoveGuest
}: CoupleFormProps) {
  return (
    <div className="space-y-6">
      {/* Map through the number of couples and render form fields for each */}
      {[...Array(guestCount)].map((_, index) => (
        <GuestFormFields
          key={index}
          index={index}
          title="Couple"
          fields={coupleFields.map(field => ({
            ...field,
            name: field.name(index),
            type: field.type
          }))}
          errors={formErrors}
          onFieldChange={handleFieldChange}
        />
      ))}

      {/* Couple Controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {guestCount > 1 && (
            <button
              type="button"
              onClick={handleRemoveGuest}
              className="flex items-center gap-1 px-3 py-1 text-sm text-red-500/80 hover:text-red-600/80 bg-white/5 rounded-lg transition-colors"
            >
              <Trash size={16} />
              <span className="hidden sm:inline">Remove Couple</span>
            </button>
          )}
          {guestCount < maxGuests && (
            <button
              type="button"
              onClick={handleAddGuest}
              className="flex items-center gap-1 px-3 py-1 text-sm text-white/70 hover:text-white bg-white/5 rounded-lg transition-colors"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Add Couple</span>
            </button>
          )}
        </div>
        <span className="text-sm text-white/50">
          {guestCount} of {maxGuests} couples
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

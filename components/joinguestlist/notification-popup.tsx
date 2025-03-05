"use client"

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Define the notification type
export interface NotificationProps {
  notification: {
    message: string;
    type: 'success' | 'error';
    formType?: 'stag' | 'couple';
    count?: number;
    eventName?: string;
    eventDate?: Date;
    venueName?: string;
  };
  onClose: () => void;
}

/**
 * NotificationPopup component for displaying success and error notifications
 * Used in the guestlist joining process to show confirmation or error messages
 */
export function NotificationPopup({ notification, onClose }: NotificationProps) {
  const router = useRouter();

  // Handle the Done button click for successful submissions
  const handleDoneClick = () => {
    onClose();
    router.push('/events');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className={`relative bg-gradient-to-br from-zinc-900 to-slate-900 p-6 md:p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 border ${
        notification.type === 'success' ? 'border-green-500/50' : 'border-red-500/50'
      }`}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 bg-zinc-800/80 hover:bg-zinc-700 text-white/80 hover:text-white rounded-full transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        
        {/* Success content with more details */}
        {notification.type === 'success' && notification.eventName ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-12 h-12 bg-green-500/30 rounded-full flex items-center justify-center">
                <div className="text-green-500 text-2xl">✓</div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-green-500 mb-3">Confirmed!</h3>
            
            <div className="bg-white/5 rounded-xl p-4 mb-5 border border-white/10">
              <h4 className="text-xl font-semibold text-white mb-3">{notification.eventName}</h4>
              
              <div className="space-y-2 text-left">
                {notification.eventDate && (
                  <div className="flex items-center gap-2">
                    <div className="text-white/60">Date:</div>
                    <div className="text-white">
                      {new Date(notification.eventDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                )}
                
                {notification.venueName && (
                  <div className="flex items-center gap-2">
                    <div className="text-white/60">Venue:</div>
                    <div className="text-white">{notification.venueName}</div>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <div className="text-white/60">Entry Type:</div>
                  <div className="text-white capitalize">{notification.formType ?? 'stag'}</div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="text-white/60">Guests:</div>
                  <div className="text-white">
                    {notification.count ?? 0} {(notification.formType ?? 'stag') === 'stag' ? 
                      `${(notification.count ?? 0) > 1 ? 'people' : 'person'}` : 
                      `${(notification.count ?? 0) > 1 ? 'couples' : 'couple'}`}
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-white/80 text-sm mb-4">
              A confirmation email has been sent to your registered email address.
              Please check your inbox for details.
            </p>
            
            <button
              onClick={handleDoneClick}
              className="bg-[#E5FF10] hover:bg-[#E5FF10]/80 text-black font-helvetica px-6 py-2 rounded-xl transition-colors w-full"
            >
              Done
            </button>
          </div>
        ) : (
          // Error content
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-12 h-12 bg-red-500/30 rounded-full flex items-center justify-center">
                <div className="text-red-500 text-2xl">✗</div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-red-500 mb-3">Error</h3>
            <p className="text-white text-lg mb-6">{notification.message}</p>
            
            <button
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 text-white font-helvetica px-6 py-2 rounded-xl transition-colors w-full"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

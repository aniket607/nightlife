"use client"

import { useRouter } from 'next/navigation';

export default function JoinGLBtn({ eventId, isEventPassed }: { eventId: string, isEventPassed: boolean }) {
    const router = useRouter();
    const handleJoin = () => {
        console.log('Join Guest List');
        router.push(`${window.location.pathname}/joinguestlist/?eventId=${eventId}`);
    }
    return (
        <div className="my-10 flex gap-2 justify-between bg-gradient-to-r from-slate-950/50 via-zinc-900/70 to-slate-900/80 p-4 rounded-2xl shadow shadow-gray-500/25">
            <div className="flex flex-col justify-between text-white/80">
                <span className="text-2xl font-bold">FREE</span>
                <span className="text-sm">The price you&apos;ll pay. No surprises later.</span>
            </div>
            <button 
                onClick={handleJoin}
                disabled={isEventPassed}
                className={`w-40 h-10 rounded-full text-base font-bold font-helvetica shadow-lg transition-all ${
                    isEventPassed
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-[#E5FF10] hover:bg-[#E5FF10]/80 text-black hover:scale-105 active:scale-[0.98]'
                }`}
            >
                {isEventPassed ? 'Event is over' : 'Join Guest List'}
            </button>
        </div>
    )
}
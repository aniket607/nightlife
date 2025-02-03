"use client"

import { useRouter } from 'next/navigation';

export default function JoinGLBtn({ eventId }: { eventId: string }) {
    const router = useRouter();
    const handleJoin = () => {
        console.log('Join Guest List');
        router.push(`${window.location.pathname}/joinguestlist/?eventId=${eventId}`);
    }
    return (
        <button className="my-10 bg-white/10 hover:bg-white/20 transition-colors text-white py-3 w-full rounded-lg"
        onClick={handleJoin}
        >
                  Join Guest List
        </button>
    )
}
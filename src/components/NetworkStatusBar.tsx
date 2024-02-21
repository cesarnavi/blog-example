import useNetworkStatus from "@/hooks/useNetworkStatus";

export default function NetworkStatusBar() {
    const { isOnline, reconnected } = useNetworkStatus();

    if(reconnected){
        return <section className="w-full inset-0 bg-green-600 text-white px-4 py-1">✅ Conectado a internet</section>
    }
    if(isOnline){
        return <></>
    }

    return <div className="w-full inset-0 bg-red-600 text-white  px-4 py-1 flex justify-between">
        <p>❌ Modo sin conexión</p>
        <p title="Solo podrá visualizar los elementos guardados previamente">
            <svg  width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#ffff" strokeWidth="1.5"/>
                <path d="M12 17V11" stroke="#ffff" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="#ffff"/>
            </svg>
        </p>
    </div>;
}
  
import { useEffect, useState } from "react"

export const handleResize = () => {
    const [vh, setVh] = useState(window.innerHeight || 800)

    useEffect(() => {
        const handleResize = () => setVh(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return vh
}
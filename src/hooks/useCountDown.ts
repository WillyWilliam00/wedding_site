import { useEffect, useState } from "react";
import type { TimeLeft } from "../types/wedding";
import { calculateTimeLeft } from "../lib/utils";

export const useCountDown = (targetDate: string) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return timeLeft;
}
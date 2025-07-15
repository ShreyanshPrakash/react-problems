import { useEffect } from "react";
import { useCustomTimeout } from "./useCustomTimeout";
import { useCustomInterval } from "./useCustomInterval";



export const CustomTimeout = () => {



    const handler = (params: any) => {
        console.log(params);
    }

    const {start, stop, flush } = useCustomTimeout(handler, 2 * 1000, 100);
    const interval = useCustomInterval(handler, 2 * 1000, 100);

    useEffect(() => {
        setTimeout(() => {
            console.log("Triggering the timeout");
            // start();
            interval.start();
        }, 2 * 1000)
    }, [start])



    return (
        <div className="wrapper">
            Custom Timeout
        </div>
    )
}
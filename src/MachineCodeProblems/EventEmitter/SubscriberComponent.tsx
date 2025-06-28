// @ts-nocheck

import { useEffect, useState } from "react";
import { useEvent } from "./useEvent";

export const SubscriberComponent = () => {
//   const { subscribe } = useEvent("listen", handleEventTrigger);
  useEvent("listen", handleEventTrigger);
  const [listenVal, setListenval] = useState(null);

//   useEffect(() => handleMount(), []);

//   const handleMount = () => {
//     setTimeout(() => {
//       subscribe("listen", handleEventTrigger);
//     }, 2 * 1000);
//   };

  function handleEventTrigger(params) {
    throw Error("i am here");
    
    setListenval(params);
  }


  return <div className="subscriber-wrapper">
    <span>Subscriber</span>
    <span>{listenVal}</span>
  </div>;
};

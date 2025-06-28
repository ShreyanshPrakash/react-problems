
// @ts-nocheck

import { useEffect, useRef } from "react";
import { EmitterComponent } from "./EmitterComponent";
import { SubscriberComponent } from "./SubscriberComponent";
import { EventEmitter } from "./eventModule";



export const ParentComponent: FC<any> = () => {

    return (
        <div className="wrapper">
            <EmitterComponent />
            <SubscriberComponent />
        </div>
    )
}
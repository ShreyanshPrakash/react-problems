// @ts-nocheck

import { EventEmitter } from "./eventModule";
import { useEffect, useState, useRef } from "react";

export const useEvent = (eventName = "", callback = () => {}) => {
  const eventInstance = useRef(new EventEmitter());

  useEffect(() => {
    if(!eventName){
        return;
    }
    eventInstance.current.on(eventName, callback);
    return () => {
      eventInstance.current.off(eventName, callback);
    };
  }, [eventName, callback]);


  // const subscribe = (eventName, handler) => {
  //   if(!eventName){
  //       return;
  //   }
  //   eventInstance.current.on(eventName, callback);
  // }

  const emit = (eventName, ...args) => {
    eventInstance.current.emit(eventName, ...args);
  };


  return {
    emit,
    // subscribe
  };
};

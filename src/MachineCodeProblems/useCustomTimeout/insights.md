

# Insights

1. It was again simple. Its jsut u need to know what has to be used
2. javascript has a method named requestIdleCallback
3. This method is called when the stack is empty and thread is idle
4. So we just need to call this method, and pass a handler that checks if the delay is achived or not.
5. Keep a track of start time, and then whenever this method calls the hnadler, check the diff of start with the current time and if that is >= delay then call the callback method
6. This is called when the event loop is idle : requestIdleCallback

6. Safari does not support this


# Doc

1. requestIdleCallback will queue the callback to be called when the event loop is idle
2. U can pass a timeout as the second param. If the callback is not called till that time, then the calback will be added to the event queue even though if it might impact the performance
3. Functions are generally called in first-in-first-out order; however, callbacks which have a timeout specified may be called out-of-order if necessary in order to run them before the timeout elapses.
4. An ID which can be used to cancel the callback by passing it into the window.cancelIdleCallback() method
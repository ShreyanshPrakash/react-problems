
# INSIGHTS :

1. Throttle is basically keep delaying the next execution for the specified amount of delay.
2. if user is typing, wait till there is a gap of "delay" between last and current trigger
3. Does not matter if user keeps typing, once this delay is over, take the latest "value" as throttled value
4. Basically you are tracking if the gap between the last and latest trigger is more than the delay. If yes then take the latest value as throttled valeu, reset the datTime to the currentTime and move on

# Requirements :

1. Create a react hook to implement throttle
2. It should take in a value and return the throttled value
3. It should take in the delay
4. Also allow to pass a callback method to be called once throttle is complete
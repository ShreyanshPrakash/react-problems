
# INSIGHTS :

1. Debounce is basically keep delaying the next execution for the specified amount of delay.
2. if user is typing, wait till there is a gap of "delay" between last and current trigger
3. If user type again withing the delay duration, then reset the delay for execution again
4. Basically u need to use a setTimeout that will be created everytime the input value changes. ALso the old ones will keep on getting removed with each value change

# Requirements :

1. Create a react hook to implement debounce
2. It should take in a value and return the debounced value
3. It should take in the delay
4. Also allow to pass a callback method to be called once debounce is complete



# INSIGHTS :

1. Main thing is how to create the config for this
2. In the config create a map with key as the name of the colors and value as object that has duration, color and "next" color key
3. When the trigger starts, set the active color as green or take it from the prop - the start color
4. This will take u to a effect where using the active color state, u will pull out the config of that color from the config
5. That config will have the timer, set that as the duration for setTimeout
6. Once the timeout completes, set the active color as the "next" key value

# Requirements :

1. Build a traffic light where the lights switch from green to yellow to red after predetermined intervals and loop indefinitely. Each light should be lit for the following durations:
Red light: 4000ms
Yellow light: 500ms
Greenlight: 3000ms
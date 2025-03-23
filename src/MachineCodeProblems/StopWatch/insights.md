
# INSIGHTS :
> Easy + 20 mins

1. you must clear the interval on reset and component unmount
2. Save the interval instance in a ref not in a state
3. You should disable the start button - else user can keep on clicking start multiple times and the previous instance will be overwriited. This will cause memory leak and on click on reset, all the intervalInst wont be cleared. So the clock will continue to update
4. Since, the interval will start after a sec for the very first time, the UI it will appear as if there is a delay. Go fix this, update the state for time immediately after the click of start button and then trigger the setInterval
5. Reset the hour counter to 0 if its more than 24 hours. Do the same for min, sec, millisecs


# Requirements :

1. Have Start timer button to start the timer - Easy
2. Reset Timer button should reset the timer to zero - Easy
3. Stop Timer button should stop the timer but show the last updated timer - Easy
4. Show time with two digits always - Medium
5. Add Resume Timer button - Medium
6. Lap timer - Medium
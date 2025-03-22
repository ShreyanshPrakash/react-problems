# Easy + 20 mins

# you must clear the interval on reset and component unmount
# Save the interval instance in a ref not in a state
# You should disable the start button - else user can keep on clicking start multiple times and the previous instance will be overwriited. This will cause memory leak and on click on reset, all the intervalInst wont be cleared. So the clock will continue to update
# Since, the interval will start after a sec for the very first time, the UI it will appear as if there is a delay. Go fix this, update the state for time immediately after the click of start button and then trigger the setInterval
    
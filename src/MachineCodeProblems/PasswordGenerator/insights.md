
# INSIGHTS :

1. Main thing is to figure out how to move the focus ahead or back
2. My implementation has a wrapper component that has a ref to the input box.
3. I track the active input feild index and based on that using ref I am bringing the focus

# Requirements :

1. It should show the input fields for otp
2. Each input should allow onlly 1 input
3. Components should take a prop to decide the no of fields - 3 or 6 etc
4. Once the value is entered in a field, its should move focus to the next one
5. Once the value is cleared on a field, it should move focus to the previous one
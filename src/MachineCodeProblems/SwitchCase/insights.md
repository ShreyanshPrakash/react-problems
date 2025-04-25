
# INSIGHTS :

1. Main thing is to know that react has a "Children" property that helps u process the children react elements
2. Check and read the names of the child components
3. Allow only "Case" or "Default" component names for processing. Others will be discarded
4. Compare the "value" prop of the switch component with the value prop of each case component.
5. To do that, levergae the "Children.forEach" method to iterate over the children
6. Compare if the child is "Case" component
7. If yes then read into the "props" property of that child component object
8. Compare the "value" of parent to the child's value and take decision
9. If no match found, then find the "Default" component and mount that


# Requirements :

1. Create a Switch case component to mimic the switch case logic 
2. Default is a must
3. The value passed in the "Switch" Component should be same as "Case" component
4. Mount the first "Case" component that matches the value
5. If nothing mathes, then mount the "Default" Component


# Advanced :

1. Allow to pass either a value or a method into the case component
2. The function might return a computed value that is then compared with the switch value
3. THe function might return boolean itself and decides the mounting of the case component
4. Allow switch to take in multiple values and match multiple cases - NICE
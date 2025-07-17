
# Insights :

1. This is more of a learning on IntersectionObserver api
2. Say we have 5 items loaded in the UI, we wanna observe the last item and see if that is visible to the UI or not. If yes then load the next 5 or 10 items
3. use the useRef to the parent element so that u can get the children list as ref.current.children
4. U want to observe the last item so get the last element from the above list
5. Pass that to the IntersectionObserver
6. Iterate over the entries and if any entry has "isIntersecting" as true, then first unobserve that, and then load the next data set
7. threshold is to tell how much of the last item u want to be visible to trigger the event
8. U would normally want to observe the 2nd or 3rd last item
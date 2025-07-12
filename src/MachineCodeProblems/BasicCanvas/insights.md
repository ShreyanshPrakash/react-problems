



# INSIGHTS :

1. You need to know the basics of canvas
2. Attach mouse event on load
3. For canvas, you will have to give fixed width and height as it deals with pixels
4. On click, draw a circle - this step is simple
5. As u create a circle or add a new object to canvas - add the details to a map
6. We will have a Map, where we will keep the co-ordinates of all the items we create.
7. Now when we want to run the detection algo, we will iterate over this map and match with the new object
8. Here, there is a little maths. You need to know the formula to calculate the distance between the two points based on their co-ordinates.
9. I have created a incremental id, so that i can detect id the newObject and the iteration object are same or unique so that i can remove the false positive
10. I have also added a detection on move hover, this can be like allowing user to select an object in the canvas
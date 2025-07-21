

# Insights : 

1. Its easy if you know drag and drog api
2. Two components mainly, the item that will be dragged, and the zone/ category where it will be dropped
3. On the Drag Item, u will add draggable as true and onDragStart
4. Once the drag starts, save the dragItem target in a ref - we will use this when dropped
5. On the Zone/ area/ cateogry add onDrop which will have the logic to extract the itemInfo, the group where it is dropped info and updating the state of the board
6. You will also need to add onDragOver in the zone, and make event.preventDefault.
7. This is required so that the dragged item can be dropped on the zone.
8. Functionality wont work if ondragOver is not added with prevent default 
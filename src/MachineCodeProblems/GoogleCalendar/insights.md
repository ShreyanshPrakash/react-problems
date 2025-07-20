

# Insights : 

1. Creating the layout is simple. Use css grids. And create a 1D array.
2. 1D array will make stuffs simpler.
3. Now to find where to place the date, u will need to find the start day/ date of the month and end day/ date of the month
4. Once that is done, others will just fall in place
5. What I did was, I used the current/ today's date to get the today's month and year
6. From this, I created a string with "month + 1/ 1 / year"
7. I am trying to set the date to the first day of then month.
8. From that, the new Dat is used to get the day of the week..
9. This will tell me the index from where I need to start.. 0 is SUN, 7 is SAT
10. Once u got that, just iterate over the 1d array and add the date if the index is more that. the 'day' we got from above
11. For the end date, i am doing the same thing, creating date string by updating the date of the month in the string. Month and year is static in this iteration.
12. if a date is not present for a month, say 30 for Feb, then the Date constructor will give an error. Thats how u know if have reached the end of the month
# giphy
Practice using giphy API

A silly page that takes user input and returns related vaporwave gifs using giphy API.

3 functions:

loadButtons takes an array of strings, creates buttons for each, and loads them into the page. 
    Each button is given an event listener that calls getGifs.

A click event listener on #submit takes the user input, adds it to the array of strings, and calls loadButtons.

getGifs takes a keyword (string) and queries the giphy API. It accesses the rating and image URLs from the returned object, and uses them  to create html elements that are prepended to a container dif (#results).
    Each element is a container with a h6 tag (for the rating) and img tag (for the gif)
    Each img tag is given a click listener to swap between still and moving URLs; this will also set the background to the last clicked gif

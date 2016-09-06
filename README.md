# HTML5 Drag and Drop Divs

## Summary
This project was a quick use of HTML5 drag and drop divs to help solve a problem.
The problem was the need to arrange 60 choir singers on a stage with multiple platforms so their heights would look good relative to eachother.

This project is simple vanilla HTML5 and javascript with no dependencies. You might be interested if you want do this without any libraries.

## Clone it

## Run it
1. Launch `client\index.html` in a browser (I only tested with Chrome)
1. Expect to see some fixed divs indicating a stage.
1. Expect to see lots of divs stacked on top of eachother in the upper left (these represent the singers)
1. Your task is to arrange the people on the platforms so their heads will all be visible.

Good Luck!

Note: The app uses localStorage so you don't lose your work when you refresh the page.

## A Solution
In `singer-positions.json` there is a solution.  To see it, paste the contents into the `singer-positions` localStorage value, then refresh the page.

## References
- A [codePen](http://codepen.io/anon/pen/IjrDs) that helped me start
- The [drag operations docs](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Drag_operations) on MDN

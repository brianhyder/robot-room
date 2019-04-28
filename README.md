## robot-room
Code to demonstrate an algorithm for a robot to cover a room

**Setup**
```
npm install
```

**Run**
```
node index.js
```

**Running Custom Room**

In the `index.js` file, find the line at the top (~9) that calls the method to assign to the `grid` variable.  Here it is possible to load a custom grid rather than a randomly generated one (done by default).  You will see commented lines that demonstrate how to load a particular file.  Two example files are provided.  If you plan to build out your own room please see the notes below.  It is recommended to start with a room that is already built and modify from there.

_Notes:_
* To keep the code simple, it is assumed that all grids are boarded by wall markers to avoid index out of bounds checks.
* The position of the robot is represented in the console as `0`.
* Cells that have been visited by the robot are represented as `X`.

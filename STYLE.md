Day 3: take an hour or so to create a basic style guide with your team! - the style guide should be a reflection of personal choices about how your code looks, and it should also refer to the official style guides from iOS/Android/D3 and specify which parts to apply in your project and which should not apply - use this session to find sample style guides together, gather some links and think what rules to put in

How and when to use comments,
Tabs or spaces for indentation (and how many spaces),
Appropriate use of white space,
Proper naming of variables and functions,
Code grouping an organization,
Patterns to be used,
Patterns to be avoided.

# Style

## Comments
Most blocks of code have a single line comment above them, every comment has one line of whitespace above them
Every file has a multiline comment at the top, describing what the file does, who the author is, where the data is sourced from and what the project is for.

## Whitespace
Above every comment there is one line of whitespace
Between functions (that are not within a D3 selection) there are two lines of whitespace

## Line length
Code lines are kept shorter than 80 characters

## Variable declaration
Only let and const were used to declare variables. Since let and const came with the release of ES6. Let and const are block scoped, while var declarations are global or function scoped. The use of let and const creates a neat coding style in which you are way less likely to run into errors by unknowingly overwriting variables.

## Variable and function names
Variable and function names are done in camelCase

## Font size and color
The SVG titles have a font size of 20 px.
Legend labels and circular bar labels have a font size of 11px.
The describing HTML text around the graphs has a font size of 1.7vw.

All text that belongs to the SVG is black, all text that belongs to the HTML, the background information around the graphs, is white

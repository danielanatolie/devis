# Devis

Developed for engineering leads, our project provides technical debt information through visual graphs by doing software quality analysis. This allows leads to make sure that their projects are not decaying overtime.

Video Demo: https://www.youtube.com/watch?v=n6yEMbD4Q9Q

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

```
node v12.0.0
npm 6.9.0
```

### Installing and Running
```
1. node install
2. npm run dev
```

# Authors and Contributions
## Backend Team
### Daniel Anatolie
File Complexity Analysis: https://github.com/danielanatolie/devis/pull/11

Front-Backend Setup: https://github.com/danielanatolie/devis/pull/2

Created a parsing algorithm to detect functions and trigger debt calculations based on various complexity metrics such as function length and amount of parameters passed.

### Jasmin Goh
Couling Analysis: https://github.com/danielanatolie/devis/pull/8
Analyze coupling between ts files. Iterate through all the ts file, count the number of times that an external method is used and figure out which class that method is from. A dependency map with counter is produced for each ts file. 

### Pedraum
Cyclomatic Complexity Analysis: https://github.com/danielanatolie/devis/pull/13
Error, warning and cyclomatic complexity analysis of js and ts files. Called the ESLint library to iterate through a code base of js and ts files. Used the error count, warning count and cyclomatic complexity count of the ESLint result 
to produce a json object used for the analysis. However, we decided to discontinue this analysis as we felt it will be complicated and time consuming to visualize the data.

## Frontend Team
### Ari
Bar Graph Generation: https://github.com/danielanatolie/devis/pull/10
Built a bar graph for visualizing tech debt. The bar graph was built using D3.js library in a React environment. Created wrapper component to use React and D3 together as they both want to control the DOM. Then implemented the chart component, which uses svg. The data that is  used in the graph is from the BE, which is then filtered in the FE to display top 10 files.

### Ellen
Coupling Graph Generation: https://github.com/danielanatolie/devis/pull/19
Produce visualization for coupling & conducted the first user study. For visualization, I used a library called Vis.js to create the actual network graph. I first manipulated the dependency map that Jasmin created to fit the data requirements of Vis.js. I then created a component to call the library, and did some html stuff so that everything displays properly. 

# User Studies
## User Study I
Users were shown 2 sample graph images and asked if the visualizations aided them in estimating tech deb in their codebase. 
User1 feedback:
“The tech debt visualization aids in estimating the technical debts within the project broken down by each file and points in a good direction of which files should be looked into. The coupling visualization aids is helpful to a measurable degree in the sense that its shows where there are too much coupling and allow developers to optimize their codebase for better code maintainability. Although I have a guess as to what the node size and connection thickness means, it would be nice to have an actual clarification on it. It would be interesting to see not just the tech debt per file but how frequently these files are edits if it is possible. It would allow developers to prioritize tech debt within files that are often changed rather than those with high tech debt with low change rate.”

User2 feedback:
“It helped me decide which files had the worst tech debt and should be refactored first. It would be helpful if the edge weights were labeled.”

## User Study II 
We asked users multiple questions to ensure that our final design would be improved from a user experience and design perspective.
Using the 2 charts displayed answer the following questions:
Question 1: Which file has the most technical debt?
Sample User Answer: azureService.ts

Question 2: Which files have the most amount of coupling?
Sample User Answer: azureService.ts and azureAuth.ts

Question 3: How could the design be improved?
Sample User Answer: Maybe add descriptions to what the diagrams represent and some buttons.

Question 4: How many buttons would you find helpful 1 or 2?
Sample User Answer: 2 sounds more clear.

Ultimately, our program proved to be effective in converying the key project debt information, however, could be improved
in terms of displaying the exact details of the technical debt.

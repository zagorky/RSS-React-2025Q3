1. Task: 
  -[ ] [Task1: React project setup. Class components. Error boundary.](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/class-components.md)
  -[ ] [Task2: Unit Testing](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/tests.md)
  -[ ] [Task3: Routing and Hooks](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/functional-routing.md)
  -[ ] [Task4: State Management and Context API](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/state-management.md)
  -[ ] [Task5: API Querying in React](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/queries.md)
  -[ ] [Task6: Next.js. Server Side Rendering](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/nextjs-ssr-ssg.md)
  -[ ] [Task7: React Forms](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/forms.md)
  -[ ] [Task8: React Performance](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/performance.md)


2. Screenshot:
3. Deploy: [link](https://rs-react-zagorky.netlify.app/)
4. Done 14.07.2025 / deadline 14.07.2025
5. Score: 0/100
### Task 1
 - [ ] Eslint is set up, when lint command is run it doesn't produce any errors (if there are warnings score might be less) - 15 points 
 - [ ] Prettier is set up, format:fix command fixes issues - 15 points 
 - [ ] Husky is set up, linting is run on pre-commit - 10 points
 - [ ] Page is split into at least two sections, top one has Search input and "Search" button, main section displays the list of results from the selected api when page is opened for the first time (loader should be shown while app makes a call to the api) - 20 points
 - [ ] When user types something to the Search input and clicks "Search" button, a loader is displayed and the list is changed according to the response results for a provided search term - 15 points
 - [ ] The search term typed into the Search input is saved in the LS when user clicks on "Search" button (check it by closing the tab and open the app in the new one - the initial call should contain previously entered search term) - 15 points
 - [ ] Application is wrapped with ErrorBoundary, which logs error to a console and shows a fallback UI. There should be a button to throw an error - 10 points

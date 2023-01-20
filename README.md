# Description
## Tempo frontend test

The app was develop using:

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [AntDesign](https://ant.design/)
- [Jest](https://jestjs.io/)
- [React Test Library](https://testing-library.com/)
- [React Router DOM](https://www.npmjs.com/package/react-router-dom)

# Running the application
## Follow the steps

- In VS code or any other terminal run the following commands:
    - *npm install* to install all the dependencies
    - *npm run dev* to start the application
    - open in your browser the url http://localhost:5173/
    - for tests you can run the *npm test*

- To see the results of the tests you can se the coverage folder

# Solution details

- The test chalenge was list, navigate and search the teams and users using the avaible endpoints; 
- The application request and return the lists of each one, the main data like teams and users still in the memory after was requested each time the respective components reder and those data still in the memory; 
- Some components have been developed to filter and show the data, one component to search */components/search-field* and other to display the list */components/paginanted-list*;
- The application is an SPA(Single Page Application);
- For the routes was used react-router-dom, and for the styles the ant-design components;
- The application was built with tests using jest and react-test-library. The tests were applied in the pages, covering more than 80% of each component.
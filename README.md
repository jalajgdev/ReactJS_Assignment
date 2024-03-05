This project is a React application designed for searching and displaying news articles. Leveraging technologies such as React Vite, Redux Toolkit, and Material-UI, it provides an efficient and visually appealing user interface for users to interact with news data.

Features
Search Functionality: Users can input search queries to find relevant news articles.

Suggestions: The app offers real-time suggestions based on the entered search term, enhancing user experience.

Pagination: Results are paginated, allowing users to navigate through multiple pages of news articles.

Keyword Tags: Each news article is associated with keywords displayed as clickable tags, enabling users to refine their search based on specific topics.

Responsive Design: The application is designed to be responsive, ensuring a seamless experience across various devices.

Technologies Used:
React Vite: A fast React build tool that provides a lightning-fast development environment.

Redux Toolkit: A set of tools for efficient Redux development, offering simplified state management and actions.

Material-UI (MUI): A popular React UI framework providing a set of components for building modern and visually appealing user interfaces.

Steps followed :

To install the React-vite:

Opened the terminal and run the following command to create a new React Vite app:
npx create-vite@latest my-react-vite-app X-Assignment

Navigate to the Project Directory:
cd X-Assignment

Install the project dependencies by running:
npm install

Start the Development Server:
npm run dev

Folder Structure
src: Contains the source code of the React application.
components: Reusable React components.
constants: Constants, there is basUrl in contants folder.
redux: Redux store setup and slices. We have one slice folder in which newsSLice is present.
App.jsx: Main application component.
NewsList.jsx: Component for rendering the list of news articles
Pagination.jsx: Component to render 15 items per page.
Loader.jsx:To Provide loader if api takes time to render the data.
public: Static assets and HTML template.

Redux Toolkit:
The app uses the Redux Toolkit for state management, with slices for managing search term, suggestions, news list, and current page.

Material-UI components are utilized for a consistent and visually appealing UI.
Implemented a text input field where users can enter search queries.
Set up a state variable to store the search term entered by the user.
Captured user input using the onChange event handler on the input field.
Used the entered search term to filter and display relevant news articles.

Real-time Suggestions:

As the user types in the search input field, made asynchronous requests to fetch real-time suggestions based on the entered search term.
Displayed these suggestions dynamically below the search input field.
Handled selection of a suggestion to update the search input field with the selected suggestion.

Pagination:
Implemented pagination to allow users to navigate through multiple pages of search results.
Displayed a set number of news articles per page i.e 15.
Provided navigation controls (e.g., "Previous" and "Next" buttons) to allow users to move between pages.
Updated the displayed news articles when the user navigates to a different page.

Keyword Tags:

Extracted keywords/tags associated with each news article from the API response.
Displayed these keywords/tags as clickable tags alongside each news article.
Implemented functionality to filter news articles based on clicked keyword tags.
Updated the displayed news articles dynamically when a keyword tag is clicked.

Responsive Design:
Ensured that the application layout and components adjust gracefully to different screen sizes and devices.
Utilized responsive design of MUI designs.
Tested the application on various devices and screen sizes to ensure consistent behavior and appearance.

Loading Indicators:

Displayed loading indicators (MUI loader icon CircularProgress) to indicate to users that the application is fetching data or performing background processes.
Showed loading indicators while waiting for search results, pagination, and other asynchronous operations to complete.
Hide loading indicators once the data is successfully loaded or an error occurs.

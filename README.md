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
npx create-vite@latest my-react-vite-app --X-Assignment

Navigate to the Project Directory:
cd --X-Assignment

Install the project dependencies by running:
npm install

Start the Development Server:
npm run dev


Folder Structure
src: Contains the source code of the React application.
components: Reusable React components.
constants: Constants, there is basUrl in contants folder.
redux: Redux store setup and slices. We have one slice folder in which newsSLice is present. 
styles: Global styles or styling-related files.
App.jsx: Main application component.
NewsList.jsx: Component for rendering the list of news articles
Pagination.jsx: Component to render 15 items per page.
public: Static assets and HTML template.
Additional Notes
The app uses the Redux Toolkit for state management, with slices for managing search term, suggestions, news list, and current page.

Material-UI components are utilized for a consistent and visually appealing UI.

The application makes API requests to fetch news data based on the user's search query.

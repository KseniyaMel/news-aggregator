# News Aggregator Web App

Welcome to the News Aggregator Web App project! This project is a front-end implementation of a news aggregator website that pulls articles from various sources and allows users to customize their news feed.

## Features

1. **Article Search and Filtering**: Users can search for articles by keyword and filter the results by date, category, and source.

2. **Personalized News Feed**: Users can customize their news feed by selecting preferred sources and categories.

3. **Mobile-Responsive Design**: The website is optimized for viewing on mobile devices for a seamless user experience.

## Data Sources

For this project, we have integrated articles from three data sources:
- [News API](https://newsapi.org/)
- [The Guardian API](https://open-platform.theguardian.com/documentation/)
- [New York Times API](https://developer.nytimes.com/apis)

## Technologies Used

- React.js
- Redux for state management
- Ant Design for UI components
- Axios for API requests
- Moment.js for date manipulation
- Docker for containerization

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository to your local machine:

    ```
    git clone https://github.com/KseniyaMel/news-aggregator.git
    ```

2. Navigate to the project directory:

    ```
    cd news-aggregator-web-app
    ```

3. Install dependencies:

    ```
    npm install
    ```

4. Start the development server:

    ```
    npm start
    ```

5. Access the application in your web browser at [http://localhost:3000](http://localhost:3000)

## Containerization with Docker

To containerize the application using Docker, ensure that Docker is installed on your system. Then, follow these steps:

1. Build the Docker image:

    ```
    docker build -t news-aggregator-app .
    ```

2. Run the Docker container:

    ```
    docker run -d -p 3000:3000 news-aggregator-app
    ```

3. Access the application in your web browser at [http://localhost:3000](http://localhost:3000)

## Additional Notes

- Feel free to customize the project as per your requirements or add additional features.
- If you encounter any issues or have any questions, please feel free to reach out to the project maintainers.

Happy coding! 🚀

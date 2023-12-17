# sus-meter

sus-meter is a web application built using NEST.js for the backend and Vue.js for the frontend, providing an easy way to discover the NSFW rating of a Twitter account through keyword matching. The application is deployed using Docker on a cloud machine and is currently accessible at [http://165.22.67.251:3000](http://165.22.67.251:3000). It will soon be available through the domain name [sus-meter.com](#) for a more user-friendly experience.

## Features
- **NSFW Rating**: Find out the NSFW rating of a Twitter account based on keyword matching.
- **Twitter Scraper**: The backend utilizes a homemade Twitter scraper for retrieving account information.
- **Docker Deployment**: The application is deployed using Docker, making it easy to set up and run.
- **Coming Soon**: Look forward to upcoming features such as a leaderboard and more extensive search capabilities, including recent tweets and likes.

## Deployment

The Docker images for both the frontend and backend of the application are available on Docker Hub:

- [sus-meter-backend](https://hub.docker.com/repositories/42dsy/sus-meter-backend)
- [sus-meter-frontend](https://hub.docker.com/repositories/42dsy/sus-meter-frontend)

You can pull these images and run the application on your own machine using the following Docker commands:

```bash
docker pull 42dsy/sus-meter-backend:latest
docker pull 42dsy/sus-meter-frontend:latest
```

## Usage

To use sus-meter, simply visit [http://165.22.67.251:3000](http://165.22.67.251:3000) and enter the Twitter username you want to analyze. The application will provide you with an NSFW rating based on keyword matching.

## Support

If you enjoy using sus-meter and would like to support the project, you can contribute by buying me a coffee on [Ko-fi](https://ko-fi.com/susmeter). Your support is greatly appreciated and helps in further development and maintenance.

## Contribution

Feel free to contribute to the project! Whether it's reporting issues, suggesting new features, or contributing code, your input is valuable.

## License

This project is licensed under the [MIT License](LICENSE).

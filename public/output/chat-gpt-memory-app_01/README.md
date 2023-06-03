# Scalable Chat Memory for Chat GPT-4

This is an Express app that mimics human memory processes to provide context awareness and handle complex, large-scale coding tasks. It provides a scalable and reliable memory structure for GPT-4, helping it to better understand and interpret user requests. The app is built using Node.js, Express, PostgreSQL, Redux Toolkit, RTK Query, and Tailwind CSS.

## Features

1. Prompt Processing.
2. Hierarchical Memory Structure.
3. Database Storage.
4. Memory Retrieval.
5. GPT-4 Integration.
6. Response Generation.
7. Scalability and Performance Optimization.

## Requirements

To run this app, you need to have the following software installed on your machine:

- Node.js v14.16.0 or later
- PostgreSQL v13.2 or later

## Installation

1. Clone this repository to your local machine.
2. Install the required dependencies by running: `npm install`.
3. Copy the `.env.example` file to `.env` and fill in the required environment variables with your own values.
4. Create the required database tables by running: `npm run db:migrate`.

## Usage

To start the app, run the following command: `npm start`.

To run the app in development mode, run the following command: `npm run dev`.

To run the app in production mode, run the following command: `npm run prod`.

## Target Audience

This app is designed for developers working with GPT-4 who need to build chat applications that can handle complex, large-scale coding tasks.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
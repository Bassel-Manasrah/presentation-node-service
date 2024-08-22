# Application Setup

This project consists of a frontend React application and a backend Node.js server, both managed with Docker Compose.

## Running the Application

To build and start the Docker containers, use the following command:

```bash
docker compose up --build -d
```

Once the application is running, you can view it by going to http://localhost:3000 in your web browser.

## Stopping the Application

To remove the containers and networks, use the following command:

    docker compose down

## Troubleshooting

**Ports Conflict**: If you encounter issues with ports being in use, ensure no other applications are using ports 3000 or 5000.

Enjoy using the application!

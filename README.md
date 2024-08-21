# Application Setup

This project consists of a frontend React application and a backend Node.js server, both managed with Docker Compose.

## Running the Application

To build and start the Docker containers, use the following command:

```bash
docker compose up --build
```

## Stopping the Application

If you need to stop the application, press Ctrl + C in the terminal where docker compose up is running.

To remove the containers and networks, use the following command:

    docker compose down

## Troubleshooting

**Ports Conflict**: If you encounter issues with ports being in use, ensure no other applications are using ports 3000 or 5000.

Enjoy using the application!

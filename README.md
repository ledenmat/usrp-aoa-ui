# telemetry-dashboard

This is a simple Node.js application that requires a Redis Stack Server to run in Docker. It consists of a server and a client component.

## Installation

Before running the application, make sure you have Docker installed on your system. You can download and install Docker from [here](https://www.docker.com/get-started).

### Steps to Install Redis Stack Server

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/your-username/your-repo.git
    ```

2. Navigate to the project directory:

    ```bash
    cd your-repo
    ```

3. Build the Redis Stack Server Docker image:

    ```bash
    docker build -t redis-stack-server .
    ```

## Starting the Application

### Starting the Redis Stack Server

To start the Redis Stack Server, run the following command:

```bash
docker run -d --name redis-server redis-stack-server
```

### Starting the Node.js Server

To start the Node.js server, run the following command:

```bash
npm install
node index.js
```

### Starting the Client

To start the client, navigate to the client directory and run:

```bash
npm install
npm run dev
```

## Troubleshooting

If you encounter any issues while running the application, try the following troubleshooting steps:

1. **Check Docker Installation**: Ensure Docker is installed correctly and running on your system.

2. **Check Docker Containers**: Verify that the Redis Stack Server container is running using the following command:

    ```bash
    docker ps
    ```

3. **Check Port Availability**: Ensure that the ports used by the Redis Stack Server and Node.js server are not already in use.

4. **Restart Docker Containers**: Try restarting the Docker containers by stopping and then starting them again.

    ```bash
    docker stop redis-server
    docker start redis-server
    ```

5. **Check Logs**: Check the logs of the Node.js server for any error messages that might indicate what went wrong.

6. **Verify Code**: Double-check your code for any errors, especially in the configuration files and Dockerfiles.

If the issue persists, feel free to raise an issue on this repository or reach out to the maintainers for further assistance.

---

Feel free to adjust the instructions and details to fit your specific project setup and requirements.
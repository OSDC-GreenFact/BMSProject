# Use an official Python runtime as the base image
FROM python:3.9-slim-buster

# Set the working directory inside the container
WORKDIR /app

# Copy the local server.py file into the container
COPY server.py .

# Run server.py when the container launches
CMD ["python", "server.py"]

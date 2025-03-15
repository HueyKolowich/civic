# Run in production

docker-compose up --build

# Run in development mode

docker-compose -f docker-compose.yml -f docker-compose.override.yml up --build

# Run migrations script

docker exec $(docker ps -q -f name=ENV_PROJECT_NAME) yarn typeorm migration:run -c ENV_CONNECTION_NAME

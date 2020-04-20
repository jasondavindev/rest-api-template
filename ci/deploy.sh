# Deploy script

echo "Pull new docker image"
export ECR_CONFIG=`aws ecr get-login --region ENV_REGISTRY_REGION --no-include-email`
echo $ECR_CONFIG | sh

echo "Pull new images"
docker pull $ECR_HOST:CI_BUILD_REF_NAME
docker tag $ECR_HOST:CI_BUILD_REF_NAME ENV_PROJECT_HYPHEN_NAME:CI_BUILD_REF_NAME

INTERNAL_NETWORK=$(docker network ls | grep --max-count=1 -oP 'internal_network')

if [ "$INTERNAL_NETWORK" == "internal_network" ]
then
  echo "Internal network already exists"
else
  echo "Creating new network"
  docker network create -d overlay internal_network
fi

API_IS_RUNNING=$(docker service ls -f "name=ENV_PROJECT_NAME" | grep --max-count=1 -oP 'ENV_PROJECT_NAME')

if [ "$API_IS_RUNNING" == "ENV_PROJECT_NAME" ]
then
  echo "Updating existent service"
  docker service update --image ENV_PROJECT_HYPHEN_NAME:CI_BUILD_REF_NAME ENV_PROJECT_NAME
else
  echo "Removing nginx service"
  docker service rm nginx
  echo "Creating new service"
  docker service create -p 80:3000 --name ENV_PROJECT_NAME --env-file=file.env --network internal_network ENV_PROJECT_HYPHEN_NAME:CI_BUILD_REF_NAME
fi

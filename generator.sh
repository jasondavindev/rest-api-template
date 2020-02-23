[[ -z $1 ]] && echo "Target directory is empty" && exit 1
[[ -z $2 ]] && echo "Project name is empty" && exit 1

TARGET_DIR=$1
PROJECT_NAME=$2
TARGET_REPO=
CD=$(pwd)

echo "Project name is ${PROJECT_NAME}"
echo "Target dir is ${TARGET_DIR}"

if [[ -n $3 ]]; then
  TARGET_REPO="$3"
  echo "Target repository is ${TARGET_REPO}"
else
  echo "Target repository is empty"
fi

echo "Cloning..."

mkdir -p $TARGET_DIR && cp -r . $TARGET_DIR
cd $TARGET_DIR
rm -rf .git

if [[ -n $TARGET_REPO ]]; then
  echo "Initializing repository..."
  git init && git remote add origin $TARGET_REPO
fi

sed -i "s/ENV_PROJECT_NAME/${PROJECT_NAME}/g" dev.sh
cp .env.example .env
rm generator.sh

echo "Cloned :D"
echo ""
echo "Run"
echo "    cd $TARGET_DIR"
echo "    source dev.sh"

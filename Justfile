# Define a recipe for cleaning node_modules
clean:
    echo "Removing existing node_modules folders..."
    find . -name "node_modules" -type d -exec rm -rf {} +

# Define a recipe for installing dependencies
install:
    echo "Installing dependencies..."
    npm install

# Define a recipe for building the project
build:
    echo "Building packages..."
    npm run build

# Define a recipe for starting the project
start:
    echo "Starting the project..."
    npm start

# Define a recipe to run all the above steps in sequence
setup:
    just clean
    just install
    just build
    just start

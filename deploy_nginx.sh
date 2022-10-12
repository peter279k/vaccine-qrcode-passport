#!/bin/bash

echo "The Deployment for Nginx is started."

which nginx 2>&1 > /dev/null

if [[ $? != 0 ]]; then
    echo "The Nginx is not installed."
    exit 1;
fi;


which node 2>&1 > /dev/null

if [[ $? != 0 ]]; then
    echo "The Node.js version is not found."
    exit 1;
fi;


npm run build && sudo rsync -R -av --progress build/* /var/www/html/

echo "The Deployment for Nginx is done!"
echo "The build directory is located in /var/www/html/ folder!"


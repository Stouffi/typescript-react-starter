#!/bin/sh

set -eu

echo "Serializing environment:"

react-env --dest .

# save content of env.js as it will be removed.
subs=$(cat env.js)

rm env.js

echo "$subs"

# cat /var/www/index.html

# Substitute the script with src by an equivalent inline script.
sed -i "s~<script src=\"/env.js\"></script>~<script>${subs}</script>~" /var/www/index.html

# echo 'After substitution'
# cat /var/www/index.html

test -n "$PORT"

envsubst "\$PORT" < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

exec "$@"

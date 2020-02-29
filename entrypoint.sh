#!/bin/sh

set -eu

echo "Serializing environment:"

react-env --dest .

envs=$(cat env.js)

echo "$envs"

# save content of env.js as it will be removed.
subs="data:text/javascript;base64,$(base64 -w 0 env.js)"

echo "$subs"

rm env.js

# cat /var/www/index.html

# Substitute the script with src by an equivalent inline script.
sed -i "s|<script src=\"/env.js\"></script>|<script src=\"${subs}\"></script>|" /var/www/index.html

# echo 'After substitution'
# cat /var/www/index.html

test -n "$PORT"

envsubst "\$PORT" < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

exec "$@"

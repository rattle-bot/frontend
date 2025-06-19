#!/bin/sh

# Generate the runtime config JavaScript file using environment variables
cat <<EOF > /app/dist/js/env.js
window.__RATTLE_CONFIG__ = {
  VITE_PUBLIC_API_HOST: "${VITE_PUBLIC_API_HOST}"
};
EOF

# Start the static file server (http-server)
# --spa ensures it always serves index.html for any route (useful for SPAs)
# -p sets the port, -a sets the host to 0.0.0.0 to allow external access
exec http-server dist --spa -p 3000 -a 0.0.0.0
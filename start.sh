#\!/bin/bash
cd /root/birmingham-hvac
export PORT=80
while true; do
  npm run dev
  echo "Server crashed, restarting in 2 seconds..."
  sleep 2
done

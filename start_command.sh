export HOODIE_BIND_ADDRESS=0.0.0.0:11400
export COUCH_URL=127.0.0.1:11411
hoodie start -n --custom_ports 26029,11400

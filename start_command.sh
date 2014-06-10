export HOODIE_BIND_ADDRESS=0.0.0.0:11400
export COUCH_URL=http://arwd.iriscouch.com/
hoodie start -n --custom_ports 26029,11400

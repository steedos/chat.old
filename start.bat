set DB_SERVER=192.168.0.21
set MONGO_URL=mongodb://%DB_SERVER%/steedos
set MONGO_OPLOG_URL=mongodb://%DB_SERVER%/local
set MULTIPLE_INSTANCES_COLLECTION_NAME=rocketchat_instances
set ROOT_URL=http://192.168.0.88:4000/
set PORT=4000
meteor run

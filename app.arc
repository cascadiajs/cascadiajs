@app
cascadiajs

@static
folder public
fingerprint true

@http
get /
post /signup
post /unsubscribe
get /*

@views
src src/views

@tables
data
  scopeID *String
  dataID **String
  ttl TTL

@app
cascadiajs

@static
folder public
fingerprint true

@http
get /

@views
src src/views

@tables
data
  scopeID *String
  dataID **String
  ttl TTL

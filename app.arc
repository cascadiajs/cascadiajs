@app
cascadiajs

@static
folder public
fingerprint true

@http
get /

@tables
data
  scopeID *String
  dataID **String
  ttl TTL

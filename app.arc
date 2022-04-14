@app
cascadiajs

@static
folder public
fingerprint true

@http
get  /
get  /home
get  /verify
post /login
post /logout
post /signup
post /unsubscribe
get  /*

@views
src src/views

@shared
src src/shared

@tables
data
  scopeID *String
  dataID **String
  ttl TTL

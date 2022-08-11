# webOS Docs

This is the help docs site for [webOSArchive.org](http://www.webosarchive.org)

Its loaded into the main URL using URL re-writing in nginx where individual docs are handled as a query

Build the site with mkdocs (`mkdocs build`)

Copy the index.php into the built directory

URL rewrite from the main domain config looks like:
```
        RewriteEngine on
        RewriteCond %{DOCUMENT_ROOT}/$1 !-f
        RewriteRule ^(/docs/?)(.*)/?$ http://DOCUMENTHOST.com/\?$2/ [P]
```

You probably want to do the same in the HTTPS site config
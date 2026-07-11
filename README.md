# webOS Docs

This is the help docs site for [webOSArchive.org](http://www.webosarchive.org)

## Building and deploying

Build the site with mkdocs (`mkdocs build`), then copy the generated `site/`
directory up to the docs host. The host needs PHP enabled (for `menu.php`) and
`index.html` in its DirectoryIndex. There is no longer a manual "copy index.php"
step -- the homepage (`index.html`), `menu.php`, and the menu CSS/JS are all
emitted into `site/` by the build.

## The shared top nav

Each page pulls the shared webOS Archive top nav from the main site and injects
it client-side (`docs/js/wosa-menu.js` + `docs/css/wosa-menu.css`). To avoid
CORS, the page fetches a same-origin proxy, `docs/menu.php`, which requests the
real menu over whichever protocol the client arrived on -- so legacy http-only
devices stay on http and modern devices get https (no mixed content).

## Serving under the main domain

Pages are served directly at their real paths and reverse-proxied under
`/docs/`. Path-preserving proxy rule (nginx):
```
        location /docs/ {
            proxy_pass http://DOCUMENTHOST/;              # trailing slash strips /docs/
            proxy_set_header Host              $host;
            proxy_set_header X-Forwarded-Proto $scheme;   # so menu.php sees the real protocol
        }
```
Apache equivalent:
```
        RewriteEngine on
        RewriteRule ^/docs/(.*)$ http://DOCUMENTHOST/$1 [P]
        ProxyPassReverse /docs/ http://DOCUMENTHOST/
```

You probably want to do the same in the HTTPS site config.
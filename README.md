# Jashvi Holidays

Static multi-page website for Jashvi Holidays.

## GitHub Pages

The GitHub Actions workflow publishes the `dist/` folder on every push to `main`.

GitHub Pages site: https://charansaikondilla.github.io/jashvi-holidays/
Custom domain: https://jashviholidays.com/

GitHub Pages is configured for `jashviholidays.com`. At the domain registrar, point the apex (`@`) A records to GitHub Pages:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

Remove conflicting apex A/AAAA records. DNS propagation and HTTPS certificate issuance can take additional time after the records are changed.

## Local preview

Serve `dist/` with any static file server, or open `dist/index.html` directly.

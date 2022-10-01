# Publish to Website

## Getting Started

This process is done via a tool called MKDocs. It's quick, easy, and free! Download the package from [here](https://www.mkdocs.org/).

You'll also want to download [this plugin](https://pypi.org/project/mkdocs-callouts/) to auto-convert callouts to the correct format (that way you don't have to run regex commands to replace them). Just run `pip install mkdocs-callouts`, and make sure the below is in the mkdocs.yml. `nl2br` is apparently built in, as I didn't need to install anything for that plugin to work.

```yml
...
markdown_extensions:
  - nl2br
  - admonition
  - pymdownx.details
  - pymdownx.superfences

plugins:
  - search
  - callouts
...
```

To make images pop out when selected, also install `pip install mkdocs-glightbox`, and enable it with

```yml
...
plugins:
  - glightbox
...
```

To enable table sorting and mathjax support, I also added some JavaScript files to `/docs/javascripts/`, labeled `mathjax.js` and `tablesort.js`. See the [Reference section](https://squidfunk.github.io/mkdocs-material/reference/) for the code. A `fav.png` was added to `/docs/images/`.

## Commands
-   `mkdocs new [dir-name]` - Create a new project.
-   `mkdocs serve` - Start the live-reloading docs server.
-   `mkdocs build` - Build the documentation site.
-   `mkdocs -h` - Print help message and exit.

> [!tip]
> no need to ever really build with GitHub actions, as it does it when you upload.

## Folder Structure
```
mkdocs.yml                                       # The configuration file.
.github/
    workflows/                               
        ci.yml                                   # Auto-builds the site
docs/
    index.md                                     # The documentation homepage.
    ...                                          # Other markdown pages, images and other files.
	images/
	    favicon.png                              # Favicon matching logo.svg
	javascripts/
	    mathjax.js                               # From: https://squidfunk.github.io/mkdocs-material/reference/mathjax/
	    tablesort.js                             # From: https://squidfunk.github.io/mkdocs-material/reference/data-tables/#sortable-tables
```

## GitHub Actions
```yml
name: ci 
on:
  push:
    branches:
      - master 
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-python@v2
        with:
          python-version: 3.x
      - run: pip install mkdocs-material 
      - run: pip install mkdocs-callouts 
      - run: pip install mkdocs-glightbox 
      - run: mkdocs gh-deploy --force

```
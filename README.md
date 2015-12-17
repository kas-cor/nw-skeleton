# My NW.js skeleton

Make sure you have `gulp`, `bower` and ` jshint` installed by building:
```bash
npm i gulp bower jshint -g
```

Clone repo:
```bash
git clone https://github.com/kas-cor/nw-skeleton.git project_name
cd project_name
npm i
bower i
gulp
gulp watch
```

Useing:

Input files (for charge):
```bash
_dev/css/style.less
_dev/js/script.js
```

Output files:
```bash
css/style.min.css
js/script.min.js
```

Run project:
```bash
npm start
```

Build project (production):
```bash
gulp build
```

Build files in `build/{AppName}/{platform}/`
uglifyjs src/Qbject.js src/manipulation.js src/traversal.js --compress unsafe --mangle > Qbject.min.js
uglifyjs src/Qbject.js src/manipulation.js src/traversal.js --beautify > Qbject.js

cat Qbject.min.js | wc -c
gzip Qbject.min.js -c | wc -c


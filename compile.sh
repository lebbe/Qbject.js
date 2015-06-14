uglifyjs src/Qbject.js src/manipulation.js src/traversal.js --compress unsafe --mangle > Qbject.min.js
uglifyjs src/Qbject.js src/manipulation.js src/traversal.js --beautify > Qbject.js
gzip Qbject.min.js -c > Qbject.min.js.gz
cat Qbject.min.js | wc -c
cat Qbject.min.js.gz | wc -c

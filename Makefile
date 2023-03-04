all: make-scaffold build-html build-fire-walk

make-scaffold:
	mkdir -p docs/data/img
	mkdir -p docs/data/font

build-html:
	rm -rf docs/plain-html
	mkdir -p docs/plain-html
	cp ./00_construction_html/index.html docs/plain-html/index.html
	cp ./00_construction_html/under-construction/plain-html/favicon.ico docs/plain-html/favicon.ico
	cp -rf ./00_construction_html/under-construction/data/font/* docs/data/font/

build-fire-walk:
	rm -rf docs/fire-walk
	cp -r ./fire-walk/under-construction/fire-walk ./docs/
	cp ./fire-walk/index.html ./docs/fire-walk/

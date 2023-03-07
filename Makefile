all: make-scaffold build-hello-my-name-is build-fire-walk build-television

make-scaffold:
	mkdir -p docs/data/img
	mkdir -p docs/data/font

build-hello-my-name-is:
	rm -rf ./docs/hello-my-name-is
	cp -r hello-my-name-is/under-construction/hello-my-name-is ./docs
	cp hello-my-name-is/index.html ./docs/hello-my-name-is/

build-fire-walk:
	rm -rf ./docs/fire-walk
	cp -r ./fire-walk/under-construction/fire-walk ./docs/
	cp ./fire-walk/index.html ./docs/fire-walk/

build-television:
	rm -rf ./docs/television
	cd ./television && npx vite build
	cp -rf ./television/dist ./docs/television


all: make-scaffold build-hello-my-name-is build-fire-walk

make-scaffold:
	mkdir -p docs/data/img
	mkdir -p docs/data/font

build-hello-my-name-is:
	rm -rf docs/hello-my-name-is
	cp -r hello-my-name-is/under-construction/hello-my-name-is /docs
	cp hello-my-name-is/index.html

build-fire-walk:
	rm -rf docs/fire-walk
	cp -r ./fire-walk/under-construction/fire-walk ./docs/
	cp ./fire-walk/index.html ./docs/fire-walk/

serve-all:
	nx run-many --target=serve --projects=accounting,person,snapshot --skip-nx-cache --parallel=3

lint-all:
	nx run-many --target=lint --fix --projects=accounting,person,snapshot --skip-nx-cache --parallel=3
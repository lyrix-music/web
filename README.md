Lyrix Web
=========

Web fronted for Lyrix. 


Lyrix uses babel and a custom web parser. 

```bash
pushd gen
go build .
popd

pushd static/css
wget https://raw.githubusercontent.com/lyrix-music/styles/main/css/lyrix.css
popd

TEMPLATE_DIR=templates ./gen/gen

yarn run webpack --mode development
```

Run the server
```bash
cd dist
ln -sr ../static static
python3 -m http.server 8000
```

License
-------
[This project](https://github.com/lyrix-music/web) is licensed under the [MIT license](./LICENSE).

# ✨ Obsidian Prettier

This is a plugin developed for [Obsidian](https://obsidian.md) to format markdown files using the popular code formatter [Prettier](https://prettier.io/).

## 🛠️ Building the project

Firstly, clone the project to your local disk by running the following command:

```
git clone https://github.com/BUR4KBEY/obsidian-prettier.git
```

Then, install the dependencies using [yarn](https://yarnpkg.com):

```
cd obsidian-prettier
yarn
```

Next, build the project by running the following command:

```
yarn build
```

Alternatively, you can run the `yarn dev` command for development purposes.

## 🔌 Installation

To install the plugin, follow these steps:

1. Navigate to your Obsidian vault and find the `.obsidian` folder.
2. Create a new folder called `obsidian-prettier` inside the `.obsidian/plugins` directory.
3. Copy `main.js` and `manifest.json` files into the `obsidian-prettier` folder.
4. Enable the plugin from the Obsidian settings. (Community plugins > Prettier Formatter)

## 🚀 Usage

To use the plugin, you need to create a configuration file.

Create a new folder called `config`, and then create a new file called `prettierrc` inside that folder. (You can use any names you like)

The file content must follow this structure:

````
```json
{
    "trailingComma": "none",
    "tabWidth": 4,
    "semi": true,
    "singleQuote": true,
    "arrowParens": "avoid"
}
```
````

You can write your Prettier configuration inside the JSON object.

To use this configuration file, specify the path by opening `Prettier Formatter` in the **Community Plugins** section and writing the path. (`config/prettierrc`)

Once you have set up the path, you can press `CTRL + P` to open the command palette and type `format document`, then run it to format the document according to your configuration.

## ☕ Support

If you find this project useful and would like to support [me](https://github.com/BUR4KBEY), you can do so by visiting [my website](https://burakbey.dev).

<a href="https://burakbey.dev" target="_blank"><img src="https://burakbey.dev/github_support_snippet.png" style="height: 56px !important;width: 200px !important;" alt="Buy me a coffee"></img></a>

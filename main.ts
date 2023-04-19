import {
	App,
	Editor,
	MarkdownView,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
} from "obsidian";
import { format } from "prettier";
import * as babelParser from "prettier/parser-babel";
import * as htmlParser from "prettier/parser-html";
import * as markdownParser from "prettier/parser-markdown";
import * as typescriptParser from "prettier/parser-typescript";
import * as yamlParser from "prettier/parser-yaml";

// import * as graphqlParser from "prettier/parser-graphql";
// import * as postcssParser from "prettier/parser-postcss";

interface PrettierPluginSettings {
	configFilePath: string;
	formatOnSave: boolean;
}

const DEFAULT_SETTINGS: PrettierPluginSettings = {
	configFilePath: "",
	formatOnSave: false,
};

async function formatDocument(
	this: PrettierPlugin,
	editor: Editor,
	view: MarkdownView
) {
	const { configFilePath } = this.settings;

	if (!configFilePath) {
		new Notice("Config file path is not set.");
		return;
	}

	try {
		const configStr = await this.app.vault.adapter.read(
			`${this.settings.configFilePath}.md`
		);
		const lines = configStr.split("\n");
		lines.pop();
		lines.shift();

		const config = JSON.parse(lines.join(""));

		const formatted = format(view.data, {
			...config,
			parser: "markdown",
			plugins: [
				markdownParser,
				babelParser,
				htmlParser,
				typescriptParser,
				yamlParser,
				// graphqlParser,
				// postcssParser,
			],
		});

		if (formatted === view.data) return;

		editor.setValue(formatted);
	} catch (error) {
		console.log(error);
		new Notice("An error ocurred while reading the config file.");
	}
}

export default class PrettierPlugin extends Plugin {
	settings: PrettierPluginSettings;

	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: "prettier-format-document",
			name: "Format Document",
			editorCallback: formatDocument.bind(this),
		});

		this.addSettingTab(new PrettierSettingTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class PrettierSettingTab extends PluginSettingTab {
	plugin: PrettierPlugin;

	constructor(app: App, plugin: PrettierPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", { text: "Prettier Settings" });

		new Setting(containerEl)
			.setName("Config File Path")
			.setDesc("Path to `.prettierrc`")
			.addText((text) =>
				text
					.setPlaceholder("/path/to/.prettierrc")
					.setValue(this.plugin.settings.configFilePath)
					.onChange(async (value) => {
						this.plugin.settings.configFilePath = value;
						await this.plugin.saveSettings();
					})
			);
	}
}

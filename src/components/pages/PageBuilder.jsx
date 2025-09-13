import React, { Component } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import "grapesjs-blocks-basic";

class PageBuilder extends Component {
  constructor(props) {
    super(props);
    this.editor = null;
  }

  componentDidMount() {
    if (!this.editor) {
      this.editor = grapesjs.init({
        container: "#editor",
        height: "100vh",
        width: "auto",
        storageManager: false,
        fromElement: false, // ми самі задаємо стартовий HTML
        components: [`
          <section style="padding: 50px; text-align: center;">
            <h1>Привіт з GrapesJS 🚀</h1>
            <p>Це приклад стартового контенту з текстом, картинкою та кнопкою.</p>
            <img src="https://via.placeholder.com/400x200" alt="demo" style="max-width: 100%; margin: 20px auto;" />
            <button style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px;">
              Натисни мене
            </button>
          </section>
        `,`<section style="padding: 50px; text-align: center;">45454</select>`],
        style: `
          h1 { font-family: Arial, sans-serif; font-size: 32px; margin-bottom: 20px; }
          p { font-size: 18px; color: #333; }
        `,
        plugins: ["gjs-preset-webpage", "gjs-blocks-basic"],
        pluginsOpts: {
          "gjs-blocks-basic": {
            flexGrid: true,
            stylePrefix: "gjs-", // дефолт
          },
          "gjs-preset-webpage": {
            modalImportTitle: "Імпорт HTML",
            modalImportButton: "Завантажити",
            importPlaceholder: "<section><h1>Порожній шаблон</h1></section>",
          },
        },
      });
    }
  }

  saveContent = () => {
    if (this.editor) {
      const html = this.editor.getHtml();
      const css = this.editor.getCss();
      console.log("HTML:", html);
      console.log("CSS:", css);
      alert("Контент збережено (дивись консоль)");
    }
  };

  render() {
    return (
      <div>
        <button
          onClick={this.saveContent}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Зберегти сторінку
        </button>
        <div id="editor" />
      </div>
    );
  }
}

export default PageBuilder;

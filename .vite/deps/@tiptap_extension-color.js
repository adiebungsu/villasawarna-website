import {
  Extension,
  Mark,
  mergeAttributes
} from "./chunk-Q37TXAEY.js";
import "./chunk-WOOG5QLI.js";

// node_modules/@tiptap/extension-text-style/dist/index.js
var mergeNestedSpanStyles = (element) => {
  if (!element.children.length) {
    return;
  }
  const childSpans = element.querySelectorAll("span");
  if (!childSpans) {
    return;
  }
  childSpans.forEach((childSpan) => {
    var _a, _b;
    const childStyle = childSpan.getAttribute("style");
    const closestParentSpanStyleOfChild = (_b = (_a = childSpan.parentElement) === null || _a === void 0 ? void 0 : _a.closest("span")) === null || _b === void 0 ? void 0 : _b.getAttribute("style");
    childSpan.setAttribute("style", `${closestParentSpanStyleOfChild};${childStyle}`);
  });
};
var TextStyle = Mark.create({
  name: "textStyle",
  priority: 101,
  addOptions() {
    return {
      HTMLAttributes: {},
      mergeNestedSpanStyles: false
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (element) => {
          const hasStyles = element.hasAttribute("style");
          if (!hasStyles) {
            return false;
          }
          if (this.options.mergeNestedSpanStyles) {
            mergeNestedSpanStyles(element);
          }
          return {};
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      removeEmptyTextStyle: () => ({ tr }) => {
        const { selection } = tr;
        tr.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
          if (node.isTextblock) {
            return true;
          }
          if (!node.marks.filter((mark) => mark.type === this.type).some((mark) => Object.values(mark.attrs).some((value) => !!value))) {
            tr.removeMark(pos, pos + node.nodeSize, this.type);
          }
        });
        return true;
      }
    };
  }
});

// node_modules/@tiptap/extension-color/dist/index.js
var Color = Extension.create({
  name: "color",
  addOptions() {
    return {
      types: ["textStyle"]
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          color: {
            default: null,
            parseHTML: (element) => {
              var _a;
              return (_a = element.style.color) === null || _a === void 0 ? void 0 : _a.replace(/['"]+/g, "");
            },
            renderHTML: (attributes) => {
              if (!attributes.color) {
                return {};
              }
              return {
                style: `color: ${attributes.color}`
              };
            }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setColor: (color) => ({ chain }) => {
        return chain().setMark("textStyle", { color }).run();
      },
      unsetColor: () => ({ chain }) => {
        return chain().setMark("textStyle", { color: null }).removeEmptyTextStyle().run();
      }
    };
  }
});
export {
  Color,
  Color as default
};
//# sourceMappingURL=@tiptap_extension-color.js.map

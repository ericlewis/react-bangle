import yoga from 'yoga-layout-prebuilt'

const YOGA_CONFIG = yoga.Config.create();
YOGA_CONFIG.setPointScaleFactor(0);

export default class Base {
    constructor(props) {
      this.parent = null;
      this.children = [];
      this.computed = false;
      this.layout = yoga.Node.createWithConfig(YOGA_CONFIG);
      this.props = props
      if (props && props.style) {
        this.setStyle(props.style)
      }
    }

    markDirty() {
      return this.layout.markDirty()
    }
  
    setStyle(style) {
      if (style.x) {
        this.layout.setPosition(yoga.EDGE_LEFT, style.x)
      }
      if (style.y) {
        this.layout.setPosition(yoga.EDGE_TOP, style.y)
      }
      if (style.height) {
        this.layout.setHeight(style.height)
      }
      if (style.width) {
        this.layout.setWidth(style.width)
      }
      if (style.paddingLeft) {
        this.layout.setPadding(yoga.EDGE_LEFT, style.paddingLeft)
      }
      if (style.paddingRight) {
        this.layout.setPadding(yoga.EDGE_RIGHT, style.paddingRight)
      }
      if (style.paddingTop) {
        this.layout.setPadding(yoga.EDGE_TOP, style.paddingTop)
      }
      if (style.paddingBottom) {
        this.layout.setPadding(yoga.EDGE_BOTTOM, style.paddingBottom)
      }
      if (style.flex) {
        this.layout.setFlex(style.flex)
      }
      if (style.justifyContent) {
        this.layout.setJustifyContent(style.justifyContent)
      }
      if (style.alignContent) {
        this.layout.setAlignContent(style.alignContent)
      }
      if (style.alignItems) {
        this.layout.setAlignItems(style.alignItems)
      }
      if (style.flexDirection) {
        this.layout.setFlexDirection(style.flexDirection)
      }
    }
  
    appendChild(child) {
      if (child) {
        child.parent = this;
        this.children.push(child);
        this.layout.insertChild(child.layout, this.layout.getChildCount());
      }
    }
  
    appendChildBefore(child, beforeChild) {
      const index = this.children.indexOf(beforeChild);
  
      if (index !== -1 && child) {
        child.parent = this;
        this.children.splice(index, 0, child);
        this.layout.insertChild(child.layout, index);
      }
    }
  
    removeChild(child) {
      const index = this.children.indexOf(child);
  
      if (index !== -1) {
        child.parent = null;
        this.children.splice(index, 1);
        this.layout.removeChild(child.layout);
      }
  
      child.cleanup();
    }
  
    removeAllChildren() {
      const children = [...this.children];
      for (let i = 0; i < children.length; i++) {
        children[i].remove();
      }
    }
  
    remove() {
      this.parent.removeChild(this);
    }
  
    cleanup() {
      this.children.forEach(c => c.cleanup());
      this.layout.unsetMeasureFunc();
      yoga.Node.destroy(this.layout);
    }
  
    render(a) {
      return this.children.flatMap((c) => c.render(a)).join("")
    }

    update(props) {
      this.props = props
      if (props && props.style) {
        this.setStyle(props.style)
      }
    }

    getLayoutData() {
      const layout = this.getAbsoluteLayout();
  
      return {
        type: this.name,
        top: layout.top,
        left: layout.left,
        width: layout.width,
        style: this.style,
        height: layout.height,
        children: this.children.map(c => {
          return c.getLayoutData();
        }),
      };
    }

    get top() {
      return this.layout.getComputedTop() || 0;
    }
  
    get left() {
      return this.layout.getComputedLeft() || 0;
    }
  
    get right() {
      return this.layout.getComputedRight() || 0;
    }
  
    get bottom() {
      return this.layout.getComputedBottom() || 0;
    }
  
    get width() {
      return this.layout.getComputedWidth();
    }
  
    get minWidth() {
      return this.layout.getMinWidth().value;
    }
  
    get maxWidth() {
      return this.layout.getMaxWidth().value;
    }
  
    get height() {
      return this.layout.getComputedHeight();
    }
  
    get minHeight() {
      return this.layout.getMinHeight().value;
    }
  
    get maxHeight() {
      return this.layout.getMaxHeight().value;
    }

    calculateLayout() {
      this.layout.calculateLayout(240, 240, yoga.DIRECTION_LTR);
      this.computed = true;
    }

    getAbsoluteLayout() {
      const parent = this.parent;
      const parentLayout =
        parent && parent.getAbsoluteLayout
          ? parent.getAbsoluteLayout()
          : { left: 0, top: 0 };
  
      return {
        left: this.left + parentLayout.left,
        top: this.top + parentLayout.top,
        height: this.height,
        width: this.width,
      };
    }
  }
import Base from './BaseNode'

export default class Text extends Base {
    text = undefined

    constructor(props) {
        super(props)
        this.text = props.text
        this.layout.setMeasureFunc(this.measureText.bind(this))
    }

    measureText(width, widthMode, height, heightMode) {
        return { height: 8 * 2, width: ((this.text || this.props.children).length * 8) * 2 }
    }

    update({children}) {
        this.text = children
        this.markDirty()
    }

    appendChild(child) {
      if (child) {
        child.parent = this;
        this.children.push(child);
        this.markDirty();
      }
    }
  
    removeChild(child) {
      const index = this.children.indexOf(child);
  
      if (index !== -1) {
        child.parent = null;
        this.children.splice(index, 1);
        this.markDirty();
  
        child.cleanup();
      }
    }

    render() {
        return `.s(\`${this.text || this.props.children}\`, ${this.left + this.layout.getParent().getComputedLeft()}, ${this.top + this.layout.getParent().getComputedTop()})`
    }
}
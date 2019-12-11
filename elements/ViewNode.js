import Base from './BaseNode'

export default class View extends Base {
    render(a) {        
        this.calculateLayout()

        let styles = ""

        if (this.props.style) {
            if (this.props.style.font) {
                styles += `.f(\`${this.props.style.font}\`)`
            }
            if (this.props.style.color) {
                styles += `.c(\`${this.props.style.color}\`)`
            }
        }
        return styles + super.render(a)
    }
}
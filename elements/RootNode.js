import Base from './BaseNode'

export default class Root extends Base {
    render() {
        const command = `d=()=>{g.q().c(65535).f("6x8", 2)${super.render()}.flip()}p=(i)=>()=>{d()Bluetooth.println(E.toJS({b:i}))}cw()sw(p(1),BTN1,re)sw(p(2),BTN2,re)sw(p(3),BTN3,re)sw(p(4),BTN4,re)sw(p(5),BTN5,re)d()`
        if (document) {
            console.log(command)
        } else {
            UIManager.flush(command)
        }
    }
}

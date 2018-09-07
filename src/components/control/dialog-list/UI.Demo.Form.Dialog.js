import React from 'react'
import Ux from 'ux';
import Op from './Op.Sub';

const {zero} = Ux;

@zero(Ux.rxEtat(require('./Cab.json'))
    .cab("UI.Demo.Form.Dialog")
    .bind(Op)
    .raft(1)
    .form().to()
)
class Component extends React.PureComponent {
    render() {
        console.info(this.props);
        return Ux.uiFieldForm(this, {}, 1)
    }
}

export default Component
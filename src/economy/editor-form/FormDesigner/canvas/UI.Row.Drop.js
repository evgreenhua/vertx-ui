import React from 'react';
import {DropTarget} from "react-dnd";
import Op from "../op";

class Component extends React.PureComponent {
    state = {}

    componentDidUpdate(prevProps, prevState, snapshot) {
        const targetItem = Op.item(this.props);
        const sourceItem = this.props['dragItem'];
        if (!Op.itemRowSame(sourceItem, targetItem)) {
            Op.dropColor(this, this.props['isOver']);
        }
    }

    render() {
        const {connectDropTarget} = this.props;
        const {$hover = false} = this.state;
        return connectDropTarget(
            <div className={`canvas-row-drop ${$hover ? "canvas-row-drop-hover" : ""}`}>

            </div>
        )
    }
}

export default DropTarget(
    Op.DragTypes.RowDesigner,
    Op.Row.targetSpec,
    Op.Row.targetConnect
)(Component);
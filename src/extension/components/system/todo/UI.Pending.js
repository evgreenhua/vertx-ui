import React from 'react';
import Ux from 'ux';
import Ex from "ex";
import Op from './Op';

import FormFilter from './form/UI.Filter';
import renderJsx from './Web';

@Ux.zero(Ux.rxEtat(require('./Cab.json'))
    .cab("UI.Todo")
    .to()
)
class Component extends React.PureComponent {
    componentDidMount() {
        Op.yiPage(this);
    }

    render() {
        return Ex.yoRender(this, () => {
            const grid = Ux.fromHoc(this, "grid");
            const form = {
                FormFilter,
            };
            /*
             * 三阶降级为二阶
             */
            const op = {};
            Object.keys(Op.$op).forEach(key => op[key] = Op.$op[key](this));
            /*
             * category data
             */
            const category = Ux.onDatum(this, "data.pending");
            return renderJsx(this, {grid, form, category, op});
        }, Ex.parserOfColor("PxPending").control())
    }
}

export default Component;
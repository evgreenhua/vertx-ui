import React from 'react';
import Ux from 'ux';
import Ex from 'ex';
import {ExComplexList} from "ei";
import FormAdd from './form/UI.Add';
import FormEdit from './form/UI.Edit';
import FormFilter from './form/UI.Filter';
import Op from "../../organization/company/Op";

/*
 * modified by Hongwei
 * .ready(true) removed
 * componentDidMount added
 */
@Ux.zero(Ux.rxEtat(require('./Cab'))
    .cab("UI.List")
    .to()
)
class Component extends React.PureComponent {
    componentDidMount() {
        Op.yiList(this);
    }

    render() {
        return Ex.yoRender(this, () => {
            const config = Ux.fromHoc(this, "grid");
            const form = {
                FormAdd,
                FormEdit,
                FormFilter,
            };
            return (
                <ExComplexList {...Ex.yoAmbient(this)}
                               config={config} $form={form}/>
            )
        }, Ex.parserOfColor("PxUserList").control());
    }
}

export default Component;

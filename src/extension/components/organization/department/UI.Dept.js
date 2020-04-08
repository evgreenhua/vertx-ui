import React from 'react';
import Ux from 'ux';
import Ex from 'ex';
import {ExComplexList} from "ei";
import FormAdd from './form/UI.Add';
import FormEdit from './form/UI.Edit';
import FormFilter from './form/UI.Filter';
import Op from './form/Op';

@Ux.zero(Ux.rxEtat(require('./Cab'))
    .cab("UI.Dept")
    .ready(true)
    .to()
)
class Component extends React.PureComponent {
    componentDidMount() {
        Ex.yiCompany(this).then(Ux.pipe(this));
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
                               rxPostDelete={Op.rxPostDelete(this)}
                               rxAssist={Op.rxAssist(this)}
                               config={config} $form={form}/>
            )
        }, Ex.parserOfColor("PxDepartmentList").control());
    }
}

export default Component;
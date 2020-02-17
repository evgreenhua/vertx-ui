import React from 'react';
import Ux from "ux";
import Ex from 'ex';
import Op from './Op';
import {ExComplexList} from "ei";

import {ModelAdd as FormAdd, ModelEdit as FormEdit, ModelFilter as FormFilter,} from "./form";

@Ux.zero(Ux.rxEtat(require('../Cab.json'))
    .cab("UI.Model")
    .to()
)
class Component extends React.PureComponent {
    componentDidMount() {
        Op.yiPage(this);
        Ex.yiStandard(this);
    }

    render() {
        return Ex.yoRender(this, () => {
            const config = Ux.fromHoc(this, "grid");
            const form = {
                FormAdd,        // 主单（添加）
                FormEdit,       // 主单（编辑）
                FormFilter,     // 过滤单
            };
            return (
                <ExComplexList {...Ex.yoAmbient(this)}
                               config={config} $form={form}/>
            );
        }, Ex.parserOfColor("PxModel").control())
    }
}

export default Component;
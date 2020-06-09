import React from 'react';
import {component} from "../../../_internal";
import {Form, Tabs} from "antd";
import Ux from 'ux';

const Page = {
    "tabPreview": (reference) => {
        return Ux.aiForm(reference);
    },
    "tabConfig": (reference) => {
        return false;
    }
}

const yiInternal = (reference) => {
    const {data = {}} = reference.props;
    Ux.dgDebug(data, "预览表单专用");
    const state = {};
    const {form = {}} = data;
    const raft = Ux.configForm(form, {
        id: "SubForm-Preview",
        reference,                  // 引用数据
    });
    state.raft = raft;
    state.$ready = true;
    reference.setState(state);
}

@component({
    "i18n.cab": require('../Cab.json'),
    "i18n.name": "UI.Preview",
})
class Component extends React.PureComponent {
    componentDidMount() {
        yiInternal(this);
    }

    render() {
        return Ux.xtReady(this, () => {
            const tabs = Ux.fromHoc(this, "tabs");
            const tabConfig = Ux.configTab(this, tabs);
            const {items = [], ...rest} = tabConfig;
            return (
                <Tabs {...rest}>
                    {items.map(item => (
                        <Tabs.TabPane {...item}>
                            {(() => {
                                const executor = Page[item.key];
                                return executor(this);
                            })()}
                        </Tabs.TabPane>
                    ))}
                </Tabs>
            );
        }, {
            name: "FormPreview",
            logger: true,
        })
    }
}

export default Form.create({})(Component)
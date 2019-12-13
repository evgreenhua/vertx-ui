import Ex from "ex";
import {Drawer} from "antd";
import React from "react";
import {LoadingAlert} from "web";

const _renderNotice = (reference) => {
    const {$notice} = reference.state;
    return $notice ? (
        <LoadingAlert $alert={$notice} $type={"warning"}/>
    ) : false;
};

export default (reference) => {
    const {
        $advanced,
        $visible = false
    } = reference.state;
    $advanced.visible = $visible;
    const {$form = {}} = reference.props;
    const {FormFilter} = $form;
    if (FormFilter) {
        const filterAttrs = Ex.yoFilter(reference);
        return (
            <Drawer {...$advanced} className={"ex-drawer"}>
                {/* Drawer issue: https://github.com/ant-design/ant-design/issues/20175 */}
                {_renderNotice(reference)}
                <FormFilter {...filterAttrs}/>
            </Drawer>
        );
    } else return false;
}
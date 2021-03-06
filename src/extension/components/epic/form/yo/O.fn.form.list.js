import Ex from 'ex';
import Form from "../form/UI.Form";
import React from "react";

export default (reference) => {
    const {$identifier} = reference.props;
    if ($identifier) {
        const state = {};
        Ex.I.forms($identifier).then(forms => {
            state.$data = forms;
            state.$ready = true;
            /*
             * 窗口配置
             */
            Ex.uiDialog(reference).child(() => {
                const {$inited = {}} = reference.state;
                return (<Form {...Ex.yoAmbient(reference)} $inited={$inited}/>)
            }).onMount(state);
            reference.setState(state);
        })
    } else {
        const state = {};
        state.error = `Error to read form configuration, the "$identifier" is null, could not get forms.`;
        reference.setState(state);
    }
}
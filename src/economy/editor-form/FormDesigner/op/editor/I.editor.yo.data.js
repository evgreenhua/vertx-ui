import Ux from 'ux';

export default {
    /*
     * 配置数据专用
     */
    yoDataIn: (data = {}, reference) => {
        const $data = reference.props.data;
        const message = Ux.fromHoc(reference, "message");
        const {optionItem = {}} = data;
        /* 初始化 */
        const $inited = {};
        {
            // 外层输入的标签信息
            if (optionItem.label &&
                message.label !== optionItem.label) {
                $inited.label = optionItem.label;
            }
            $inited.render = $data.render;  // 当前 render
            $inited.allowClear = false;     // 不允许清空
        }
        return $inited;
    },
    yoDataOut: (params = {}, reference) => {

    }
}
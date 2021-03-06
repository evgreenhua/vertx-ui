import Ux from 'ux';
import dataAjax from './O.fn.ajax';
import Opt from './I.option';

export default (normalized = {}, params = {}) => {
    /*
     * 表格配置
     */
    Opt.dataTable(normalized, params.table);

    /*
     * 窗口基础配置
     */
    if (params.windowValidation) {
        /* 窗口配置必须带选择验证 */
        normalized.optionJsx.config.validation = params.windowValidation;
        const window = {};
        if (params.windowTitle) {
            window.title = params.windowTitle;
        }
        if (params.windowWidth) {
            window.width = Ux.valueInt(params.windowWidth, 640);
        } else {
            window.width = 640;
        }
        window.okText = params.windowOk ? params.windowOk : "Yes";
        window.cancelText = params.windowCancel ? params.windowCancel : "No";
        window.maskClosable = false;
        const $window = Ux.valueValid(window);
        if (!Ux.isEmpty($window)) {
            normalized.optionJsx.config.window = $window;
        }
    }
    /*
     * 搜索专用配置
     */
    if (params.windowSearch) {
        if (Ux.isArray(params.windowSearchField) && 0 < params.windowSearchField.length) {
            const search = {};
            params.windowSearchField.forEach(cond => {
                search[`${cond},c`] = cond;
            })
            normalized.optionJsx.config.search = search;
        }
    }
    dataAjax(normalized, params);
}
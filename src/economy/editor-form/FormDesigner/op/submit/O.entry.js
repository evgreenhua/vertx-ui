import dataJsx from './I.fn.option.jsx';
import dataRules from './I.fn.rule';

export default {
    dataInit: (normalized = {}, params = {}) => {
        /*
         * normalized.field 可不设置
         * normalized.optionJsx 初始化
         * normalized.optionItem 初始化
         * normalized.optionConfig 初始化
         */
        normalized.optionJsx = {config: {}, depend: {}};
        normalized.optionItem = {};
        normalized.optionConfig = {};
    },
    /*
     * 基础数据部分
     */
    dataField: (normalized = {}, params = {}) => {
        normalized.optionItem.label = params.label;
        // 是否设置了宽度
        if (params.width) {
            normalized.optionItem.style = {width: params.width};
        }
        // 字段信息设置
        if ("aiTitle" === params.render) {
            normalized.title = params.field;
        } else if ("aiAction" === params.render) {
            normalized.field = "$button";
        } else {
            normalized.field = params.field;
        }
        // 水印文字处理
        dataJsx(normalized, params, 'placeholder');
    },
    dataBasic: (normalized = {}, params = {}) => {
        // 是否只读
        dataJsx(normalized, params, 'readOnly');
        // 只读文字
        dataJsx(normalized, params, 'inscribe');
        // 是否允许清空
        dataJsx(normalized, params, 'allowClear');
        // 最大长度
        dataJsx(normalized, params, 'maxLength');
    },
    dataAdorn: (normalized = {}, params = {}) => {
        // 文字前后缀
        dataJsx(normalized, params, 'suffix');
        dataJsx(normalized, params, "prefix");
        // addon 前后缀
        dataJsx(normalized, params, "addonAfter");
        dataJsx(normalized, params, "addonBefore");
    },
    /*
     * 验证规则专用
     */
    dataRules
}
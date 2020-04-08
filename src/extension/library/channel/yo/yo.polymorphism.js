import yoAmbient from './yo.ambient';
import Fn from '../../functions';
import Ux from 'ux';

/**
 * ## 扩展函数
 *
 * 动态扩展配置，前置调用`yoAmbient`方法处理统一配置，之后追加：
 *
 * 1. 直接读取 fromHoc 中的 grid 配置
 * 2. 如果传入了专用表单配置，则处理 form 表单配置，填充 $form 变量
 * 3. state 中的 $query 读取
 * 4. state 中的 config.options 中读取 $identifier
 * 5. 构造 $inited 中的 $identifier
 *
 * @memberOf module:_channel
 * @method yoPolymorphism
 * @param {ReactComponent} reference React对应组件引用
 * @param {Object} form
 * @returns {Object} 计算最终生成的继承属性专用方法
 */
export default (reference = {}, {form}) => {
    const attrs = yoAmbient(reference);
    /*
     * 配置 config 相关信息构成多态，直接从 grid 中读
     */
    const config = Ux.fromHoc(reference, "grid");
    if (config) {
        /*
         * 通过拷贝检查最终的 config 发生改变
         * 这里必须使用拷贝以方便切换，如果不拷贝那么切换会导致最终的
         * 界面不刷新（动态切换必须在这里处理）
         */
        attrs.config = Ux.clone(config);
    }
    /*
     * 专用组件信息
     * 用于配置 $form 专用组件
     */
    if (form) {
        attrs.$form = form;
    }
    /*
     * $query 中的 this.state
     */
    const {$query = {}} = reference.state ? reference.state : {};
    attrs.$query = $query;
    /*
     * options = {}
     */
    const {options = {}} = config;
    if (options[Fn.Opt.IDENTIFIER]) {
        attrs.$identifier = options[Fn.Opt.IDENTIFIER];
    }
    return attrs;
}
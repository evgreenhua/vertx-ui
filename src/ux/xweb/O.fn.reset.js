import U from 'underscore';
import Abs from '../abyss';

const isDiff = (left, right) => {
    const leftType = typeof left;
    const rightType = typeof right;
    if (leftType === rightType) {
        // 相同类型才能比较
        if (U.isArray(left) || U.isObject(left)) {
            return Abs.isDiff(left, right);
        } else {
            return left !== right;
        }
    } else {
        // 类型不同则二者不同
        return true;
    }
};

/**
 * ## 标准函数
 *
 * 重置专用函数，内部关联 Ant Design 的 Form信息。
 *
 * @memberOf module:_xt
 * @method xtReset
 * @param {ReactComponent} reference React组件引用。
 * @param {Object} virtualRef 带有state和props的前一次状态信息。
 * @param {Function} callback 回调函数处理。
 */
export default (reference, virtualRef = {}, callback) => {
    /*
     * 三个值相互比较
     */
    const current = reference.props.value;
    const original = virtualRef.props.value;
    const metadata = reference.props['data-__meta'];
    /*
     * 初始值
     */
    const initial = metadata.initialValue;
    if (isDiff(current, original) && !isDiff(current, initial)) {
        callback(initial);
    }
};
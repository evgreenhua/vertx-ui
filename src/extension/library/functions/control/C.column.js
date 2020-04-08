import Ux from 'ux';

/**
 * ## 扩展函数
 *
 * 表格列扩展配置。
 *
 * @memberOf module:_config
 * @param {Array} original 原始列配置
 * @param {Object} config 表格专用输入配置
 * @returns {Array} 返回处理过后的列配置
 */
const configColumn = (original = [], config = {}) => {
    const {columns = [], filters = []} = config;
    /*
     * 合并过后的列存储在当前 $table 变量中
     * Full模式不改变，只做一次初始化
     */
    const normalized = Ux.clone(original).concat(columns);
    const resultColumns = [];
    {
        const $filters = Ux.immutable(filters);
        normalized
            .map(column => Ux.valueLadder(column))
            /*
             * 按照 filters 计算
             * 这里的 filters 是：不包含的意思
             */
            .filter(column => !$filters.contains(column.dataIndex))
            .forEach(column => resultColumns.push(column));
    }
    return resultColumns;
};
export default {
    configColumn
}
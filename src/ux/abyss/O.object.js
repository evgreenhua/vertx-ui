import U from 'underscore';

/**
 * ## 标准函数
 *
 * 子集函数，用于读取子集，切分对象生成对象子集
 *
 * ### Object 类型
 *
 * ```js
 * const before = {
 *     a: "a", b:"b", c:"c"
 * }
 * const after = Ux.slice(before, "a", "b");
 * // after 的最终值是：{ a:"a", b:"b" }
 * ```
 *
 * ### Array 类型
 *
 * ```js
 * const before = [
 *      { a: "a1",  b: "b1", c: "c1" }.
 *      { a: "a2",  b: "b2", c: "c2" }.
 * ]
 * const after = Ux.slice(before, "b", "c");
 * // after 的最终结果是：
 * // [
 * //      { b:"b1", c:"c1" },
 * //      { b:"b2", c:"c2" }
 * // ]
 * ```
 *
 * @memberOf module:_primary
 * @param {Array|Object} input 输入可以是对象，可以是数组
 * @param {String[]} keys 可变参数，每个元素都是字符串
 * @returns {Object} 返回子集对象
 */
const slice = (input, ...keys) => {
    if (0 < keys.length) {
        const fnClone = (item) => {
            const newItem = {};
            keys.filter(each => item.hasOwnProperty(each))
                .forEach(key => newItem[key] = item[key]);
            return newItem;
        };
        if (U.isArray(input)) {
            return input.map(each => fnClone.apply(this, [each].concat(keys)));
        } else if (U.isObject(input)) {
            return fnClone.apply(this, [input].concat(keys));
        } else return {};
    } else return {};
};
const Letter = {
    UPPER: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    LOWER: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
};
/**
 * ## 标准函数
 *
 * 序号生成函数，根据输入生成相关序号信息，支持的模式如下：
 *
 * 1. DIGEST：数字序号：1,2,3,4
 * 2. UPPER：大写字母序号：A,B,C,D 等
 * 3. LOWER：小写字母序号：a,b,c,d 等
 *
 * 如数参数input必须是数值
 *
 * @memberOf module:_primary
 * @param {Number} input 输入的序号，序号从 1 开始
 * @param {String} mode 当前生成序号的模式，支持惨重模式
 * @returns {String|Number} 生成的序号信息
 *
 */
const sequence = (input, mode = "DIGEST") => {
    if ("number" === typeof input) {
        if ("UPPER" === mode) {
            return Letter.UPPER[input - 1];
        } else if ("LOWER" === mode) {
            return Letter.LOWER[input - 1];
        } else return input;
    } else {
        console.info("输入参数 input 类型错误", input);
    }
};
export default {
    slice,
    sequence,
}
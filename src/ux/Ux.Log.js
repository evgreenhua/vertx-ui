import Env from './Ux.Env';

const _colorful = (reference = {}, Name, color = {}, type, stateless) => {
    if (Env.DEBUG) {
        const flag = type ? type : 'React Component';
        let message = `%c [Kid] [${(!stateless)
            ? flag
            : "Stateless Function Component"}] Control monitor: name = ${Name}`;
        console.groupCollapsed(message, `color:${color.group};font-weight:900`);
        console.log(`%c [Kid] Props -> `, `color:${color.props};font-weight:900`, reference.props);
        if (!stateless) {
            console.log(`%c [Kid] State -> `, `color:${color.state};font-weight:900`, reference.state);
        }
        console.groupEnd()
    }
};
/**
 * 【开发模式】可重用控件组件日志打印
 * @method control
 * @param {ReactComponent} reference React对应组件引用
 * @param Name 当前控件名称
 */
const control = (reference = {}, Name) => {
    _colorful(reference, Name, {
        group: '#990000',
        props: '#660099',
        state: '#666666'
    }, 'Rx-Control');
};
/**
 * 【开发模式】页面组件日志打印
 * @method page
 * @param {ReactComponent} reference React对应组件引用
 * @param Name 当前控件名称
 */
const page = (reference = {}, Name) => {
    _colorful(reference, Name, {
        group: '#CC0033',
        props: '#660099',
        state: '#666666'
    }, 'Rx-Page');
};
/**
 * 【开发模式】纯函数组件日志打印
 * @method stateless
 * @param {ReactComponent} reference React对应组件引用
 * @param Name 当前控件名称
 */
const stateless = (props = {}, Name) => {
    _colorful({
        props,
        state: null
    }, Name, {
        group: '#99CC33',
        props: "#660099",
        state: "#666666"
    }, 'Rx-Stateless', true)
};
/**
 * 【开发模式】Layout组件日志打印
 * @method container
 * @param {ReactComponent} reference React对应组件引用
 * @param Name 当前控件名称
 */
const container = (reference = {}, Name) => {
    _colorful(reference, Name, {
        group: '#009900',
        props: '#660099',
        state: '#666666'
    }, 'Rx-Container');
};
/**
 * 【开发模式】Page中的其他自定义组件日志打印
 * @method component
 * @param {ReactComponent} reference React对应组件引用
 * @param Name 当前控件名称
 */
const component = (reference = {}, Name) => {
    _colorful(reference, Name, {
        group: '#CC9933',
        props: '#660099',
        state: '#666666'
    }, 'Rx-Component');
};
/**
 * 【开发模式】Form专用组件日志打印
 * @method form
 * @param {ReactComponent} reference React对应组件引用
 * @param Name 当前控件名称
 */
const form = (reference = {}, Name) => {
    _colorful(reference, Name, {
        group: '#0099FF',
        props: '#660099',
        state: '#666666'
    }, 'Rx-Form');
};
/**
 * 【开发模式】过滤参数专用
 * @method filters
 * @param {ReactComponent} reference React对应组件引用
 * @param input 输入的Query参数
 * @param query Prop属性中的Query参数
 * @param filters 最终搜索用的Query参数
 * @param cond 搜索条件
 */
const filters = (reference = {}, {
    input = {}, query = {}, filters = {}, cond
}) => {
    if (Env.DEBUG) {
        let message = `%c [Kid] [Filter] Filters Data Process`;
        console.groupCollapsed(message, "color:red;font-weight:900");
        console.log(`%c [Kid] Input Query -> `, 'color:#009900;font-weight:900', input);
        console.log(`%c [Kid] Prop Query -> `, 'color:#660099;font-weight:900', query);
        console.log(`%c [Kid] Search Filter -> `, 'color:#0099FF;font-weight:900', filters);
        console.log(`%c [Kid] Cond -> `, 'color:blue;font-weight:900', cond);
        console.groupEnd();
    }
};
/**
 * 【开发模式】签名专用函数
 * @method sign
 * @param uri 请求的Uri地址
 * @param method 请求的Http方法
 * @param parameters 请求的参数信息
 * @param seed 签名种子值
 * @param sig 签名最终结果
 * @param secret 签名的secret
 */
const sign = (uri, method, parameters, {
    seed, sig, secret
}) => {
    if (Env.DEBUG) {
        let message = `%c [Kid] [Sign] Sign with method ${method}. ( uri = ${uri})`;
        console.groupCollapsed(message, "color:#CCCC33;font-weight:900");
        console.log(`%c [Kid] Parameters -> `, 'color:#9999CC;font-weight:900', parameters);
        console.log(`%c [Kid] Seed -> `, 'color:#669966;font-weight:900', seed);
        console.log(`%c [Kid] Secret -> `, 'color:blue;font-weight:900', secret);
        console.log(`%c [Kid] Sig -> `, 'color:red;font-weight:900', sig);
        console.groupEnd();
    }
};
/**
 * 【开发模式】打印请求数据
 * @method request
 * @param uri 请求的Uri地址
 * @param method 请求的Http方法
 * @param parameters 请求的参数信息
 * @param token 当前请求的token
 */
const request = (uri, method, parameters, token = '') => {
    if (Env.DEBUG) {
        let message = `%c [Kid] [Ajax] Ajax request with method ${method}. ( uri = ${uri})`;
        console.groupCollapsed(message, "color:#0066CC;font-weight:900");
        console.log(`%c [Kid] Parameters -> `, 'color:#9999CC;font-weight:900', parameters);
        console.log(`%c [Kid] Uri -> `, 'color:#669966;font-weight:900', uri);
        console.log(`%c [Kid] Token -> `, 'color:#339966;font-weight:900', token);
        console.groupEnd();
    }
};
/**
 * 【开发模式】打印响应信息
 * @method response
 * @param err Ajax的错误对象
 * @param res Ajax的正确响应
 * @param method Http方法
 * @return {*}
 */
const response = (err, res, method) => {
    if (Env.DEBUG) {
        let message = `%c [Kid] [Ajax] Ajax response got with method. ${method}`;
        console.groupCollapsed(message, "color:#006699;font-weight:900");
        console.log(`%c [Kid] Resource -> `, 'color:#9999CC;font-weight:900', res);
        console.log(`%c [Kid] Error -> `, 'color:#669966;font-weight:900', err);
        console.groupEnd();
    }
    // For fetch api 专用
    return res
};
/**
 * 直接打印错误信息（红色文字打印）
 * @method error
 * @param error
 */
const error = (error) => {
    let message = `%c [Kid] [Error] Error occurs got. status = ${error.status}, code = ${error.code}, brief = ${error.statusText}`;
    console.groupCollapsed(message, "color:red;font-weight:900");
    console.log(`%c [Kid] Error message -> `, 'color:#ff0073;font-weight:900', error.message);
    console.log(`%c [Kid] Read message -> `, 'color:#ee0033;font-weight:900', error.info);
    console.groupEnd();
};
/**
 * 【开发模式，并且开启Mock】打印Mock数据
 * @method mock
 * @param {Request} request 请求数据
 * @param {Response} response 响应数据
 * @param {String} url 请求的url
 * @return {*}
 */
const mock = (request, response, url) => {
    if (Env.DEBUG && Env.MOCK) {
        let message = `%c ------> [Error] [Mock] Mock data for api ${url ? url : ""}`;
        console.groupCollapsed(message, "color:red;font-weight:900");
        if (request) {
            console.log("%c [Kid] Mock request -> ", 'color:#99CC33', request);
        } else {
            console.log("%c [Kid] Mock request -> ( Promise Mode Directly )", 'color:#99CC33');
        }
        console.log("%c [Kid] Mock response -> ", 'color:#0099FF', response);
        console.groupEnd();
    }
    return response;
};
/**
 * 【开发模式】直接打印数据
 * @method debug
 * @param object
 */
const debug = (object) => {
    if (Env.DEBUG) {
        console.info(object);
    }
};
/**
 * @class Log
 * @description 日志专用类，支持不同组件的彩色日志
 */
export default {
    control,
    container,
    component,
    page,
    form,
    stateless,
    sign,
    request,
    response,
    error,
    debug,
    filters,
    mock
}

import Cv from "../../constant";
import Ele from '../../element';
import Abs from "../../abyss";

const toGrid = (config = {}) => {
    const {grid = 3} = config;
    const style = {};
    switch (grid) {
        case 5:
            style.width = "20%";
            break;
        case 4:
            style.width = "25%";
            break;
        case 3:
            style.width = "33.33%";
            break;
        case 2:
            style.width = "50%";
            break;
        case 1:
            style.width = "100%";
            break;
        default: {
            console.error("[ Ux ] 暂时不支持该值：", grid);
            break;
        }
    }
    return style;
};
const toHeight = (adjust = 0) => {
    const height = document.body.clientHeight;
    const width = document.body.clientWidth;
    let maxHeight = height;
    if (1024 < width && width <= 1400) {
        // 直接计算（郑州项目）
        maxHeight = height - 48 - adjust;
    } else if (1400 < width && width < 1900) {
        maxHeight = height - 48 - adjust;
    } else if (1900 < width) {
        maxHeight = height - 56 - adjust;
    }
    return maxHeight;
};

const toCss = (name) => `${Cv['CSS_PREFIX']}-${name}`;

const toMessage = (content, error = false) => {
    if (content) {
        const config = {};
        config.modal = {};
        if (error) {
            config.modal.error = {content};
        } else {
            config.modal.success = {content};
        }
        return config;
    }
};
const toKey = (key, assist = true) => {
    if (assist) {
        return `$a_${key.replace(/\./g, '_')}`;
    } else {
        return `$t_${key.replace(/\./g, '_')}`;
    }
};
const toLink = (data = [], $app) => data.map(item => {
    const path = $app._("path") ? $app._("path") : Cv.Env['ROUTE'];
    let relatedPath = `${path}${item.uri}`;
    if (!relatedPath.startsWith('/')) {
        relatedPath = `/${relatedPath}`;
    }
    item.uri = relatedPath;
    return item;
});
const toX = (columns = []) => {
    let x = 0;
    columns.forEach(column => {
        if (column.hasOwnProperty('width')) {
            x += Ele.valueInt(column.width, 144);
        } else {
            x += 200;
        }
    });
    return x;
};
const toWidth = (literal = "") => {
    if ("string" === typeof literal) {
        let width = 0;
        for (let idx = 0; idx < literal.length; idx++) {
            const str = String(literal.charAt(idx));
            if (Abs.isCn(str)) {
                width += 2;
            } else {
                width += 1;
            }
        }
        return width;
    } else return -1;
};
export default {
    toHeight,
    toGrid,
    toMessage,

    toCss,  // /* 根据 CSS_PREFIX 前缀计算的 Class */
    toKey,  // 生成 assist / tabular 相关 key
    toLink,
    toX,    // 表格专用列生成
    toWidth, // 计算字符串长度，中文字 x 2
}
import React from "react";
import {Icon} from "antd";
import CellOp from './O.render.op';
import Aid from './I.tool.render';
import U from 'underscore';
import Ut from '../../unity';
import Ajax from '../../ajax';
import {saveAs} from "file-saver";

const _aiCellSingle = (reference, config, text) => {
    let downloadConfig = config["$download"];
    if (!downloadConfig) downloadConfig = {};
    const value = {value: text.key, name: text.name ? text.name : Ut.randomUUID()};
    return (<a href={value.name} onClick={(event) => {
        event.preventDefault();
        const link = Ut.formatExpr(downloadConfig.ajax, value);
        Ajax.ajaxDownload(link, value, {})
            .then(data => saveAs(data, value.name));
    }}>{downloadConfig.flag ? downloadConfig.flag : value.name}</a>);
};

const aiCellDownload = (reference, config) => (text) => {
    // 上传时作了序列化，所以下载时要做反向处理
    text = JSON.parse(text);
    if (U.isArray(text)) {
        return (
            <ul>
                {text.map(each => <li>{_aiCellSingle(reference, config, each)}</li>)}
            </ul>
        );
    } else return _aiCellSingle(reference, config, text);
};
const initEmpty = () => {
    return Aid.initEmpty();
};
export default {
    // ---- LOGICAL
    LOGICAL: Aid.jsxConnect(
        initEmpty,
        Aid.cellLogical,
        (attrs = {}) => Aid.jsxIcon(attrs)
    ),
    PERCENT: Aid.jsxConnect(
        initEmpty,
        Aid.cellPercent,
        Aid.jsxSpan,
    ),
    DATE: Aid.jsxConnect(
        initEmpty,
        Aid.cellDate,
        Aid.jsxSpan,
    ),
    USER: Aid.jsxConnect(
        initEmpty,
        Aid.cellUser,
        Aid.jsxUser,
    ),
    CURRENCY: Aid.jsxConnect(
        initEmpty,
        Aid.cellCurrency,
        Aid.jsxSpan,
    ),
    EXPRESSION: Aid.jsxConnect(
        initEmpty,
        Aid.cellExpr,
        Aid.jsxSpan,
    ),
    MAPPING: Aid.jsxConnect(
        initEmpty,
        Aid.cellMapping,
        (attrs = {}, children = {}) => {
            return attrs.icon ?
                Aid.jsxIcon(attrs.icon) :
                Aid.jsxSpan(attrs, children);
        }
    ),
    HYPERLINK: Aid.jsxConnect(
        initEmpty,
        Aid.cellHyper,
        (attrs = {}, children = "") => {
            console.info(attrs, children);
            return false;
        }
    ),
    ICON: Aid.jsxConnect(
        initEmpty,
        Aid.cellIcon,
        (attrs = {}, children = "") => (
            <span>
                {attrs.icon ? <Icon style={attrs.style} type={attrs.icon}/> : false}
                {attrs.icon ? <span>&nbsp;&nbsp;</span> : false}
                {children}
            </span>
        )
    ),
    TEXT: Aid.jsxConnect(
        initEmpty,
        Aid.cellText,
        Aid.jsxText,
    ),
    DATUM: Aid.jsxConnect(
        initEmpty,
        Aid.cellDatum,
        Aid.jsxSpan,
    ),
    DOWNLOAD: aiCellDownload,
    ...CellOp,
};
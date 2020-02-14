import Value from "../../abyss";
import {Icon} from "antd";
import React from "react";
import U from 'underscore';

const getCondition = (reference, field, values = []) => {
    let {$condition = {}} = reference.state ? reference.state : {};
    $condition = Value.clone($condition);
    $condition[field] = values;
    return $condition;
};
const isFiltered = (reference, field) => {
    const {$condition = {}} = reference.state ? reference.state : {};
    let filtered = false;
    if ($condition.hasOwnProperty(field)) {
        const value = $condition[field];
        if (U.isArray(value)) {
            filtered = (0 < value.length);
        }
    }
    return filtered;
};

const getFilteredValue = (reference, column) => {
    const {$condition = {}} = reference.state ? reference.state : {};
    if ($condition.hasOwnProperty(column.dataIndex)) {
        return $condition[column.dataIndex];
    } else {
        return [];
    }
};
const getFilterIcon = (reference, field, type) => () => {
    const attrs = {};
    if (isFiltered(reference, field)) {
        attrs.style = {color: "#1890ff"};
    } else {
        attrs.style = {};
    }
    return (
        <Icon type={type}
              {...attrs}/>
    );
};
const getClearAttrs = (reference, field, {
    clearFilters, selectedKeys = [], onClear
}) => {
    const clearAttrs = {};
    if (0 === selectedKeys.length) {
        clearAttrs.disabled = true;
    } else {
        clearAttrs.onClick = onClear(reference, field, clearFilters);
    }
    return clearAttrs;
};
export default {
    getCondition,
    getFilteredValue,
    getFilterIcon,
    getClearAttrs,
    isFiltered
};
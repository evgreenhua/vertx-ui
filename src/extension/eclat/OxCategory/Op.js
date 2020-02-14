import Ux from "ux";
import U from 'underscore';
import {Dsl} from "entity";

const onSelect = (reference) => (input = []) => {
    const {data = [], config = {}} = reference.props;
    /*
     * Here must exist the value for processing
     */
    if (0 < input.length) {
        const {ui: {tree}} = config;
        const $data = Ux.toTreeArray(data, tree);
        const dataEvent = Dsl.getEvent($data)     // 设置 source
            .start(input)       // 设置 input
            .config(config);    // 设置 config
        const {onSelect} = reference.state;
        // 必须
        Ux.activeSearch();
        if (U.isFunction(onSelect)) {
            onSelect(dataEvent)
        } else {
            console.warn("[ Ox ] onSelect 函数未传入", onSelect);
        }
    }
};

export default {
    onSelect
}
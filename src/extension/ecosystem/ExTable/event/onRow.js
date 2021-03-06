import Ux from 'ux';
import U from 'underscore';
import fnDelete from "./fnDelete";
import fnEdit from "./fnEdit";

const Event = {fnDelete, fnEdit};

export default (reference, row = {}) => (record) => {
    const result = {};
    const events = Ux.configExecutor(reference, Event);
    Ux.itObject(row, (event, target) => {
        const executor = events[target];
        if (U.isFunction(executor)) {
            result[event] = event => {
                Ux.prevent(event);
                executor(record.key, record, {
                    config: Ux.clone(row),
                    reference
                });
            }
        }
    });
    return result;
};
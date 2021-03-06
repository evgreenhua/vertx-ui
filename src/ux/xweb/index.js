import Common from './O.common';
import Rx from './O.render';
import Lazy from './O.lazy';
import Table from './O.table';
import Editor from './O.editor';

export default {
    ...Editor,
    ...Table,
    ...Common,
    ...Rx,
    // 新版本重置
    ...Lazy,
};
import form from './form';
import dialog from './dialog';
import init from './init';
import bind from './bind';
import relation from './relation';
import Job from './job';
import Api from './api';

export default {
    /*
     * 表单提交
     */
    form,
    dialog,
    init,
    ...Job,
    ...Api,

    ...relation,
    ...bind,
}
import random from './O.random';
import html from './O.html';
import expression from './O.format';
import store from './O.store';
import ambient from './O.ambient';
import encrypt from './O.encrypt';
import sign from './O.sign';
import connect from './O.connect';
import sorter from './O.sorter';
import redux from './O.redux';
import math from './O.math';

import tree from './O.tree';

import antForm from './O.ant.form';
import antSubmit from './O.ant.submit';

import pluginElement from './O.plugin.element';

export default {
    ...random,
    ...html,
    ...expression,
    ...store,
    ...ambient,
    ...encrypt,
    ...sign,
    ...connect,
    ...sorter,
    ...redux,
    ...math,

    ...tree,

    ...antSubmit,
    ...antForm,

    ...pluginElement,
}
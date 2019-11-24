import Ux from 'ux';

const _seekComponent = (attrs = {}, control = {}) => {
    const {
        componentConfig = {},
        componentData = "",
        componentName = "",
    } = control;
    attrs.config = Ux.clone(componentConfig);
    attrs.source = componentData;
    attrs.key = control.key;
    attrs.pageId = control['pageId'];
    attrs.name = componentName;
};
const _seekContainer = (attrs = {}, control = {}, componentType) => {
    const {containerConfig, containerName} = control;
    if (containerName) {
        // attrs.name = containerName;
        // 名字只可以有一个，否则会出现 container 覆盖 component 原始的名字导致渲染不正常
        attrs.container = {
            name: containerName,
            config: containerConfig ? containerConfig : {},
            // For $metadata generation
            key: control.key,
            pageId: control['pageId'],
            componentType,
        };
    }
};
export default (control = {}) => {
    const attrs = {};
    const {type = "COMPONENT", sign = ""} = control;
    if (!sign || 64 !== sign.length) {
        // console.error("[ Ex ] 使用的 Ox 组件签名不合法，请检查签名信息！", sign, sign ? sign.length : null);
    }
    /*
     * 第一层解析，解析 component，这是必须的
     */
    const $component = Ux.immutable(["LIST", "FORM", "COMPONENT"]);
    if ("CONTAINER" === type) {
        /*
         * 容器配置，这种情况下，只有 container 节点，没有其他节点
         * component 节点没有
         */
        _seekContainer(attrs, control, type);
        if (!attrs.container) {
            throw new Error("[ Ex ] 由于 type = CONTAINER，必须包含 containerName！");
        }
        /* 表示只有 container 容器，不包含 component */
        attrs.isContainer = true;
    } else if ($component.contains(type)) {
        /*
         * LIST / COMPONENT / FORM
         * 容器（可选）
         * 注意顺序，这里需要
         * 1）先处理 container 级别的配置
         * 2）再处理 component 级别的配置，最终这里需要执行覆盖
         */
        _seekContainer(attrs, control, type);   // 加入 type 作为 component 类型
        _seekComponent(attrs, control);
    } else {
        throw new Error(`[ Ex ] 使用了不支持的类型：type = ${type}`);
    }
    return attrs;
}
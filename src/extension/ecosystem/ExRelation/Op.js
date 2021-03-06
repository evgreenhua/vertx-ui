import Ux from 'ux';
import Ex from 'ex';
import Yo from './Op.Yo';

const yiPage = (reference) => {
    const {config = {}, data = {}} = reference.props;
    const state = {};
    const $config = Ux.clone(config);
    const header = Ux.fromHoc(reference, "header");
    if (header) {
        $config.header = Ux.clone(header);
    }
    /*
     * 设置函数用于处理数据
     */
    state.$config = $config;
    state.$ready = true;
    state.$data = Ux.clone(data);
    /*
     * 是否带有定义，如果带有定义则需要计算 identifiers （按定义计算，只计算一次）
     */
    if (config.hasOwnProperty("relation")) {
        const {definition = false, source = ""} = config.relation;
        if (definition && source) {
            let categoryArray = Ux.onDatum(reference, source);
            const {current = {}, $definition = []} = reference.props;
            if (0 < categoryArray.length && 0 < $definition.length) {
                const $defineArray = [];
                const $defineMap = Ex.onRelationIdentifiers(current.identifier, categoryArray, $definition);
                if ($defineMap.up) {
                    $defineMap.up.forEach(identifier => $defineArray.push(identifier));
                }
                if ($defineMap.down) {
                    $defineMap.down.forEach(identifier => $defineArray.push(identifier));
                }
                state.$defineArray = $defineArray;
                state.$defineMap = $defineMap;
            }
        }
    }
    reference.setState(state);
};
export default {
    ...Yo,
    yiPage
}
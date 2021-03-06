import Ux from "ux";
import {Dsl} from 'entity';

export default {
    onRowRemove: (reference, key) => (event) => {
        Ux.prevent(event);
        let {data = []} = reference.state;
        data = Ux.clone(data);
        data = data.filter(item => key !== item.key);
        reference.setState({data});
        /*
         * 直接提交，调 onSubmit
         */
        const {$changeCascade = true} = reference.props;
        if ($changeCascade) {
            Ux.fn(reference).onChange(data);
        }
    },
    onChange: (reference) => (params = {}) => {
        if (params.name) {
            const $params = Ux.clone(params);
            const {data = []} = reference.state;
            const dataArray = Dsl.getArray(data);
            dataArray.saveElement($params, 'name');
            const $data = dataArray.to();
            reference.setState({data: $data});
            /*
             * 直接提交，调 onSubmit
             */
            const {$changeCascade = true} = reference.props;
            if ($changeCascade) {
                Ux.fn(reference).onChange($data);
            }
        }
    },
    onSubmit: (reference) => (event = {}) => {
        Ux.prevent(event);
        const {data = []} = reference.state;
        /*
         * 生成 magic 格式
         */
        Ux.fn(reference).onChange(data);
    },
    actions: {
        $opSaveParam: (reference) => (params = {}) => {
            /* 重设表单 */
            Ux.formReset(reference);
            /* 父引用更新 */
            reference.setState({
                $loading: false,        // 加载
                $submitting: false      // 提交
            });
            /* 调用父类 onChange */
            Ux.fn(reference).onChange(params);
        }
    }
}
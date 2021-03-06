import React from 'react';
import Ex from 'ex';
import Ux from 'ux';
import Op from './Op';
import Rdr from './render';
import U from 'underscore';
import renderJsx from './Web.jsx';

/*
 * 表格专用
 */

class Component extends React.PureComponent {
    state = {
        $table: {},
        $query: {},
        $stateSorter: true,     // 排序修改成可控
        $ready: false,
        // $loading: false,        // 表格内 loading 处理，是否加载数据
    };

    componentDidMount() {
        Op.yiTable(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        Op.yuTable(this, {prevProps, prevState});
    }

    render() {
        // console.info(this.props.$query);
        return Ex.yoRender(this, () => {
            const {$table = {}, $data = {}, $loading = false} = this.state;
            /*
             * （必须动态，执行列选择）处理 columns
             */
            const {config = {}} = this.props;
            const $columns = config.columns ? config.columns : [];
            $table.columns = Rdr.renderColumn(this, $columns);
            /*
             * （必须结合数据）分页组件
             */
            $table.pagination = Rdr.renderPager(this, $data);
            /*
             * 选中项处理
             */
            const rowSelection = Rdr.renderSelection(this);
            if (rowSelection) {
                $table.rowSelection = rowSelection;
            }
            /*
             * 加载效果
             */
            $table.loading = $loading;
            const data = U.isArray($data.list) ? $data.list : [];
            /*
             * 修改 x
             */
            Ux.configScroll($table, data, this);
            return renderJsx(this, {
                table: Ux.clone($table),
                data
            });
        }, Ex.parserOfColor("ExTable").private());
    }
}

export default Component;
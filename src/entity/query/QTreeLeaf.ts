import QTreeNode from './QTreeNode';
import Ux from 'ux';

class QTreeLeaf implements QTreeNode {
    private isValid: Boolean = false;
    private field: String = "";
    private value: any;
    private op: String = "";

    /*
     * 构造该节点
     */
    constructor(field: String, value: any) {
        if (field && value) {
            const fieldData = Ux.parseField(field);
            this.field = fieldData.field;
            this.op = fieldData.op;
            this.value = value;
            this.isValid = true;
        } else {
            throw new Error("[ Qr ] 传入的 `field` 或 `value` 不可为 null！");
        }
    }

    /*
     * 返回
     * {
     *     "field": "value"
     * }
     */
    to() {
        const kv: any = {};
        if ("__DELETE__" !== this.value) {
            kv[`${this.field},${this.op}`] = this.value;
        }
        return kv;
    }

    leaf() {
        return true;
    }

    valid() {
        return this.isValid;
    }

    /*
     * 两个叶子节点是否相同
     */
    isSame(node: QTreeLeaf, isFull: Boolean = false): boolean {
        if (this.isValid) {
            const fieldCur = `${this.field},${this.op}`;
            const fieldIn = `${node.field},${node.op}`;
            /* 条件检查 */
            const sameCond = fieldCur === fieldIn;
            if (isFull) {
                if (sameCond) {
                    /* 检查值 */
                    const valueCur = this.value;
                    const valueIn = node.value;
                    return valueCur === valueIn;
                } else return false;
            } else return sameCond;
        } else return false;
    }

    saveNode(node: QTreeLeaf): QTreeLeaf {
        this.isValid = node.isValid;
        this.op = node.op;
        this.field = node.field;
        this.value = node.value;
        return this;
    }
}

export default QTreeLeaf;
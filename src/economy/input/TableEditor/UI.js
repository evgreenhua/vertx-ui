import React from 'react';

class Component extends React.PureComponent {
    render() {
        console.info(this.props);
        return (
            <div>
                Tpl
            </div>
        )
    }
}

export default Component
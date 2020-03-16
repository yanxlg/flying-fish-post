import React from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import { Bind, Debounce } from 'lodash-decorators';

declare interface IFitTableState {
    y?: number;
}

declare interface IFitTableProps<T> extends TableProps<T> {
    bottom?: number;
    minHeight?: number;
}

class FitTable<T extends object> extends React.PureComponent<IFitTableProps<T>, IFitTableState> {
    constructor(props: TableProps<T>) {
        super(props);
        this.state = {
            y: undefined,
        };
    }

    componentDidMount(): void {
        // 计算高度
        this.resizeHeight();
        window.addEventListener('resize', this.resizeHeight);
    }
    componentWillUnmount(): void {
        window.removeEventListener('resize', this.resizeHeight);
    }
    @Bind
    @Debounce(300)
    private resizeHeight() {
        const el = ReactDOM.findDOMNode(this) as Element;
        const { bottom = 0, minHeight } = this.props;
        const height = document.body.offsetHeight - el.getBoundingClientRect().top - bottom;
        if ((!minHeight || height >= minHeight) && height > 0) {
            this.setState({
                y: height,
            });
        } else if (minHeight) {
            this.setState({
                y: minHeight,
            });
        }
    }

    render() {
        const { scroll, ...props } = this.props;
        const { y } = this.state;
        return <Table<T> {...props} scroll={{ ...scroll, y: y }} />;
    }
}

export { FitTable };
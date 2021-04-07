import React from 'react';
import { withRouter } from 'react-router';

const PathContext = React.createContext();

@withRouter
class PathProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            last: null,
            current: null,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.setState({
                last: prevProps.location,
                current: this.props.location,
            });
        }
    }

    render() {
        return (
            <PathContext.Provider value={this.state}>
                {this.props.children}
            </PathContext.Provider>
        );
    }
}

export { PathContext, PathProvider };
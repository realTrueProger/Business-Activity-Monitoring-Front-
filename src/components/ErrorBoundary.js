/*eslint-disable react/prop-types*/
import React from "react";
import TableView from "./TableView";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <TableView />;
        }

        return this.props.children;
    }
}
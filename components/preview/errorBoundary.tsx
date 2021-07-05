import { Component, ErrorInfo } from 'react';

import { MDXRemoteSerializeResult } from 'next-mdx-remote';

interface State {
  error?: Error;
  errorInfo?: ErrorInfo;
  hasError: boolean;
}

export default class ErrorBoundary extends Component<{ content: MDXRemoteSerializeResult }, State> {
  state = {
    hasError: false,
    error: undefined,
    errorInfo: undefined,
  };

  constructor(props) {
    super(props);
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo, hasError: true });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content) {
      this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={'errorOverlay'}>
          <h1>Oops, something went wrong</h1>

          <p>
            <div className={'error'}>{this.state.error.message}</div>
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

import React, { ErrorInfo } from "react";
import Button from "../components/Button";
import { IconRefresh } from "../icons";
import Img from "../components/Img/Img";
import { AssetNotFound } from "../assets";
import Sentry from "@sentry/react";

interface IErrorBoundaryProps {
  readonly children: JSX.Element | JSX.Element[];
}

interface IErrorBoundaryState {
  readonly error?: Error;
  readonly errorInfo?: ErrorInfo;
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {};
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    const { error, errorInfo } = this.state;
    const onClick = () => {
      window.location.reload();
    };
    if (!errorInfo) {
      return this.props.children;
    }

    let message = null;
    if (process.env.NODE_ENV === "development") {
      message = (
        <details className="preserve-space">
          {error && error.toString()}
          <br />
          {errorInfo.componentStack}
        </details>
      );
    } else {
      Sentry.captureException(`${error} - ${errorInfo.componentStack}`);
    }

    return (
      <div className="flex flex-col text-white">
        <div className="w-full max-w-[1118px] m-auto">
          <div className="border-x border-gray py-16 px-10 flex items-center justify-between" style={{ minHeight: "calc(100vh - 104px)" }}>
            <div className="w-[480px]">
              <h2 className="text-h2 text-white">Something went wrong!</h2>
              <div className="body-medium text-gray-light mt-4">Hang on till we get the error fixed. We appreciate your patience.</div>
              {message && <div className="body-small">{message}</div>}
              <div className="mt-12">
                <Button className="btn-primary" onClick={onClick}>
                  Refresh
                  <IconRefresh />
                </Button>
              </div>
            </div>
            <Img src={AssetNotFound} />
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;

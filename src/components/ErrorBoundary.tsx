import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error ke Sentry atau service monitoring lainnya
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
          <div className="max-w-md w-full space-y-8 text-center">
            <div className="flex justify-center">
              <AlertCircle className="h-16 w-16 text-red-500" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
              Oops! Terjadi Kesalahan
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Maaf, terjadi kesalahan yang tidak terduga. Tim kami telah diberitahu dan sedang menangani masalah ini.
            </p>
            <div className="mt-6 space-y-4">
              <Button
                onClick={() => window.location.reload()}
                className="w-full"
                variant="outline"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Muat Ulang Halaman
              </Button>
              <Button
                onClick={() => window.location.href = '/'}
                className="w-full"
              >
                <Home className="mr-2 h-4 w-4" />
                Kembali ke Beranda
              </Button>
            </div>
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Error Details (Development Only):
                </h3>
                <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-auto">
                  {this.state.error?.toString()}
                  {'\n'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 
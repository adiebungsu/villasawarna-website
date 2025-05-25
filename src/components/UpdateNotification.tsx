import { motion, AnimatePresence } from 'framer-motion';
import { useServiceWorker } from '../hooks/useServiceWorker';

interface UpdateNotificationProps {
  onUpdate: () => Promise<void>;
}

export function UpdateNotification({ onUpdate }: UpdateNotificationProps) {
  const { isWaiting } = useServiceWorker();

  return (
    <AnimatePresence>
      {isWaiting && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm z-50"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-coral/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-coral"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Versi Baru Tersedia
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Versi baru dari aplikasi telah tersedia. Perbarui sekarang untuk mendapatkan fitur terbaru.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={onUpdate}
                  className="flex-1 bg-coral text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-coral/90 transition-colors"
                >
                  Perbarui Sekarang
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Nanti
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 
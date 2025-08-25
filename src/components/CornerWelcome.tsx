import React, { useEffect, useRef, useMemo } from 'react';
import { X } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

interface CornerWelcomeProps {
	isOpen: boolean;
	onClose: () => void;
	userName?: string;
}

const CornerWelcome: React.FC<CornerWelcomeProps> = ({ isOpen, onClose, userName }) => {
	const closeBtnRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (isOpen) closeBtnRef.current?.focus();
	}, [isOpen]);

	const monthNameId = useMemo(() => {
		const months = [
			'januari', 'februari', 'maret', 'april', 'mei', 'juni',
			'juli', 'agustus', 'september', 'oktober', 'november', 'desember'
		];
		return months[new Date().getMonth()];
	}, []);

	const greetingName = (() => {
		if (!userName || userName.trim().length === 0) return 'Teman';
		const first = userName.trim().split(/\s+/)[0];
		return first;
	})();

	return (
		<div
			className={cn(
				"fixed z-[140] right-4 top-4 sm:right-6 sm:top-auto sm:bottom-6 transition-all duration-300",
				isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
			)}
			role="dialog"
			aria-modal="true"
			aria-labelledby="corner-welcome-title"
		>
			<div className="relative w-72 sm:w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden">
				<button
					ref={closeBtnRef}
					className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
					onClick={onClose}
					aria-label="Tutup popup"
				>
					<X className="w-4 h-4" />
				</button>

				<div className="flex items-center gap-3 p-3 border-b border-gray-100 dark:border-gray-800">
					<OptimizedImage
						src="/images/vislogo.png"
						alt="Villa Sawarna"
						className="w-8 h-8 object-contain"
						width={32}
						height={32}
						quality={85}
					/>
					<h3 id="corner-welcome-title" className="text-sm font-semibold text-gray-900 dark:text-white">Rekomendasi Bulanan</h3>
				</div>

				<div className="p-3">
					<p className="text-sm text-gray-800 dark:text-gray-100 leading-snug">
						<span className="font-semibold">Hai {greetingName}</span>! Bulan <span className="font-semibold capitalize">{monthNameId}</span> cocok banget jika liburan ke <span className="font-semibold">Legon Pari</span>, cek sini yuk!
					</p>

					<div className="mt-3 flex items-center gap-3 rounded-lg bg-gradient-to-r from-ocean/10 to-coral/10 dark:from-ocean/20 dark:to-coral/20 p-3">
						<OptimizedImage
							src="/images/penginapan-sawarna.webp"
							alt="Penginapan Legon Pari"
							className="w-12 h-12 rounded-md object-cover"
							width={48}
							height={48}
							quality={85}
						/>
						<div className="flex-1">
							<p className="text-xs text-gray-700 dark:text-gray-200">Lihat penginapan pilihan di Legon Pari.</p>
							<div className="mt-2">
								<Link to="/villas?location=legon-pari" className="inline-flex items-center text-xs px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700">
									Cek Penginapan
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CornerWelcome;

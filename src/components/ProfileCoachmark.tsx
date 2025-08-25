import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

interface ProfileCoachmarkProps {
	isOpen: boolean;
	onClose: () => void;
	targetSelector?: string;
	isLoggedIn?: boolean;
}

const ESTIMATED_WIDTH = 280; // estimasi lebar bubble
const ESTIMATED_HEIGHT = 150; // estimasi tinggi bubble

const ProfileCoachmark: React.FC<ProfileCoachmarkProps> = ({ isOpen, onClose, targetSelector = '#nav-profile-link', isLoggedIn }) => {
	const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (!isOpen) return;
		const updatePosition = () => {
			const target = document.querySelector(targetSelector) as HTMLElement | null;
			const vw = window.innerWidth;
			const vh = window.innerHeight;
			const scrollX = window.scrollX;
			const scrollY = window.scrollY;
			const safeTop = 72; // offset aman di bawah navbar atas
			const margin = 16;

			if (!target) {
				// Fallback di pojok kanan atas (di bawah navbar)
				const leftFallback = Math.max(margin, scrollX + vw - ESTIMATED_WIDTH - margin);
				setPosition({ top: scrollY + safeTop, left: leftFallback });
				return;
			}
			const rect = target.getBoundingClientRect();

			// Prefer letakkan di bawah target
			let proposedTop = scrollY + rect.bottom + 8;
			let placeAbove = false;
			if (proposedTop + ESTIMATED_HEIGHT > scrollY + vh - margin) {
				// Tidak muat di bawah, letakkan di atas target
				placeAbove = true;
			}

			let top = placeAbove
				? Math.max(scrollY + safeTop, scrollY + rect.top - ESTIMATED_HEIGHT - 8)
				: Math.max(scrollY + safeTop, proposedTop);

			let left = scrollX + rect.right - ESTIMATED_WIDTH;
			left = Math.min(left, scrollX + vw - ESTIMATED_WIDTH - margin);
			left = Math.max(left, scrollX + margin);

			setPosition({ top, left });
		};
		updatePosition();
		window.addEventListener('resize', updatePosition);
		window.addEventListener('scroll', updatePosition, { passive: true });
		return () => {
			window.removeEventListener('resize', updatePosition);
			window.removeEventListener('scroll', updatePosition as any);
		};
	}, [isOpen, targetSelector]);

	if (!isOpen) return null;

	return (
		<div className="pointer-events-none fixed inset-0 z-[10000]">
			<div
				ref={containerRef}
				className={cn(
					"absolute max-w-xs sm:max-w-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-3 sm:p-4 pointer-events-auto",
					"transition-opacity duration-200",
					isOpen ? 'opacity-100' : 'opacity-0'
				)}
				style={{ top: (position?.top ?? 16), left: (position?.left ?? 16) }}
			>
				<button
					className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
					onClick={onClose}
					aria-label="Tutup coachmark"
				>
					<X className="w-4 h-4" />
				</button>
				<div className="text-sm text-gray-900 dark:text-gray-100 font-semibold mb-1">Masuk untuk pengalaman lebih baik</div>
				<p className="text-xs text-gray-700 dark:text-gray-300 mb-3">
					Login untuk menyimpan favorit, histori pencarian, dan rekomendasi personal.
				</p>
				<div className="flex gap-2">
					{!isLoggedIn && (
						<Link to="/login" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-blue-600 text-white text-xs hover:bg-blue-700">
							Masuk sekarang <ArrowRight className="w-3 h-3" />
						</Link>
					)}
					<Link to="/about" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-blue-600 text-blue-600 text-xs hover:bg-blue-50 dark:hover:bg-blue-900/20">
						Pelajari manfaat
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProfileCoachmark;

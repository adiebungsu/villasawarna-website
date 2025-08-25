import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TourStep {
	id: string;
	targetSelector: string;
	title: string;
	description: string;
}

interface DashboardTourProps {
	isOpen: boolean;
	onClose: () => void;
	steps: TourStep[];
}

const ESTIMATED_WIDTH = 300;
const ESTIMATED_HEIGHT = 160;

const DashboardTour: React.FC<DashboardTourProps> = ({ isOpen, onClose, steps }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
	const [placement, setPlacement] = useState<'above' | 'below'>('below');
	const overlayRef = useRef<HTMLDivElement>(null);

	const currentStep = useMemo(() => steps[currentIndex], [steps, currentIndex]);

	useLayoutEffect(() => {
		if (!isOpen) return;
		const updatePosition = () => {
			const target = document.querySelector(currentStep?.targetSelector) as HTMLElement | null;
			if (!target) {
				setPosition({ top: 80, left: window.innerWidth - Math.min(ESTIMATED_WIDTH + 24, window.innerWidth - 16) - 12 });
				setPlacement('below');
				return;
			}
			const rect = target.getBoundingClientRect();
			const scrollY = window.scrollY || document.documentElement.scrollTop;
			const scrollX = window.scrollX || document.documentElement.scrollLeft;

			const preferBelow = rect.bottom + ESTIMATED_HEIGHT + 16 <= window.innerHeight;
			setPlacement(preferBelow ? 'below' : 'above');

			const top = (preferBelow ? rect.bottom + 10 : rect.top - ESTIMATED_HEIGHT - 10) + scrollY;
			let left = rect.left + scrollX + Math.max(0, rect.width / 2 - ESTIMATED_WIDTH / 2);
			left = Math.max(12, Math.min(left, scrollX + window.innerWidth - ESTIMATED_WIDTH - 12));
			setPosition({ top, left });
		};

		updatePosition();
		const obs = new ResizeObserver(updatePosition);
		obs.observe(document.body);
		window.addEventListener('resize', updatePosition);
		window.addEventListener('scroll', updatePosition, { passive: true });
		return () => {
			obs.disconnect();
			window.removeEventListener('resize', updatePosition);
			window.removeEventListener('scroll', updatePosition);
		};
	}, [isOpen, currentStep]);

	useEffect(() => {
		if (!isOpen) return;
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
			if (e.key === 'ArrowRight') setCurrentIndex((i) => Math.min(i + 1, steps.length - 1));
			if (e.key === 'ArrowLeft') setCurrentIndex((i) => Math.max(i - 1, 0));
		};
		document.addEventListener('keydown', handleKey);
		return () => document.removeEventListener('keydown', handleKey);
	}, [isOpen, steps.length, onClose]);

	if (!isOpen) return null;

	return (
		<div ref={overlayRef} className="fixed inset-0 z-[150]">
			{/* Backdrop */}
			<div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" onClick={onClose} />

			{/* Bubble */}
			<div
				className={cn(
					"fixed left-4 top-6 sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-[88vw] max-w-[320px] sm:max-w-[360px] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200/80 dark:border-gray-700/60",
					"animate-in fade-in-0 zoom-in-95 duration-200"
				)}
				style={{}}
				role="dialog"
				aria-modal="true"
				aria-label="Tour Dashboard"
			>
				<div className="p-3 sm:p-4">
					<div className="flex items-start justify-between gap-3">
						<div className="min-w-0">
							<div className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate">
								{currentStep?.title}
							</div>
							<p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-snug">
								{currentStep?.description}
							</p>
						</div>
						<button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
							<X className="w-4 h-4" />
						</button>
					</div>

					<div className="mt-3 sm:mt-4 flex items-center justify-between">
						<div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
							Langkah {currentIndex + 1} dari {steps.length}
						</div>
						<div className="flex items-center gap-2">
							<button
								onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
								disabled={currentIndex === 0}
								className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border text-xs sm:text-sm disabled:opacity-40"
							>
								<ChevronLeft className="w-4 h-4" />
								Sebelumnya
							</button>
							{currentIndex < steps.length - 1 ? (
								<button
									onClick={() => setCurrentIndex((i) => Math.min(i + 1, steps.length - 1))}
									className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm"
								>
									Lanjut
									<ChevronRight className="w-4 h-4" />
								</button>
							) : (
								<button onClick={onClose} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm">
									Selesai
								</button>
							)}
						</div>
					</div>
				</div>
				</div>
			</div>
			);
		};

	export default DashboardTour;

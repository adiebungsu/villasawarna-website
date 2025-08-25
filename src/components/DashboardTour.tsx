import React, { useEffect, useLayoutEffect, useMemo, useRef, useState, useCallback } from 'react';
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
	onTabChange?: (tabValue: string) => void;
}

// Removed unused constants since positioning is now fixed

const DashboardTour: React.FC<DashboardTourProps> = ({ isOpen, onClose, steps, onTabChange }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const overlayRef = useRef<HTMLDivElement>(null);

	const currentStep = useMemo(() => steps[currentIndex], [steps, currentIndex]);

	// Function to scroll to tab element
	const scrollToTab = useCallback((targetSelector: string) => {
		const target = document.querySelector(targetSelector) as HTMLElement;
		if (target) {
			// Check if we're on mobile (screen width < 768px)
			const isMobile = window.innerWidth < 768;
			
			if (isMobile) {
				// For mobile, scroll the tab into view with smooth animation
				target.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
					inline: 'center'
				});
				
				// Add a small delay to ensure the scroll completes
				setTimeout(() => {
					// Highlight the tab briefly
					target.style.transition = 'all 0.3s ease';
					target.style.transform = 'scale(1.05)';
					target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.5)';
					
					setTimeout(() => {
						target.style.transform = 'scale(1)';
						target.style.boxShadow = '';
					}, 300);
				}, 500);
			} else {
				// For desktop, just scroll into view
				target.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest'
				});
			}
		}
	}, []);

	// Function to handle next step with auto tab switching
	const handleNextStep = useCallback(() => {
		const nextIndex = Math.min(currentIndex + 1, steps.length - 1);
		
		// Check if current step is a tab step and switch tab if needed
		if (onTabChange && currentStep?.targetSelector?.includes('tab-')) {
			const tabValue = currentStep.targetSelector.replace("[data-tour='tab-", "").replace("']", "");
			onTabChange(tabValue);
			
			// Scroll to the tab after switching
			setTimeout(() => {
				scrollToTab(currentStep.targetSelector);
			}, 100);
		}
		
		setCurrentIndex(nextIndex);
	}, [currentIndex, steps.length, currentStep, onTabChange, scrollToTab]);

	// Function to handle previous step
	const handlePrevStep = useCallback(() => {
		const prevIndex = Math.max(currentIndex - 1, 0);
		setCurrentIndex(prevIndex);
	}, [currentIndex]);

	// Removed positioning logic since popup is now always centered

	// Auto-scroll to tab when tour starts or step changes
	useEffect(() => {
		if (isOpen && currentStep?.targetSelector?.includes('tab-')) {
			// Add a delay to ensure the tab has been switched
			setTimeout(() => {
				scrollToTab(currentStep.targetSelector);
			}, 300);
		}
	}, [isOpen, currentStep, scrollToTab]);

	// Additional effect to handle mobile tab scrolling when tour is active
	useEffect(() => {
		if (isOpen && currentStep?.targetSelector?.includes('tab-')) {
			const isMobile = window.innerWidth < 768;
			if (isMobile) {
				// For mobile, also scroll the tab navigation container
				const tabNavigation = document.getElementById('mobile-tab-navigation');
				if (tabNavigation) {
					setTimeout(() => {
						tabNavigation.scrollIntoView({
							behavior: 'smooth',
							block: 'nearest'
						});
					}, 400);
				}
			}
		}
	}, [isOpen, currentStep]);

	useEffect(() => {
		if (!isOpen) return;
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
			if (e.key === 'ArrowRight') handleNextStep();
			if (e.key === 'ArrowLeft') handlePrevStep();
		};
		document.addEventListener('keydown', handleKey);
		return () => document.removeEventListener('keydown', handleKey);
	}, [isOpen, steps.length, onClose, handleNextStep, handlePrevStep]);

	if (!isOpen) return null;

	return (
		<div ref={overlayRef} className="fixed inset-0 z-[9999]">
			{/* Backdrop */}
			<div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={onClose} />

			{/* Bubble */}
			<div
				className={cn(
					"fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[88vw] max-w-[320px] sm:max-w-[360px] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200/80 dark:border-gray-700/60",
					"animate-in fade-in-0 zoom-in-95 duration-200",
					"mx-4" // Add horizontal margin for mobile
				)}
				style={{
					maxHeight: '80vh', // Ensure it doesn't exceed viewport height
					overflowY: 'auto' // Allow scrolling if content is too long
				}}
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
								onClick={handlePrevStep}
								disabled={currentIndex === 0}
								className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border text-xs sm:text-sm disabled:opacity-40"
							>
								<ChevronLeft className="w-4 h-4" />
								Sebelumnya
							</button>
							{currentIndex < steps.length - 1 ? (
								<button
									onClick={handleNextStep}
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

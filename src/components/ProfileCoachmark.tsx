import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';

interface ProfileCoachmarkProps {
	isOpen: boolean;
	onClose: () => void;
	targetSelector?: string;
	isLoggedIn?: boolean;
}

const ProfileCoachmark: React.FC<ProfileCoachmarkProps> = ({ isOpen, onClose, targetSelector = '#nav-profile-link', isLoggedIn }) => {
	const containerRef = useRef<HTMLDivElement>(null);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 md:p-4">
			<div
				ref={containerRef}
				className={cn(
					"relative w-full max-w-xs md:max-w-sm lg:max-w-md border-2 border-blue-200 dark:border-blue-700/50 rounded-xl md:rounded-2xl shadow-2xl text-center transform transition-all duration-300 ease-out overflow-hidden",
					"transition-all duration-300 transform",
					isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
				)}
			>
				{/* Background Image */}
				<div className="absolute inset-0 z-0">
					<OptimizedImage
						src="/images/karang-bereum-sawarna-2.webp"
						alt="Karang Bereum Sawarna Background"
						className="w-full h-full object-cover"
						quality={80}
						sizes="(max-width: 768px) 100vw, 400px"
						width={400}
						height={600}
					/>
				</div>
				
				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-br from-white/95 via-blue-50/90 to-white/95 dark:from-gray-900/95 dark:via-blue-950/90 dark:to-gray-900/95 z-10"></div>
				
				{/* Background decorative elements */}
				<div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full opacity-50 z-20"></div>
				<div className="absolute -bottom-8 -left-8 w-16 h-16 bg-blue-50 dark:bg-blue-800/20 rounded-full opacity-40 z-20"></div>
				
				{/* Close Button - Fixed positioning and styling */}
				<button
					className="absolute top-6 right-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-full p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200 shadow-lg z-[60]"
					onClick={onClose}
					aria-label="Tutup coachmark"
				>
					<X className="h-4 w-4" />
				</button>

				{/* Modal Content */}
				<div className="px-4 py-4 md:px-6 md:py-6 relative z-30">
					{/* Header dengan Logo */}
					<div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4 pb-2 md:pb-3 border-b-2 border-blue-100 dark:border-blue-800/50 relative">
						<div className="relative">
							<OptimizedImage
								src="/images/vislogo.png"
								alt="VillaSawarna Logo"
								className="h-8 md:h-12 w-auto drop-shadow-sm"
								quality={90}
								height={48}
								width={120}
							/>
						</div>
						<div className="text-left">
							<h3 className="text-sm md:text-lg font-bold text-gray-900 dark:text-white leading-tight">
								VillaSawarna
							</h3>
							<p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
								Official Website
							</p>
						</div>
					</div>

					{/* Content */}
					<div className="mb-4 md:mb-6">
						<h4 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3 flex items-center gap-2">
							<span className="text-2xl md:text-3xl">🌟</span>
							Masuk untuk pengalaman lebih baik
						</h4>
						<p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
							Login untuk menyimpan favorit, histori pencarian, dan rekomendasi personal yang disesuaikan dengan preferensi Anda.
						</p>

						{/* Benefits List dengan icons */}
						<div className="space-y-2 mb-4 p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
							<div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
								<div className="w-2 h-2 bg-red-400 rounded-full"></div>
								<span>Simpan villa favorit Anda</span>
							</div>
							<div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
								<div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
								<span>Rekomendasi personal</span>
							</div>
							<div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
								<div className="w-2 h-2 bg-blue-400 rounded-full"></div>
								<span>Histori pencarian</span>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-col gap-2">
						{!isLoggedIn && (
							<Link 
								to="/login" 
								className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
							>
								<span className="text-lg">⭐</span>
								Masuk sekarang
								<ArrowRight className="w-4 h-4" />
							</Link>
						)}
						<Link 
							to="/about" 
							className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-blue-600 text-blue-600 dark:text-blue-400 text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
						>
							Pelajari manfaat lengkap
						</Link>
					</div>

					{/* Footer */}
					<div className="mt-4 pt-3 border-t border-blue-100 dark:border-blue-800/50">
						<div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
							<span>© 2024 VillaSawarna</span>
							<span className="text-blue-600 dark:text-blue-400 font-medium">
								Aman & Terpercaya
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileCoachmark;

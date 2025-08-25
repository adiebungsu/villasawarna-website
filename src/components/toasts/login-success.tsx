import React from 'react';
import { toast } from '@/components/ui/use-toast';
import { CheckCircle, Sparkles, Star, Heart, Zap } from 'lucide-react';

interface ShowLoginSuccessToastParams {
	name?: string | null;
}

export function showLoginSuccessToast({ name }: ShowLoginSuccessToastParams = {}) {
	const firstName = name ? name.trim().split(/\s+/)[0] : undefined;
	
	toast({
		title: (
			<div className="flex items-start gap-2 sm:gap-3 animate-in slide-in-from-top-2 duration-300">
				<div className="relative flex-shrink-0">
					<CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mt-0.5 animate-pulse" />
					<Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400 absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 animate-bounce" />
				</div>
				<div className="flex-1 min-w-0">
					<div className="text-base sm:text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
						Login berhasil! 🎉
					</div>
					<div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-0.5 sm:mt-1">
						{firstName ? `Selamat datang kembali, ${firstName}!` : 'Selamat datang kembali!'}
					</div>
				</div>
			</div>
		) as unknown as string,
		description: (
			<div className="mt-2 sm:mt-3">
				<div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-100 dark:border-blue-800/50">
					<div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
						<Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0" />
						<span className="text-xs sm:text-sm font-semibold text-blue-900 dark:text-blue-100">
							Manfaat yang bisa Anda nikmati:
						</span>
					</div>
					<div className="space-y-1.5 sm:space-y-2">
						<div className="flex items-center gap-1.5 sm:gap-2 text-xs text-blue-800 dark:text-blue-200">
							<Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-500 flex-shrink-0" />
							<span className="leading-tight">Simpan favorit dan histori pencarian</span>
						</div>
						<div className="flex items-center gap-1.5 sm:gap-2 text-xs text-blue-800 dark:text-blue-200">
							<Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-500 flex-shrink-0" />
							<span className="leading-tight">Dapatkan rekomendasi yang dipersonalisasi</span>
						</div>
						<div className="flex items-center gap-1.5 sm:gap-2 text-xs text-blue-800 dark:text-blue-200">
							<CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-500 flex-shrink-0" />
							<span className="leading-tight">Akses cepat ke dashboard Anda</span>
						</div>
					</div>
				</div>
			</div>
		) as unknown as string,
		duration: 5000, // 5 detik
	});
}

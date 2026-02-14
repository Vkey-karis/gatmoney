import React, { useState } from 'react';
import { X, CreditCard, Loader2, Check, Video, Image as ImageIcon } from 'lucide-react';
import { CREDIT_PACKAGES, IMAGE_PACKAGES } from '../services/creditManagement';

interface CreditPurchaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPurchase: (packageId: string, paymentMethod: 'paypal' | 'paystack') => Promise<void>;
    purchaseType?: 'image' | 'video';
}

const CreditPurchaseModal: React.FC<CreditPurchaseModalProps> = ({ isOpen, onClose, onPurchase, purchaseType = 'video' }) => {
    const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'paystack'>('paypal');
    const [isProcessing, setIsProcessing] = useState(false);
    const [purchaseComplete, setPurchaseComplete] = useState(false);

    if (!isOpen) return null;

    const packages = purchaseType === 'image' ? IMAGE_PACKAGES : CREDIT_PACKAGES;
    const title = purchaseType === 'image' ? 'Image Generation Credits' : 'Video Generation Credits';
    const description = purchaseType === 'image' ? 'Create more stunning visuals with Magic Photo Editor' : 'Generate more videos with Veo 3.1 Fast';
    const Icon = purchaseType === 'image' ? ImageIcon : Video;

    const handlePurchase = async () => {
        if (!selectedPackage) return;

        setIsProcessing(true);
        try {
            await onPurchase(selectedPackage, paymentMethod);
            setPurchaseComplete(true);
            setTimeout(() => {
                setPurchaseComplete(false);
                onClose();
            }, 2000);
        } catch (error) {
            console.error('Purchase failed:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border-2 border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6 rounded-t-[2rem] z-10">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-2xl bg-emerald-500/10">
                            <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                Purchase {purchaseType === 'image' ? 'Image' : 'Video'} Credits
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>

                {purchaseComplete ? (
                    <div className="p-12 text-center">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <Check className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Purchase Complete!</h3>
                        <p className="text-slate-600 dark:text-slate-400 font-bold">
                            Your credits have been added to your account.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Package Selection */}
                        <div className="p-6">
                            <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">
                                Select Package
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {packages.map((pkg: any) => (
                                    <button
                                        key={pkg.id}
                                        onClick={() => setSelectedPackage(pkg.id)}
                                        className={`relative p-6 rounded-2xl border-2 transition-all text-left ${selectedPackage === pkg.id
                                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 shadow-lg'
                                            : 'border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700'
                                            }`}
                                    >
                                        {pkg.popular && (
                                            <div className="absolute -top-2 right-4 bg-emerald-500 text-white dark:text-slate-950 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                                                Popular
                                            </div>
                                        )}
                                        <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                                            {purchaseType === 'image' ? pkg.count : pkg.seconds}{purchaseType === 'image' ? '' : 's'}
                                        </div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400 font-bold mb-3">
                                            {purchaseType === 'image' ? 'Images' : 'Video Generation'}
                                        </div>
                                        <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                                            ${pkg.price.toFixed(2)}
                                        </div>
                                        <div className="text-xs text-slate-400 font-bold mt-1">
                                            ${(pkg.price / (purchaseType === 'image' ? pkg.count : pkg.seconds)).toFixed(2)}/{purchaseType === 'image' ? 'image' : 'second'}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="p-6 border-t border-slate-200 dark:border-slate-800">
                            <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">
                                Payment Method
                            </h3>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setPaymentMethod('paypal')}
                                    className={`flex-1 p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${paymentMethod === 'paypal'
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                                        : 'border-slate-200 dark:border-slate-800 hover:border-blue-300'
                                        }`}
                                >
                                    <CreditCard className="w-5 h-5" />
                                    <span className="font-black text-sm uppercase tracking-wide">PayPal</span>
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('paystack')}
                                    className={`flex-1 p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${paymentMethod === 'paystack'
                                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/20'
                                        : 'border-slate-200 dark:border-slate-800 hover:border-teal-300'
                                        }`}
                                >
                                    <CreditCard className="w-5 h-5" />
                                    <span className="font-black text-sm uppercase tracking-wide">Paystack</span>
                                </button>
                            </div>
                        </div>

                        {/* Purchase Button */}
                        <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 rounded-b-[2rem]">
                            <button
                                onClick={handlePurchase}
                                disabled={!selectedPackage || isProcessing}
                                className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg disabled:shadow-none"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <CreditCard className="w-5 h-5" />
                                        Complete Purchase
                                    </>
                                )}
                            </button>
                            <p className="text-center text-xs text-slate-500 dark:text-slate-400 font-bold mt-3">
                                Secure payment powered by {paymentMethod === 'paypal' ? 'PayPal' : 'Paystack'}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CreditPurchaseModal;

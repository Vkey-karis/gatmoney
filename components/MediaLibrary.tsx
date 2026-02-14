import React, { useState, useEffect } from 'react';
import { Search, Filter, Play, Image as ImageIcon, X, Sparkles } from 'lucide-react';
import { supabase } from '../services/supabase';
import { MediaLibraryItem } from '../types';
import { useSubscription } from '../context/SubscriptionContext';

interface MediaLibraryProps {
    onUpgradeClick: () => void;
}

const MediaLibrary: React.FC<MediaLibraryProps> = ({ onUpgradeClick }) => {
    const { hasMediaAccess } = useSubscription();
    const [mediaItems, setMediaItems] = useState<MediaLibraryItem[]>([]);
    const [filteredItems, setFilteredItems] = useState<MediaLibraryItem[]>([]);
    const [selectedType, setSelectedType] = useState<'all' | 'image' | 'video'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState<MediaLibraryItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMediaLibrary();
    }, []);

    useEffect(() => {
        filterItems();
    }, [selectedType, searchQuery, mediaItems]);

    const loadMediaLibrary = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('media_library')
                .select('*')
                .order('is_featured', { ascending: false })
                .order('created_at', { ascending: false })
                .limit(50);

            if (error) {
                console.error('Error loading media library:', error);
                // Use sample data if database not set up yet
                setMediaItems(getSampleMediaItems());
            } else {
                setMediaItems(data || getSampleMediaItems());
            }
        } catch (error) {
            console.error('Error:', error);
            setMediaItems(getSampleMediaItems());
        } finally {
            setLoading(false);
        }
    };

    const filterItems = () => {
        let filtered = mediaItems;

        if (selectedType !== 'all') {
            filtered = filtered.filter(item => item.mediaType === selectedType);
        }

        if (searchQuery) {
            filtered = filtered.filter(item =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        setFilteredItems(filtered);
    };

    const getSampleMediaItems = (): MediaLibraryItem[] => {
        return [
            {
                id: '1',
                mediaType: 'image',
                title: 'AI-Powered Business Dashboard',
                description: 'Modern analytics dashboard with AI insights',
                prompt: 'Create a modern business analytics dashboard with AI-powered insights, dark theme, professional',
                mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
                thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
                isFeatured: true,
                tags: ['business', 'dashboard', 'analytics'],
                createdAt: new Date().toISOString(),
            },
            {
                id: '2',
                mediaType: 'video',
                title: 'Product Launch Animation',
                description: '15-second product reveal animation',
                prompt: 'Create a dynamic product launch animation with smooth transitions',
                mediaUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
                isFeatured: true,
                tags: ['product', 'animation', 'marketing'],
                createdAt: new Date().toISOString(),
            },
            {
                id: '3',
                mediaType: 'image',
                title: 'Social Media Post Design',
                description: 'Eye-catching social media graphics',
                prompt: 'Design vibrant social media post with bold typography and modern aesthetics',
                mediaUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
                thumbnailUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400',
                isFeatured: false,
                tags: ['social', 'marketing', 'design'],
                createdAt: new Date().toISOString(),
            },
        ];
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 animate-fade-in">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">
                    Media <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Showcase</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-bold text-lg">
                    Explore stunning images and videos created with our AI generation tools
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search media..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 focus:border-emerald-500 dark:focus:border-emerald-500 outline-none font-bold text-slate-900 dark:text-white transition-colors"
                    />
                </div>

                {/* Type Filter */}
                <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                    {[
                        { id: 'all', label: 'All', icon: Filter },
                        { id: 'image', label: 'Images', icon: ImageIcon },
                        { id: 'video', label: 'Videos', icon: Play },
                    ].map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => setSelectedType(filter.id as any)}
                            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${selectedType === filter.id
                                    ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-md'
                                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                                }`}
                        >
                            <filter.icon className="w-4 h-4" />
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Media Grid */}
            {loading ? (
                <div className="text-center py-20">
                    <div className="inline-block w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-slate-500 dark:text-slate-400 font-bold">Loading media...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className="group relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all cursor-pointer shadow-lg hover:shadow-2xl"
                        >
                            {/* Media Preview */}
                            <div className="aspect-video relative overflow-hidden bg-slate-200 dark:bg-slate-800">
                                {item.mediaType === 'image' ? (
                                    <img
                                        src={item.thumbnailUrl || item.mediaUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="relative w-full h-full">
                                        <img
                                            src={item.thumbnailUrl || 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=400'}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                                            <Play className="w-16 h-16 text-white drop-shadow-lg" />
                                        </div>
                                    </div>
                                )}
                                {item.isFeatured && (
                                    <div className="absolute top-3 right-3 bg-emerald-500 text-white dark:text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-1">
                                        <Sparkles className="w-3 h-3" />
                                        Featured
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <h3 className="font-black text-slate-900 dark:text-white mb-2 line-clamp-1">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-bold line-clamp-2 mb-3">
                                    {item.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {item.tags.slice(0, 3).map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Overlay CTA for Free Users */}
                            {!hasMediaAccess() && (
                                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onUpgradeClick();
                                        }}
                                        className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest shadow-lg transform hover:scale-105 transition-all"
                                    >
                                        Upgrade to Create
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {filteredItems.length === 0 && !loading && (
                <div className="text-center py-20">
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-lg">
                        No media found matching your criteria
                    </p>
                </div>
            )}

            {/* Lightbox Modal */}
            {selectedItem && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in"
                    onClick={() => setSelectedItem(null)}
                >
                    <button
                        onClick={() => setSelectedItem(null)}
                        className="absolute top-6 right-6 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>

                    <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
                        {selectedItem.mediaType === 'image' ? (
                            <img
                                src={selectedItem.mediaUrl}
                                alt={selectedItem.title}
                                className="w-full rounded-2xl shadow-2xl"
                            />
                        ) : (
                            <video
                                src={selectedItem.mediaUrl}
                                controls
                                autoPlay
                                className="w-full rounded-2xl shadow-2xl"
                            />
                        )}
                        <div className="mt-6 text-center">
                            <h3 className="text-2xl font-black text-white mb-2">{selectedItem.title}</h3>
                            <p className="text-slate-300 font-bold mb-4">{selectedItem.description}</p>
                            {selectedItem.prompt && (
                                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                                    <p className="text-sm text-slate-300 font-bold">
                                        <span className="text-emerald-400">Prompt:</span> {selectedItem.prompt}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaLibrary;

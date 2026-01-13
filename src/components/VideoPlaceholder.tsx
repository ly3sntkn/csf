import React from 'react';
import { Play } from 'lucide-react';

interface VideoPlaceholderProps {
    title?: string;
    duration?: string;
    className?: string;
}

const VideoPlaceholder: React.FC<VideoPlaceholderProps> = ({
    title = "Vidéo explicative",
    duration = "1:30",
    className = ""
}) => {
    return (
        <div className={`relative bg-gray-900 rounded-xl overflow-hidden aspect-video shadow-lg group cursor-pointer ${className}`}>
            {/* Thumbnail placeholder - dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 group-hover:scale-105 transition-transform duration-500"></div>

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                    <Play fill="white" className="text-white ml-1" size={32} />
                </div>
            </div>

            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-medium text-lg">{title}</p>
                <p className="text-gray-300 text-sm">{duration}</p>
            </div>
        </div>
    );
};

export default VideoPlaceholder;

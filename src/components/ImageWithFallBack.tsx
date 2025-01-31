import { useState } from 'react';
import Image from 'next/image';

export default function ImageWithFallback(props : any) {
    const imagePlaceholderPath = '/images/image_placeholder.png';
    const { src, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(imagePlaceholderPath);

    return (
        <Image
            {...rest}
            src={imgSrc}
            onLoad={() => {
                setImgSrc(src);
            }}
            onError={() => {
                setImgSrc(imagePlaceholderPath);
            }}
        />
    );
};

;
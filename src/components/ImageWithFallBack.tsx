import { useState } from 'react';
import Image from 'next/image';

export default function ImageWithFallback(props) {
    const imagePlaceholderPath = '/images/image_placeholder.png';
    const { src, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            {...rest}
            src={imgSrc}
            onError={() => {
                setImgSrc(imagePlaceholderPath);
            }}
        />
    );
};

;
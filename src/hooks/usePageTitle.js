import { useEffect } from 'react';

/** Sets the browser tab title: "<page> | MOLEK Schools". */
export default function usePageTitle(title) {
    useEffect(() => {
        document.title = title ? `${title} | MOLEK Schools` : 'MOLEK Schools | Secondary School in Osun, Nigeria';
    }, [title]);
}

import { useCallback, useEffect, useState } from 'react';
import { cached, clearPortalCache } from '../lib/portalData.js';

/**
 * Load once per visit and share across portal pages.
 * Returns { data, loading, error, reload }.
 */
export default function useCachedRequest(key, loader) {
    const [state, setState] = useState({ data: null, loading: Boolean(key), error: null });
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        if (!key) return undefined;
        let alive = true;
        setState((s) => ({ ...s, loading: true, error: null }));
        cached(key, loader)
            .then((data) => alive && setState({ data, loading: false, error: null }))
            .catch((error) => alive && setState({ data: null, loading: false, error }));
        return () => { alive = false; };
        // loader is stable per key by convention
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key, attempt]);

    const reload = useCallback(() => {
        if (key) clearPortalCache(key);
        setAttempt((n) => n + 1);
    }, [key]);

    return { ...state, reload };
}

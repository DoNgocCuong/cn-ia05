import React, { useEffect, useState, useRef, useCallback } from "react";
import PhotoCard from "../components/PhotoCard";
import { fetchPhotos } from "../api";

export default function Homepage() {
    const LIMIT = 20; // mỗi page lấy 20 ảnh
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const sentinelRef = useRef(null);

    const loadPage = useCallback(async (p) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchPhotos(p, LIMIT);
            if (!Array.isArray(data) || data.length === 0) {
                setHasMore(false);
            } else {
                setPhotos(prev => [...prev, ...data]);
                if (data.length < LIMIT) setHasMore(false);
            }
        } catch (err) {
            setError(err.message || "Error while loading photos");
        } finally {
            setLoading(false);
        }
    }, []);

    // load initial and when page thay đổi
    useEffect(() => {
        loadPage(page);
    }, [loadPage, page]);

    // intersection observer để infinite scroll
    useEffect(() => {
        if (!hasMore) return;
        const el = sentinelRef.current;
        if (!el) return;

        const io = new IntersectionObserver(entries => {
            const ent = entries[0];
            if (ent.isIntersecting && !loading) {
                setPage(prev => prev + 1);
            }
        }, { root: null, rootMargin: "300px", threshold: 0 });

        io.observe(el);
        return () => io.disconnect();
    }, [loading, hasMore]);

    return (
        <div>
            <h1 className="page-title">Photos</h1>

            <section className="grid-container">
                {photos.map(p => <PhotoCard key={`${p.id}-${p.author}`} photo={p} />)}
            </section>

            <div ref={sentinelRef} style={{ minHeight: 1 }} />

            <div className="status">
                {loading && <div className="loader">Loading...</div>}
                {error && <div className="error">Error: {error}</div>}
                {!hasMore && <div className="end">End of list</div>}
            </div>
        </div>
    );
}

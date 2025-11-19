import React from "react";
import { Link } from "react-router-dom";

export default function PhotoCard({ photo }) {
    // thumbnail nhỏ để load nhanh
    const thumb = `https://picsum.photos/id/${photo.id}/400/260`;
    return (
        <article className="card">
            <Link to={`/photos/${photo.id}`} className="card-link">
                <div className="thumb-wrap">
                    <img src={thumb} alt={photo.author} loading="lazy" />
                </div>
                <div className="card-footer">
                    <div className="author">{photo.author}</div>
                </div>
            </Link>
        </article>
    );
}

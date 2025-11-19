import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import '../App.css';

export default function DetailPage() {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPhoto() {
            try {
                const res = await fetch(`https://picsum.photos/id/${id}/info`);
                const data = await res.json();
                data.title = `Ảnh của ${data.author}`;
                data.description = `Kích thước gốc: ${data.width} x ${data.height}. Ảnh từ Lorem Picsum.`;
                setPhoto(data);
            } catch (error) {
                console.error("Lỗi load ảnh:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPhoto();
    }, [id]);

    if (loading) return <p className="detail-loading">Đang tải...</p>;
    if (!photo) return <p>Không tìm thấy ảnh!</p>;

    return (
        <div className="detail-wrapper">
            <div className="detail-card">
                <Link to="/" className="back-btn">← Trở về</Link>

                <div className="image-container">
                    <img
                        src={photo.download_url}
                        alt={photo.author}
                        className="detail-image"
                    />
                </div>

                <h1 className="detail-title">{photo.title}</h1>
                <p className="detail-author">Tác giả: {photo.author}</p>
                <p className="detail-description">{photo.description}</p>
            </div>
        </div>
    );
}

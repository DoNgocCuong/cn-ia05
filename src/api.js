// api.js
const BASE_LIST = (page = 1, limit = 20) => `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
const INFO = (id) => `https://picsum.photos/id/${id}/info`;

/**
 * Trả về array các photo objects
 */
export async function fetchPhotos(page = 1, limit = 20) {
    const res = await fetch(BASE_LIST(page, limit));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

/**
 * Trả về object chi tiết ảnh (width,height,author,download_url,filename,...)
 */
export async function fetchPhotoInfo(id) {
    const res = await fetch(INFO(id));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

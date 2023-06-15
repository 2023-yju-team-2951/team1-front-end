/**
 * File api를 이용하여 이미지를 업로드합니다.
 * @param {File} file
 * @returns {*} 업로드된 이미지의 url
 */
export async function uploadImg(file) {
  const PROXY = process.env.CORS_PROXY;
  const DEST = process.env.IMAGE_UPLOAD_URL;
  const API_KEY = process.env.IMAGE_UPLOAD_API_KEY;

  const URL = `${PROXY}${DEST}`;

  const formData = new FormData();
  formData.append('media', file);
  formData.append('key', API_KEY);

  const res = await fetch(URL, {
    headers: {
      Origin: window.location.origin,
    },
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Failed to upload image, ${res.status}`);
  }

  /**
   * data: {id, url, media, thumb, width, height }
   */
  const { data } = await res.json();

  return data.media;
}

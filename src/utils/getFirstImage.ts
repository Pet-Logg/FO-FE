export const getFirstImage = (imgUrls: string[] | string): string => {
  if (Array.isArray(imgUrls) && imgUrls.length > 0) {
    return imgUrls[0] // 배열이면 첫 번째 이미지 반환
  }
  return imgUrls[0] ?? '' // 배열이 아니면 그대로 반환, 없으면 빈 문자열 반환
}
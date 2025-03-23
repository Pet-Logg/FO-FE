export const getUserRole = (): string | null => {
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('Authorization='))

  if (!cookie) return null

  const token = cookie.split('=')[1] // value 부분인 토큰만 추출

  if (!token) return null

  try {
    const payload = token.split('.')[1]
    const decodedPayload = JSON.parse(atob(payload))

    return decodedPayload.role || null
  } catch (error) {
    console.error('토큰 파싱 오류:', error)
    return null
  }
}

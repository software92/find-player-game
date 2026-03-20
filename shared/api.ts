import axios from 'axios'

export const fetchErrorLogger = (error: unknown) => {
  let message = '데이터를 가져오는 중 오류가 발생했습니다.'

  if (axios.isAxiosError(error)) {
    message = error.response?.data?.message || error.message
    console.error('❌ API Request Error:', message)
  } else if (error instanceof Error) {
    message = error.message
    console.error('❌ System Error:', message)
  } else {
    console.error('❌ Unknown Error:', error)
  }
}

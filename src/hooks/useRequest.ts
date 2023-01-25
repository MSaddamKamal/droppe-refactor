import { useEffect, useState } from 'react'

const useRequest = (url: string, payload?: object) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [data, setData] = useState([])
  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const res = await fetch(url, payload)
        const jsonResponse = await res.json()
        setData(jsonResponse)
        setLoading(false)
      } catch (er) {
        setError(true)
        setLoading(false)
        setErrorMsg('Something Went Wrong')
      }
    })()
  }, [url])
  return { loading, error, errorMsg, data }
}

export default useRequest

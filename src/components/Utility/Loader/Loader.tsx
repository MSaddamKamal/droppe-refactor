import React from 'react'

interface LoaderProps {
  isLoading: boolean
}

const Loader = ({ isLoading }: LoaderProps) => {
  return <div>{isLoading ? 'Please Wait...' : ''}</div>
}

export default Loader

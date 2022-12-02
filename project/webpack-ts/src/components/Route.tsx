import React, { useEffect, useState } from 'react'

type Props = {
  element: JSX.Element
  path: string
}

export default function Router(props: Props) {
  const [currentHash, useCurrentHash] = useState(() => window.location.hash.slice(1))

  useEffect(() => {
    console.log(currentHash)
  }, [currentHash])

  window.addEventListener('hashchange', () => {
    useCurrentHash(window.location.hash.slice(1))
  })

  // history.pushState
  return props.path === currentHash ? props.element : null
}

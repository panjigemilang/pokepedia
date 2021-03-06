import { useEffect, useState } from "react"

const Fade = ({ show, children }) => {
  const [render, setRender] = useState(show)

  useEffect(() => {
    if (show) setRender(true)
  }, [show])

  const onAnimationEnd = () => {
    if (!show) setRender(false)
  }

  return (
    render && (
      <div
        style={{ animation: `${show ? "fadeIn" : "fadeOut"} .3s` }}
        onAnimationEnd={onAnimationEnd}
        data-testid="qa-fade-container"
      >
        {children}
      </div>
    )
  )
}

export default Fade

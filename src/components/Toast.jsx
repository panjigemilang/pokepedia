import { useContext, useEffect } from "react"
import styled from "@emotion/styled"
import { ToastContext } from "../contexts/ToastContext"
import { PokemonContext } from "../contexts/PokemonContext"
import Fade from "../utils/Fade"

const App = styled.div`
  background-color: ${({ catched }) => (catched ? "#13c57b" : "#d42c2c")};
  border-radius: 5px;
  box-shadow: 1px 5px 10px -2px rgba(0, 0, 0, 0.5);
  color: white;
  padding: 8px 16px;
  position: absolute;
  bottom: ${({ show }) => (show ? "10%" : "-50%")};
  left: 50%;
  transform: translateX(-50%);
  transition: 0.3s ease-in-out;
  width: max-content;
  z-index: 99;
`

export default function Toast() {
  const { toast, setToast, message } = useContext(ToastContext)
  const { catched } = useContext(PokemonContext)

  useEffect(() => {
    if (toast)
      setTimeout(() => {
        setToast(false)
      }, 2000)
  }, [toast])
  return (
    <Fade show={toast}>
      <App show={toast} catched={catched} onClick={() => setToast(false)}>
        {message}
      </App>
    </Fade>
  )
}

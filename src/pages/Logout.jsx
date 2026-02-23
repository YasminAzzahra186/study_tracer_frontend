import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"

export default function Logout() {

  const { logout } = useAuth()

  useEffect(async () => {
    await logout()
  }, [])

  return null
}

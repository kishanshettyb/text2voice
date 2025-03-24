import React from 'react'
import { DropdownMenuItem } from './ui/dropdown-menu'
import { LogOut } from 'lucide-react'
import { useLogoutMutation } from '@/services/mutation/login'

function LogoutButton() {
  const logoutMutation = useLogoutMutation()
  localStorage.removeItem('user')

  function handleLogout() {
    logoutMutation.mutate()
  }
  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOut />
      Log out
    </DropdownMenuItem>
  )
}

export default LogoutButton

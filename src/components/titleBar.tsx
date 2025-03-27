import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useTitleStore from '@/store/title'
import { CheckSquare, Edit } from 'lucide-react'
import useTitleSaveStore from '@/store/titleSave'

export function TitleBar() {
  const [isEditable, setIsEditable] = useState(false)
  const { title, settitle } = useTitleStore()
  const { titleSave, setTitleSave } = useTitleSaveStore()

  // Function to toggle edit mode on button click
  const handleEditClick = () => {
    setIsEditable((prev) => !prev)
  }

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    settitle(event.target.value)
    setTitleSave(false)
  }

  return (
    <div className="flex w-full max-w-sm items-center mb-3 space-x-2">
      <Input
        type="text"
        placeholder={title}
        className="border-0 md:text-[1rem]"
        value={title}
        onChange={handleInputChange}
        readOnly={!isEditable} // Make input read-only when not in edit mode
      />

      {!titleSave ? (
        <Button onClick={() => setTitleSave(true)}>
          <CheckSquare />
          Save
        </Button>
      ) : (
        <Button variant="ghost" type="button" onClick={handleEditClick}>
          <Edit />
          Edit
        </Button>
      )}
    </div>
  )
}

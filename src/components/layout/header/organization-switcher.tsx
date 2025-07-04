'use client'

import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface OrganizationLite {
  id: string;
  name: string;
}

const mockOrganizations: OrganizationLite[] = [
  { id: 'org-1', name: 'Organization One' },
  { id: 'org-2', name: 'Organization Two' },
  { id: 'org-3', name: 'Organization Three' },
]

export function OrganizationSwitcher() {
  const [open, setOpen] = useState(false)
  const [currentOrganizationId, setCurrentOrganizationId] = useState<string | undefined>('org-1')

  const displayOrganization = mockOrganizations.find(org => org.id === currentOrganizationId)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select organization"
          className="flex w-fit justify-between min-w-[200px]"
        >
          {displayOrganization?.name || 'Select organization'}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search organization..." />
            <CommandGroup heading="Organizations">
              {mockOrganizations.map((org) => (
                <CommandItem
                  key={org.id}
                  onSelect={() => {
                    setCurrentOrganizationId(org.id)
                    setOpen(false)
                  }}
                  className="text-sm"
                >
                  {org.name}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentOrganizationId === org.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            {mockOrganizations.length === 0 && (
              <CommandEmpty>No organization found.</CommandEmpty>
            )}
          </CommandList>
          <CommandSeparator />
        </Command>
      </PopoverContent>
    </Popover>
  )
}
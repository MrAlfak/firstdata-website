'use client'

import * as React from 'react'
import {
  SearchIcon,
  LayoutDashboardIcon,
  TrendingUpIcon,
  BriefcaseIcon,
  ZapIcon,
  SettingsIcon,
  ClockIcon,
  BookOpenIcon,
  ScrollIcon,
  MessageSquareIcon,
  Undo2Icon,
  ArrowUpIcon,
  ArrowDownIcon,
  type LucideIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
import { DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

export interface CommandSearchItem {
  label: string
  /** Stable value for cmdk selection (defaults to label). */
  value?: string
  icon?: LucideIcon
  timestamp?: string
  onSelect?: () => void
}

export interface CommandSearchGroup {
  heading: string
  items: CommandSearchItem[]
}

export interface CommandSearchProps {
  buttonLabel?: string
  placeholder?: string
  emptyMessage?: string
  showSeparators?: boolean
  groups?: CommandSearchGroup[]
}

/** Controlled command palette shell — structure matches the shadcn command-06 block. */
export type CommandSearchDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  placeholder: string
  emptyMessage: string
  groups: CommandSearchGroup[]
  showSeparators?: boolean
  /** Accessible dialog title (sr-only). */
  title: string
  /** Accessible dialog description (sr-only). */
  description?: string
  tipClose: string
  tipSelect: string
  tipNavigate: string
  tipEscLabel?: string
  dir?: 'ltr' | 'rtl'
  className?: string
  shouldFilter?: boolean
  inputValue?: string
  onInputValueChange?: (value: string) => void
  onInputKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  commandClassName?: string
}

export function CommandSearchDialog({
  open,
  onOpenChange,
  placeholder,
  emptyMessage,
  groups,
  showSeparators = true,
  title,
  description,
  tipClose,
  tipSelect,
  tipNavigate,
  tipEscLabel = 'esc',
  dir,
  className,
  shouldFilter = true,
  inputValue,
  onInputValueChange,
  onInputKeyDown,
  commandClassName
}: CommandSearchDialogProps) {
  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      className={cn('w-full max-w-lg!', className)}
    >
      <Command
        shouldFilter={shouldFilter}
        className={cn('rounded-none bg-transparent', commandClassName)}
        dir={dir}
      >
        <DialogTitle className='sr-only'>{title}</DialogTitle>
        {description ? (
          <DialogDescription className='sr-only'>{description}</DialogDescription>
        ) : null}
        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={onInputValueChange}
          onKeyDown={onInputKeyDown}
        />
        <CommandList>
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          {groups.map((group, index) => (
            <React.Fragment key={`${group.heading}-${index}`}>
              {showSeparators && index > 0 && <CommandSeparator />}
              <CommandGroup heading={group.heading}>
                {group.items.map((item) => (
                  <CommandItem
                    key={item.value ?? `${group.heading}-${item.label}`}
                    className='cursor-pointer'
                    value={item.value ?? item.label}
                    onSelect={() => item.onSelect?.()}
                  >
                    {item.icon && (
                      <item.icon className={item.timestamp ? 'text-muted-foreground' : ''} />
                    )}
                    <span className='truncate'>{item.label}</span>
                    {item.timestamp && (
                      <div className='ms-auto text-xs text-muted-foreground' data-slot='command-shortcut'>
                        <span>{item.timestamp}</span>
                      </div>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </React.Fragment>
          ))}
        </CommandList>
        <CommandSeparator />
        <div
          data-slot='command-tips'
          className='flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 text-xs text-muted-foreground'
        >
          <div className='flex flex-1 items-center gap-2'>
            <kbd className='rounded border border-border bg-background/60 px-1.5 py-0.5 font-mono text-[11px] leading-none'>
              {tipEscLabel}
            </kbd>
            <span>{tipClose}</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='flex size-5 items-center justify-center rounded border border-border bg-background/60'>
              <Undo2Icon className='size-3.5' />
            </div>
            <span>{tipSelect}</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='flex size-5 items-center justify-center rounded border border-border bg-background/60'>
              <ArrowUpIcon className='size-3.5' />
            </div>
            <div className='flex size-5 items-center justify-center rounded border border-border bg-background/60'>
              <ArrowDownIcon className='size-3.5' />
            </div>
            <span>{tipNavigate}</span>
          </div>
        </div>
      </Command>
    </CommandDialog>
  )
}

const defaultGroups: CommandSearchGroup[] = [
  {
    heading: 'Suggestions',
    items: [
      { label: 'Dashboard', icon: LayoutDashboardIcon },
      { label: 'Analytics', icon: TrendingUpIcon },
      { label: 'Projects', icon: BriefcaseIcon },
      { label: 'Integrations', icon: ZapIcon },
      { label: 'Settings', icon: SettingsIcon }
    ]
  },
  {
    heading: 'Recent',
    items: [
      { label: 'Q2 Sales Report', icon: ClockIcon, timestamp: '2m ago' },
      { label: 'Sprint Planning', icon: ClockIcon, timestamp: '15m ago' },
      { label: 'API Configuration', icon: ClockIcon, timestamp: '1h ago' },
      { label: 'Team Permissions', icon: ClockIcon, timestamp: '3h ago' }
    ]
  },
  {
    heading: 'Quick Links',
    items: [
      { label: 'Documentation', icon: BookOpenIcon },
      { label: 'Changelog', icon: ScrollIcon },
      { label: 'Community Forum', icon: MessageSquareIcon }
    ]
  }
]

const CommandSearchDemo = ({
  buttonLabel = 'Search files...',
  placeholder = 'Type a command or search...',
  emptyMessage = 'No results found.',
  showSeparators = true,
  groups = defaultGroups
}: CommandSearchProps) => {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === 'j' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <div className='flex flex-col gap-4'>
      <Button onClick={() => setOpen(true)} variant='outline' className='w-52 cursor-pointer'>
        <SearchIcon className='size-4' />
        {buttonLabel}
        <Kbd className='ml-auto'>⌘J</Kbd>
      </Button>
      <CommandSearchDialog
        open={open}
        onOpenChange={setOpen}
        placeholder={placeholder}
        emptyMessage={emptyMessage}
        groups={groups}
        showSeparators={showSeparators}
        title={buttonLabel}
        tipClose='To close'
        tipSelect='To Select'
        tipNavigate='To Navigate'
      />
    </div>
  )
}

export default CommandSearchDemo

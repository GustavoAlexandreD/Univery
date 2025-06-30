export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | { [key: string]: boolean | undefined | null }
  | ClassValue[]

function clsx(...inputs: ClassValue[]): string {
  const classes: string[] = []

  for (const input of inputs) {
    if (!input) continue

    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input))
    } else if (Array.isArray(input)) {
      const nested = clsx(...input)
      if (nested) classes.push(nested)
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key)
      }
    }
  }

  return classes.join(" ")
}

function twMerge(classNames: string): string {
  // Simple implementation - just return the classes as-is
  // In a real implementation, this would handle Tailwind class conflicts
  return classNames
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs))
}

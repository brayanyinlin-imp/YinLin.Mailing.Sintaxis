import { readFileSync } from 'node:fs'
import handlebars from 'handlebars'

export const checkHandlebarsTemplate = (templatePath: string): boolean => {
  try {
    const templateContent = readFileSync(templatePath, 'utf-8')
    handlebars.compile(templateContent)
    return true
  } catch (e) {
    return false
  }
}


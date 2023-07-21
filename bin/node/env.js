#!/usr/bin/env node

import process from 'node:process'

const {ENV_INCLUDE = ''} = process.env
const vals = ENV_INCLUDE.split(' ')
const envs = vals.map(v => {
	const val = process.env?.[v]
	try {
		// Testa os valores
		JSON.parse(val)
		return `env.${v} = ${val}`
	} catch {
		return `env.${v} = '${val}'`
	}
})

const template = `const env = {}

${envs.join('\n')}

export default env
`

process.stdout.write(template)
process.exit(0)

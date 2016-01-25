'use strict'
/**
 * Module dependencies
 */
const fs = require('fs')
const pify = require('pify')
const co = require('co')

/**
 * Local gitignores
 */
co(function* () {
	const dir = './gitignore'
	let names = yield pify(fs.readdir)(dir)
	names = names.filter(n => n.indexOf('.gitignore') > -1)
	yield pify(fs.writeFile)('gitignores.json', JSON.stringify(names, null, 2), 'utf8')
}).catch(err => console.log(err))

/**
 * Global gitignores
 */
co(function* () {
	const dir = './gitignore/global'
	let names = yield pify(fs.readdir)(dir)
	names = names.filter(n => n.indexOf('.gitignore') > -1)
	yield pify(fs.writeFile)('gitignoresGlobal.json', JSON.stringify(names, null, 2), 'utf8')
}).catch(err => console.log(err))

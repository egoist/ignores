'use strict'
/**
 * Module dependencies
 */
const fs = require('fs')
const co = require('co')
const pify = require('pify')
const gitignoresLocal = require('./gitignores')
const gitignoresGlobal = require('./gitignoresGlobal')

module.exports = co.wrap(function* (names) {
	if (!Array.isArray(names)) {
		throw new TypeError('Expect an Array.')
	}
	const res = []
	/**
	 * Find gitignores
	 */
	const gitignores = gitignoresLocal.concat(gitignoresGlobal.map(gi => `Global/${gi}`))
	for (let name of names) {
		for (let gi of gitignores) {
			if (gi.toLowerCase().indexOf(name) > -1) {
				let value = yield pify(fs.readFile)(`./gitignore/${gi}`, 'utf8')
				res.push({name: gi, value})
				break
			}
		}
	}
	return res
})

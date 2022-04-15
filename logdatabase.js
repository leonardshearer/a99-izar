"use strict"

import Database from 'better-sqlite3/lib/database.js';

const db = new Database('log.db')

const isInitialized = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='interactionlog';`)

if (isInitialized.get() === undefined) {
    const sql = `
        CREATE TABLE interactionlog ( 
            id INTEGER PRIMARY KEY, ip STRING, userid STRING, username STRING
            time STRING, method STRING, url STRING, protocol STRING,
            httpversion STRING, status INTEGER, referer STRING, userinfo STRING
        );
    `
    db.exec(sql)
    console.log('Interaction database created.')
} else {
    console.log('Interaction database found.')
}

export function getInteractionDb() {
    return db
}
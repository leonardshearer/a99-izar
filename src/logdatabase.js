"use strict"

import Database from 'better-sqlite3/lib/database.js';

const db = new Database('./data/accesslog.db')

const isInitialized = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';`)

if (isInitialized.get() === undefined) {
    const sql = `
        CREATE TABLE accesslog ( 
            id INTEGER PRIMARY KEY, 
            ip STRING, 
            userid STRING, 
            time STRING, 
            method STRING, 
            url STRING, 
            protocol STRING, 
            httpversion STRING, 
            status INTEGER, 
            referer STRING, 
            userinfo STRING
        );
    `
    db.exec(sql)
    console.log('Interaction database created.')
} else {
    console.log('Interaction database found.')
}

export function getAccessDb() {
    return db
}
import { db } from './firebase'

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  })

export const doCreateData = (eat,drink,mode) =>
  db.ref(`data/`)
    .set({
      eat,
      drink,
      mode,
    })
    .then(alert('You successfully saved your changes.'))

export const onceGetUsers = () =>
  db.ref('users').once('value')

export const onceGetData = () =>
  db.ref('data').once('value')

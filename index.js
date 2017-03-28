'use strict'

const Hapi = require('hapi')
const server = new Hapi.Server()

server.connection({ port: 3000, host: 'localhost' })


server.register(require('inert'), (err) => {
  if (err) {
    throw err
  }

  server.route({  
    method: 'GET',
    path: '/app/{file*}',
    handler: {
      directory: { 
        path: 'app'
      }
    }
  })

  server.route({  
    method: 'GET',
    path: '/public/{file*}',
    handler: {
      directory: { 
        path: 'public'
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.file('./app/views/layout.html')
    }
  })

})

server.start((err) => {
  if (err) {
    throw err
  }
  
  console.log(`Server running at: ${server.info.uri}`)

})
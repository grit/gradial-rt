# Gradial RT (real-time)

This mock prototype demonstrates real-time interaction of a client interface (file directory representation) using websockets and a firebase firestore.

The main use case serves to demonstrate just a couple possible ways in which clients connected to an application could be notified (and have their interface change) based on interactions that other clients make from their end. The inspiration for this prototype was based on discussions with a member of the Gradial team around real-time updates.

The live version of the application can be found at https://gradial-rt.vercel.app/

If you'd like to run it locally, you can clone down the repo and run
`npm install --legacy-peer-deps`
followed by
`npm run dev`

Currently both the live version and local version access the deployed and hosted websocket server on render (while client is hosted on vercel). You can also run the websocket server locally if you wish by adding a server.js file at the root level and using the code implemented in the https://github.com/grit/gradial-rt-ws repo. Then replace the websocket URL reference in App.jsx and run `node server.js`.

![Ex.](./demo.gif)

Some features of the mock prototype:

- The application persists data in real time using firestore, and any changes made by one client (once saved) are reflected for all other clients interacting with the same application. Updates to the database trigger a callback function whenever a change occurs using the onSnapshot() method, rerendering the client side for all active listeners.
- Any changes made to directory structure require the 'Save Modifications' button to be selected in order to persist it past the temporary local state. 
- Clients are able to see the cursor of other connected clients moving around within the application viewport (on both desktop and mobile)
- Users can change their guest 'username' at any point using the input field at the top. This change will be reflected on others viewing your cursor on their own client.
- Changelog is automatically updated whenever a 'Save Modification' event occurs - showcasing the user who made the modification as well as the timestamp.

There are many next steps to go from here, as this is just a basic prototype of interactions between clients for a file directory representation. Some immediate things that come to mind for a more robust project would be incorporating TypeScript for static type checking, implementing ability to download and upload actual files/folders, security/authentication for database writes (as right now any user can publicly modify the directory), testing - both unit and integration as needed, robust error handling especially around the websocket connections (errors and closures), increased server-side scaling to handle large number of visitors interacting with the platform, throttling/debouncing interactions to limit number of websocket messages sent per any given time, and improved loading/save/alert states.

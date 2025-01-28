import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr' 
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    // depending on your application, base can also be "/"
    base: '/',
    plugins: [react(), svgr(), VitePWA({ registerType: 'autoUpdate', manifest: false})],
    server: {    
        // this ensures that the browser opens upon server start
        open: true,
        // this sets a default port to 3000  
        port: 3000, 
        host: "0.0.0.0"
    },
})


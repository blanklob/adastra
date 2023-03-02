import path from 'path'
import glob from 'fast-glob'
import createDebugger from 'debug'

import { Plugin, UserConfig, mergeConfig, normalizePath } from 'vite'
import type { ResolvedAdastraPluginOptions } from '../types'

const debug = createDebugger(`adastra-plugin:config`)

export default (options: ResolvedAdastraPluginOptions): Plugin => {
  return {
    name: `adastra-plugin-config`,
    config(config: UserConfig): UserConfig {
      const host = config.server?.host ?? 'localhost'
      const port = config.server?.port ?? 5173
      const https = config.server?.https
      const protocol = https === true ? 'https:' : 'http:'
      const origin = `${protocol}//${host as string}:${port}`
      const socketProtocol = https === true ? 'wss' : 'ws'

      const input = glob.sync(
        normalizePath(path.join(options.entrypointsDir, '**/*')),
        { onlyFiles: true }
      )

      const generatedConfig: UserConfig = {
        // Use relative base path so to load imported assets from Shopify CDN
        base: './',
        envPrefix: ['VITE_', 'PUBLIC_', 'ADASTRA_'],
        publicDir: false,
        build: {
          // Output files to "assets" directory
          outDir: path.join(options.root, 'assets'),
          modulePreload: {
            polyfill: true
          },
          // Do not use subfolder for static assets
          assetsDir: '',
          // Configure bundle entry points
          rollupOptions: {
            input
          },
          // Output manifest file for backend integration
          manifest: `adastra.manifest.json`
        },
        resolve: {
          // Provide import alias to source code dir for convenience
          alias: {
            '~': path.resolve(options.sourceDir),
            '@': path.resolve(options.sourceDir)
          }
        },
        server: {
          host,
          https,
          port,
          origin,
          strictPort: true,
          hmr: {
            host: host as string,
            port,
            protocol: socketProtocol
          },
          watch: {
            ignored: ['assets/*', `snippets/${options.snippetName}.liquid`]
          }
        }
      }
      debug(generatedConfig)

      return mergeConfig(generatedConfig, config)
    }
  }
}

// vite.config.ts
import { cloudflareDevProxyVitePlugin as remixCloudflareDevProxy, vitePlugin as remixVitePlugin } from "file:///C:/Users/binar/Desktop/itzbinar.ai/node_modules/.pnpm/@remix-run+dev@2.16.3_@remix-run+react@2.16.3_react-dom@18.3.1_react@18.3.1__react@18.3.1_typ_56tyhioi4fkoibvrjndu6yshyi/node_modules/@remix-run/dev/dist/index.js";
import UnoCSS from "file:///C:/Users/binar/Desktop/itzbinar.ai/node_modules/.pnpm/unocss@0.61.9_postcss@8.5.3_rollup@4.38.0_vite@5.4.15_@types+node@22.13.14_sass-embedded@1.86.0_/node_modules/unocss/dist/vite.mjs";
import { defineConfig } from "file:///C:/Users/binar/Desktop/itzbinar.ai/node_modules/.pnpm/vite@5.4.15_@types+node@22.13.14_sass-embedded@1.86.0/node_modules/vite/dist/node/index.js";
import { nodePolyfills } from "file:///C:/Users/binar/Desktop/itzbinar.ai/node_modules/.pnpm/vite-plugin-node-polyfills@0.22.0_rollup@4.38.0_vite@5.4.15_@types+node@22.13.14_sass-embedded@1.86.0_/node_modules/vite-plugin-node-polyfills/dist/index.js";
import { optimizeCssModules } from "file:///C:/Users/binar/Desktop/itzbinar.ai/node_modules/.pnpm/vite-plugin-optimize-css-modules@1.2.0_vite@5.4.15_@types+node@22.13.14_sass-embedded@1.86.0_/node_modules/vite-plugin-optimize-css-modules/dist/index.mjs";
import tsconfigPaths from "file:///C:/Users/binar/Desktop/itzbinar.ai/node_modules/.pnpm/vite-tsconfig-paths@4.3.2_typescript@5.8.2_vite@5.4.15_@types+node@22.13.14_sass-embedded@1.86.0_/node_modules/vite-tsconfig-paths/dist/index.mjs";
import * as dotenv from "file:///C:/Users/binar/Desktop/itzbinar.ai/node_modules/.pnpm/dotenv@16.4.7/node_modules/dotenv/lib/main.js";
import { execSync } from "child_process";
import { readFileSync } from "fs";
import { join } from "path";
dotenv.config();
var getGitInfo = () => {
  try {
    return {
      commitHash: execSync("git rev-parse --short HEAD").toString().trim(),
      branch: execSync("git rev-parse --abbrev-ref HEAD").toString().trim(),
      commitTime: execSync("git log -1 --format=%cd").toString().trim(),
      author: execSync("git log -1 --format=%an").toString().trim(),
      email: execSync("git log -1 --format=%ae").toString().trim(),
      remoteUrl: execSync("git config --get remote.origin.url").toString().trim(),
      repoName: execSync("git config --get remote.origin.url").toString().trim().replace(/^.*github.com[:/]/, "").replace(/\.git$/, "")
    };
  } catch {
    return {
      commitHash: "no-git-info",
      branch: "unknown",
      commitTime: "unknown",
      author: "unknown",
      email: "unknown",
      remoteUrl: "unknown",
      repoName: "unknown"
    };
  }
};
var getPackageJson = () => {
  try {
    const pkgPath = join(process.cwd(), "package.json");
    const pkg2 = JSON.parse(readFileSync(pkgPath, "utf-8"));
    return {
      name: pkg2.name,
      description: pkg2.description,
      license: pkg2.license,
      dependencies: pkg2.dependencies || {},
      devDependencies: pkg2.devDependencies || {},
      peerDependencies: pkg2.peerDependencies || {},
      optionalDependencies: pkg2.optionalDependencies || {}
    };
  } catch {
    return {
      name: "itzbinar.ai",
      description: "A DIY LLM interface",
      license: "MIT",
      dependencies: {},
      devDependencies: {},
      peerDependencies: {},
      optionalDependencies: {}
    };
  }
};
var pkg = getPackageJson();
var gitInfo = getGitInfo();
var vite_config_default = defineConfig((config2) => {
  return {
    define: {
      __COMMIT_HASH: JSON.stringify(gitInfo.commitHash),
      __GIT_BRANCH: JSON.stringify(gitInfo.branch),
      __GIT_COMMIT_TIME: JSON.stringify(gitInfo.commitTime),
      __GIT_AUTHOR: JSON.stringify(gitInfo.author),
      __GIT_EMAIL: JSON.stringify(gitInfo.email),
      __GIT_REMOTE_URL: JSON.stringify(gitInfo.remoteUrl),
      __GIT_REPO_NAME: JSON.stringify(gitInfo.repoName),
      __APP_VERSION: JSON.stringify(process.env.npm_package_version),
      __PKG_NAME: JSON.stringify(pkg.name),
      __PKG_DESCRIPTION: JSON.stringify(pkg.description),
      __PKG_LICENSE: JSON.stringify(pkg.license),
      __PKG_DEPENDENCIES: JSON.stringify(pkg.dependencies),
      __PKG_DEV_DEPENDENCIES: JSON.stringify(pkg.devDependencies),
      __PKG_PEER_DEPENDENCIES: JSON.stringify(pkg.peerDependencies),
      __PKG_OPTIONAL_DEPENDENCIES: JSON.stringify(pkg.optionalDependencies),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    },
    build: {
      target: "esnext"
    },
    plugins: [
      nodePolyfills({
        include: ["buffer", "process", "util", "stream"],
        globals: {
          Buffer: true,
          process: true,
          global: true
        },
        protocolImports: true,
        exclude: ["child_process", "fs", "path"]
      }),
      {
        name: "buffer-polyfill",
        transform(code, id) {
          if (id.includes("env.mjs")) {
            return {
              code: `import { Buffer } from 'buffer';
${code}`,
              map: null
            };
          }
          return null;
        }
      },
      config2.mode !== "test" && remixCloudflareDevProxy(),
      remixVitePlugin({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
          v3_lazyRouteDiscovery: true
        }
      }),
      UnoCSS(),
      tsconfigPaths(),
      chrome129IssuePlugin(),
      config2.mode === "production" && optimizeCssModules({ apply: "build" })
    ],
    envPrefix: [
      "VITE_",
      "OPENAI_LIKE_API_BASE_URL",
      "OLLAMA_API_BASE_URL",
      "LMSTUDIO_API_BASE_URL",
      "TOGETHER_API_BASE_URL"
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler"
        }
      }
    }
  };
});
function chrome129IssuePlugin() {
  return {
    name: "chrome129IssuePlugin",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const raw = req.headers["user-agent"]?.match(/Chrom(e|ium)\/([0-9]+)\./);
        if (raw) {
          const version = parseInt(raw[2], 10);
          if (version === 129) {
            res.setHeader("content-type", "text/html");
            res.end(
              '<body><h1>Please use Chrome Canary for testing.</h1><p>Chrome 129 has an issue with JavaScript modules & Vite local development, see <a href="https://github.com/stackblitz/bolt.new/issues/86#issuecomment-2395519258">for more information.</a></p><p><b>Note:</b> This only impacts <u>local development</u>. `pnpm run build` and `pnpm run start` will work fine in this browser.</p></body>'
            );
            return;
          }
        }
        next();
      });
    }
  };
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxiaW5hclxcXFxEZXNrdG9wXFxcXGl0emJpbmFyLmFpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxiaW5hclxcXFxEZXNrdG9wXFxcXGl0emJpbmFyLmFpXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9iaW5hci9EZXNrdG9wL2l0emJpbmFyLmFpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgY2xvdWRmbGFyZURldlByb3h5Vml0ZVBsdWdpbiBhcyByZW1peENsb3VkZmxhcmVEZXZQcm94eSwgdml0ZVBsdWdpbiBhcyByZW1peFZpdGVQbHVnaW4gfSBmcm9tICdAcmVtaXgtcnVuL2Rldic7XG5pbXBvcnQgVW5vQ1NTIGZyb20gJ3Vub2Nzcy92aXRlJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgdHlwZSBWaXRlRGV2U2VydmVyIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgeyBub2RlUG9seWZpbGxzIH0gZnJvbSAndml0ZS1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMnO1xuaW1wb3J0IHsgb3B0aW1pemVDc3NNb2R1bGVzIH0gZnJvbSAndml0ZS1wbHVnaW4tb3B0aW1pemUtY3NzLW1vZHVsZXMnO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XG5pbXBvcnQgKiBhcyBkb3RlbnYgZnJvbSAnZG90ZW52JztcbmltcG9ydCB7IGV4ZWNTeW5jIH0gZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XG5pbXBvcnQgeyByZWFkRmlsZVN5bmMgfSBmcm9tICdmcyc7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XG5cbmRvdGVudi5jb25maWcoKTtcblxuLy8gR2V0IGRldGFpbGVkIGdpdCBpbmZvIHdpdGggZmFsbGJhY2tzXG5jb25zdCBnZXRHaXRJbmZvID0gKCkgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiB7XG4gICAgICBjb21taXRIYXNoOiBleGVjU3luYygnZ2l0IHJldi1wYXJzZSAtLXNob3J0IEhFQUQnKS50b1N0cmluZygpLnRyaW0oKSxcbiAgICAgIGJyYW5jaDogZXhlY1N5bmMoJ2dpdCByZXYtcGFyc2UgLS1hYmJyZXYtcmVmIEhFQUQnKS50b1N0cmluZygpLnRyaW0oKSxcbiAgICAgIGNvbW1pdFRpbWU6IGV4ZWNTeW5jKCdnaXQgbG9nIC0xIC0tZm9ybWF0PSVjZCcpLnRvU3RyaW5nKCkudHJpbSgpLFxuICAgICAgYXV0aG9yOiBleGVjU3luYygnZ2l0IGxvZyAtMSAtLWZvcm1hdD0lYW4nKS50b1N0cmluZygpLnRyaW0oKSxcbiAgICAgIGVtYWlsOiBleGVjU3luYygnZ2l0IGxvZyAtMSAtLWZvcm1hdD0lYWUnKS50b1N0cmluZygpLnRyaW0oKSxcbiAgICAgIHJlbW90ZVVybDogZXhlY1N5bmMoJ2dpdCBjb25maWcgLS1nZXQgcmVtb3RlLm9yaWdpbi51cmwnKS50b1N0cmluZygpLnRyaW0oKSxcbiAgICAgIHJlcG9OYW1lOiBleGVjU3luYygnZ2l0IGNvbmZpZyAtLWdldCByZW1vdGUub3JpZ2luLnVybCcpXG4gICAgICAgIC50b1N0cmluZygpXG4gICAgICAgIC50cmltKClcbiAgICAgICAgLnJlcGxhY2UoL14uKmdpdGh1Yi5jb21bOi9dLywgJycpXG4gICAgICAgIC5yZXBsYWNlKC9cXC5naXQkLywgJycpLFxuICAgIH07XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiB7XG4gICAgICBjb21taXRIYXNoOiAnbm8tZ2l0LWluZm8nLFxuICAgICAgYnJhbmNoOiAndW5rbm93bicsXG4gICAgICBjb21taXRUaW1lOiAndW5rbm93bicsXG4gICAgICBhdXRob3I6ICd1bmtub3duJyxcbiAgICAgIGVtYWlsOiAndW5rbm93bicsXG4gICAgICByZW1vdGVVcmw6ICd1bmtub3duJyxcbiAgICAgIHJlcG9OYW1lOiAndW5rbm93bicsXG4gICAgfTtcbiAgfVxufTtcblxuLy8gUmVhZCBwYWNrYWdlLmpzb24gd2l0aCBkZXRhaWxlZCBkZXBlbmRlbmN5IGluZm9cbmNvbnN0IGdldFBhY2thZ2VKc29uID0gKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHBrZ1BhdGggPSBqb2luKHByb2Nlc3MuY3dkKCksICdwYWNrYWdlLmpzb24nKTtcbiAgICBjb25zdCBwa2cgPSBKU09OLnBhcnNlKHJlYWRGaWxlU3luYyhwa2dQYXRoLCAndXRmLTgnKSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogcGtnLm5hbWUsXG4gICAgICBkZXNjcmlwdGlvbjogcGtnLmRlc2NyaXB0aW9uLFxuICAgICAgbGljZW5zZTogcGtnLmxpY2Vuc2UsXG4gICAgICBkZXBlbmRlbmNpZXM6IHBrZy5kZXBlbmRlbmNpZXMgfHwge30sXG4gICAgICBkZXZEZXBlbmRlbmNpZXM6IHBrZy5kZXZEZXBlbmRlbmNpZXMgfHwge30sXG4gICAgICBwZWVyRGVwZW5kZW5jaWVzOiBwa2cucGVlckRlcGVuZGVuY2llcyB8fCB7fSxcbiAgICAgIG9wdGlvbmFsRGVwZW5kZW5jaWVzOiBwa2cub3B0aW9uYWxEZXBlbmRlbmNpZXMgfHwge30sXG4gICAgfTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdpdHpiaW5hci5haScsXG4gICAgICBkZXNjcmlwdGlvbjogJ0EgRElZIExMTSBpbnRlcmZhY2UnLFxuICAgICAgbGljZW5zZTogJ01JVCcsXG4gICAgICBkZXBlbmRlbmNpZXM6IHt9LFxuICAgICAgZGV2RGVwZW5kZW5jaWVzOiB7fSxcbiAgICAgIHBlZXJEZXBlbmRlbmNpZXM6IHt9LFxuICAgICAgb3B0aW9uYWxEZXBlbmRlbmNpZXM6IHt9LFxuICAgIH07XG4gIH1cbn07XG5cbmNvbnN0IHBrZyA9IGdldFBhY2thZ2VKc29uKCk7XG5jb25zdCBnaXRJbmZvID0gZ2V0R2l0SW5mbygpO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKGNvbmZpZykgPT4ge1xuICByZXR1cm4ge1xuICAgIGRlZmluZToge1xuICAgICAgX19DT01NSVRfSEFTSDogSlNPTi5zdHJpbmdpZnkoZ2l0SW5mby5jb21taXRIYXNoKSxcbiAgICAgIF9fR0lUX0JSQU5DSDogSlNPTi5zdHJpbmdpZnkoZ2l0SW5mby5icmFuY2gpLFxuICAgICAgX19HSVRfQ09NTUlUX1RJTUU6IEpTT04uc3RyaW5naWZ5KGdpdEluZm8uY29tbWl0VGltZSksXG4gICAgICBfX0dJVF9BVVRIT1I6IEpTT04uc3RyaW5naWZ5KGdpdEluZm8uYXV0aG9yKSxcbiAgICAgIF9fR0lUX0VNQUlMOiBKU09OLnN0cmluZ2lmeShnaXRJbmZvLmVtYWlsKSxcbiAgICAgIF9fR0lUX1JFTU9URV9VUkw6IEpTT04uc3RyaW5naWZ5KGdpdEluZm8ucmVtb3RlVXJsKSxcbiAgICAgIF9fR0lUX1JFUE9fTkFNRTogSlNPTi5zdHJpbmdpZnkoZ2l0SW5mby5yZXBvTmFtZSksXG4gICAgICBfX0FQUF9WRVJTSU9OOiBKU09OLnN0cmluZ2lmeShwcm9jZXNzLmVudi5ucG1fcGFja2FnZV92ZXJzaW9uKSxcbiAgICAgIF9fUEtHX05BTUU6IEpTT04uc3RyaW5naWZ5KHBrZy5uYW1lKSxcbiAgICAgIF9fUEtHX0RFU0NSSVBUSU9OOiBKU09OLnN0cmluZ2lmeShwa2cuZGVzY3JpcHRpb24pLFxuICAgICAgX19QS0dfTElDRU5TRTogSlNPTi5zdHJpbmdpZnkocGtnLmxpY2Vuc2UpLFxuICAgICAgX19QS0dfREVQRU5ERU5DSUVTOiBKU09OLnN0cmluZ2lmeShwa2cuZGVwZW5kZW5jaWVzKSxcbiAgICAgIF9fUEtHX0RFVl9ERVBFTkRFTkNJRVM6IEpTT04uc3RyaW5naWZ5KHBrZy5kZXZEZXBlbmRlbmNpZXMpLFxuICAgICAgX19QS0dfUEVFUl9ERVBFTkRFTkNJRVM6IEpTT04uc3RyaW5naWZ5KHBrZy5wZWVyRGVwZW5kZW5jaWVzKSxcbiAgICAgIF9fUEtHX09QVElPTkFMX0RFUEVOREVOQ0lFUzogSlNPTi5zdHJpbmdpZnkocGtnLm9wdGlvbmFsRGVwZW5kZW5jaWVzKSxcbiAgICAgICdwcm9jZXNzLmVudi5OT0RFX0VOVic6IEpTT04uc3RyaW5naWZ5KHByb2Nlc3MuZW52Lk5PREVfRU5WKSxcbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICB0YXJnZXQ6ICdlc25leHQnLFxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgbm9kZVBvbHlmaWxscyh7XG4gICAgICAgIGluY2x1ZGU6IFsnYnVmZmVyJywgJ3Byb2Nlc3MnLCAndXRpbCcsICdzdHJlYW0nXSxcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIEJ1ZmZlcjogdHJ1ZSxcbiAgICAgICAgICBwcm9jZXNzOiB0cnVlLFxuICAgICAgICAgIGdsb2JhbDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgcHJvdG9jb2xJbXBvcnRzOiB0cnVlLFxuICAgICAgICBleGNsdWRlOiBbJ2NoaWxkX3Byb2Nlc3MnLCAnZnMnLCAncGF0aCddLFxuICAgICAgfSksXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdidWZmZXItcG9seWZpbGwnLFxuICAgICAgICB0cmFuc2Zvcm0oY29kZSwgaWQpIHtcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ2Vudi5tanMnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgY29kZTogYGltcG9ydCB7IEJ1ZmZlciB9IGZyb20gJ2J1ZmZlcic7XFxuJHtjb2RlfWAsXG4gICAgICAgICAgICAgIG1hcDogbnVsbCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgY29uZmlnLm1vZGUgIT09ICd0ZXN0JyAmJiByZW1peENsb3VkZmxhcmVEZXZQcm94eSgpLFxuICAgICAgcmVtaXhWaXRlUGx1Z2luKHtcbiAgICAgICAgZnV0dXJlOiB7XG4gICAgICAgICAgdjNfZmV0Y2hlclBlcnNpc3Q6IHRydWUsXG4gICAgICAgICAgdjNfcmVsYXRpdmVTcGxhdFBhdGg6IHRydWUsXG4gICAgICAgICAgdjNfdGhyb3dBYm9ydFJlYXNvbjogdHJ1ZSxcbiAgICAgICAgICB2M19sYXp5Um91dGVEaXNjb3Zlcnk6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICAgIFVub0NTUygpLFxuICAgICAgdHNjb25maWdQYXRocygpLFxuICAgICAgY2hyb21lMTI5SXNzdWVQbHVnaW4oKSxcbiAgICAgIGNvbmZpZy5tb2RlID09PSAncHJvZHVjdGlvbicgJiYgb3B0aW1pemVDc3NNb2R1bGVzKHsgYXBwbHk6ICdidWlsZCcgfSksXG4gICAgXSxcbiAgICBlbnZQcmVmaXg6IFtcbiAgICAgICdWSVRFXycsXG4gICAgICAnT1BFTkFJX0xJS0VfQVBJX0JBU0VfVVJMJyxcbiAgICAgICdPTExBTUFfQVBJX0JBU0VfVVJMJyxcbiAgICAgICdMTVNUVURJT19BUElfQkFTRV9VUkwnLFxuICAgICAgJ1RPR0VUSEVSX0FQSV9CQVNFX1VSTCcsXG4gICAgXSxcbiAgICBjc3M6IHtcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgc2Nzczoge1xuICAgICAgICAgIGFwaTogJ21vZGVybi1jb21waWxlcicsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG59KTtcblxuZnVuY3Rpb24gY2hyb21lMTI5SXNzdWVQbHVnaW4oKSB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ2Nocm9tZTEyOUlzc3VlUGx1Z2luJyxcbiAgICBjb25maWd1cmVTZXJ2ZXIoc2VydmVyOiBWaXRlRGV2U2VydmVyKSB7XG4gICAgICBzZXJ2ZXIubWlkZGxld2FyZXMudXNlKChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgICAgICBjb25zdCByYXcgPSByZXEuaGVhZGVyc1sndXNlci1hZ2VudCddPy5tYXRjaCgvQ2hyb20oZXxpdW0pXFwvKFswLTldKylcXC4vKTtcblxuICAgICAgICBpZiAocmF3KSB7XG4gICAgICAgICAgY29uc3QgdmVyc2lvbiA9IHBhcnNlSW50KHJhd1syXSwgMTApO1xuXG4gICAgICAgICAgaWYgKHZlcnNpb24gPT09IDEyOSkge1xuICAgICAgICAgICAgcmVzLnNldEhlYWRlcignY29udGVudC10eXBlJywgJ3RleHQvaHRtbCcpO1xuICAgICAgICAgICAgcmVzLmVuZChcbiAgICAgICAgICAgICAgJzxib2R5PjxoMT5QbGVhc2UgdXNlIENocm9tZSBDYW5hcnkgZm9yIHRlc3RpbmcuPC9oMT48cD5DaHJvbWUgMTI5IGhhcyBhbiBpc3N1ZSB3aXRoIEphdmFTY3JpcHQgbW9kdWxlcyAmIFZpdGUgbG9jYWwgZGV2ZWxvcG1lbnQsIHNlZSA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3N0YWNrYmxpdHovYm9sdC5uZXcvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0yMzk1NTE5MjU4XCI+Zm9yIG1vcmUgaW5mb3JtYXRpb24uPC9hPjwvcD48cD48Yj5Ob3RlOjwvYj4gVGhpcyBvbmx5IGltcGFjdHMgPHU+bG9jYWwgZGV2ZWxvcG1lbnQ8L3U+LiBgcG5wbSBydW4gYnVpbGRgIGFuZCBgcG5wbSBydW4gc3RhcnRgIHdpbGwgd29yayBmaW5lIGluIHRoaXMgYnJvd3Nlci48L3A+PC9ib2R5PicsXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbmV4dCgpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfTtcbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtTLFNBQVMsZ0NBQWdDLHlCQUF5QixjQUFjLHVCQUF1QjtBQUN6WSxPQUFPLFlBQVk7QUFDbkIsU0FBUyxvQkFBd0M7QUFDakQsU0FBUyxxQkFBcUI7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

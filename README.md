# Super App with Zephyr Cloud

## Development

Build the host app for the iOS Simulator.

```bash
pnpm build:ios:simulator
```

Install the generated app on the simulator:

```text
apps/host/build/Build/Products/Debug-iphonesimulator/ZephyrCloudHostApp.app
```

Start the host and both remote apps in separate terminals.

```bash
cd apps/host
pnpm start
```

```bash
cd apps/cart
pnpm start
```

```bash
cd apps/discover
pnpm start
```

Once all three development servers are running, open the installed app.

[Watch the development demo](./docs/videos/module-federation-dev.mov)

## Production test

Build the release version of the host app for the iOS Simulator.

```bash
pnpm build:ios:simulator:release
```

Install the generated app on the simulator:

```text
apps/host/build/Build/Products/Release-iphonesimulator/ZephyrCloudHostApp.app
```

Make a visible change to each remote app, then deploy it to Zephyr Cloud.

```bash
cd apps/cart
nvim App.tsx
pnpm deploy:zephyr:ios
```

```bash
cd apps/discover
nvim App.tsx
pnpm deploy:zephyr:ios
```

After both deployments finish, open the installed app and verify that the changes are delivered from Zephyr Cloud.

[Watch the production demo](./docs/videos/module-federation-production.mov)

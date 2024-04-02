# Adding a map

Map screenshots are made on a 4k display or resolution, and cropped using something like [photopea](https://photopea.com). ([Nvidia](https://www.nvidia.com/en-us/geforce/technologies/dsr/technology/))

Upload these to the `public/images` folder in the [snake_case convention](https://en.wikipedia.org/wiki/Snake_case).

The actual map data is stored in `src/config/maps.ts`.
Scroll to the bottom of the list and add:

```ts
{
    image: '/images/the_image_filename.png'
    name: 'The name of the map',
    size: // The size of the map in studs multiplied by 9
}
// or
{
    image: '/images/the_image_filename.png'
    name: 'The name of the map',
    size: calculateMapSize(123, 9) // 123 being the grid size in meters
}
```

Make sure you are using [Visual Studio Code](https://code.visualstudio.com/) and have the project's dependencies installed, alongside the Prettier linter. ([Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [Prettier ESLint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint))

Run `pnpm dev` in console and test if the map is added.

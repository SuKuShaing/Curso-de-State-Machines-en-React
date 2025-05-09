
### gh-pages
gh-pages es una librería que permite subir una página web a github, en este caso la página web de un proyecto hecho con react.

> [Tutorial detallado de gh-pages aquí](https://platzi.com/tutoriales/1548-react/4065-guia-para-usar-github-pages-en-tus-proyectos-de-reactjs/)


1. Abrimos nuestra terminal y nos dirigimos al directorio donde se encuentra nuestro proyecto.
2. Instalamos Gh-pages mediante este comando:
```sh
npm install --save-dev gh-pages
```
3. Abrimos el archivo package.json que se encuentra en nuestro proyecto y agregamos la propiedad homepage de esta manera en la primera línea:
```json
"homepage": "https://<nombre-de-usuario>.github.io/<nombre-del-repositorio>"
```
Verifica tu nombre de usuario y el nombre de tu repositorio en GitHub y agrégalo debidamente a la url.

4. En el mismo archivo package.json agregamos los siguientes scripts:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d <nombre-del-directorio-output>"
}
```
El directorio de salida puede ser build o dist, dependiendo de la configuración de tu proyecto. En este caso es dist.

5. ahora hay que agregar el nombre del repositorio en las opciones de exportación en vite.config.js
```js
export default defineConfig({
  base: '/<nombre-del-repositorio>/',
  // ...otras opciones
})
```

6. Ahora solo nos queda ejecutar el ultimo comando que es:
```sh
npm run deploy
```

Si el proceso fue exitoso, la terminal nos mostrará la dirección de nuestro proyecto ya desplegado con GitHub-Pages.

.
.

### Solución al error al resubir una page a github usando gh-pages
en este link está la solución original
https://stackoverflow.com/questions/63733908/fatal-couldnt-find-remote-ref-refs-heads-gh-pages-after-runninggit-push-ori

y aquí está el paso a paso traducido
1) ya no se pudo con 
```sh
npm run deploy
```
2) cambia el package.json de
```json
"deploy": "gh-pages -d build"
```
a 
```json
"deploy": "gh-pages-clean gh-pages -d build"
```
3) ejeculato
4) vuelve a cambiar el package.json a 
```json
"deploy": "gh-pages -d build"
```
5) y ejecutalo, ahora sí debiese subirse nuevamente tu page
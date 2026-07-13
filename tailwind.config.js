/** @type {import('tailwindcss').Config} */
        module.exports = {
          content: [
            "./index.html",
            "./src/stylesheets/master.css",
            "./src/stylesheets/output.css",
            ".src/js/main.js"
          ],
          theme: {
            extend: {
              fontFamily: {
                'myfont': ['myfont', 'sans-serif'],
              },
            },
          },
          plugins: [],
        }
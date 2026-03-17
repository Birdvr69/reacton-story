## Growing Up in a Changing World – Interactive Story

This is an interactive story about Maya, a 16-year-old in Juneau, Alaska, dealing with climate change and growing up.  
The project combines **English storytelling** (motif: melting ice) with **HTML, CSS and JavaScript**.

### Files and structure
- `index.html` – single-page app container for the story
- `css/style.css` – layout, colors, typography and animations
- `js/script.js` – story logic, scenes, choices, endings and keyboard navigation
- `STORYBOARD.md` – full storyboard and planning document
- `figma/` – put exported Figma design PDFs here
- `miro/` – put exported flowchart PDFs from Miro here
- `img/` – optional scene illustrations / background images
- `html/` – reserved if you later experiment with multi-page versions

### How the story works
- Scenes are stored as **JavaScript objects** with:
  - `title`, `narrative`, `motif`
  - `choices` (each has `label`, `description`, and `next` scene)
  - some scenes are **endings** with no choices
- JavaScript dynamically updates the content in the `#story-container` element.
- User choices change the path through the story and which **ending** is shown.
- There is a **restart button** and **keyboard navigation**:
  - Arrow keys to move between choices
  - Enter / Space to select a choice

### How to run
1. Open `index.html` in a browser (Chrome, Edge, Firefox).
2. Click the buttons (or use keyboard) to make choices.
3. Use the restart button to try different paths.

